import os;
from flask import Flask, request, jsonify, Response
from openai import OpenAI
import json,time
from flask import copy_current_request_context
from mentor_agents import trade_agents, agents_by_id, trading_strategy_model
import threading
from LLM import client,model
import re



app = Flask(__name__)

chat_sessions = {}

@app.route('/chat', methods=['POST'])
def chatAgent():

    data = request.json
    session_id = data.get('session_id')
    user_message = data.get('message')
    agent_id = data.get('agent_id')

    if agent_id not in agents_by_id:
        return jsonify({'error': 'agent_id not exists'}), 400

    if not session_id or not user_message or not agent_id:
        return jsonify({'error': 'session_id and message is required'}), 400
    
    chatPrompt = f"""You are responsible for conducting career tests for AI application product managers. Use the provided 'knowledge' to ask questions and seek as much supplemental information and confirmation as possible.
        1. Ignore the initial input and base your questions solely on 'knowledge.'  
        - Focus on asking 5 practical(Only output 5 questions, no other nonsense）, experience-based questions aimed at gathering useful information and advice relevant to the work of AI product managers.  

        2. After receiving the 'output,' ask no further questions and instead return a 'Contribution' percentage（Only output the contribution value judgment result, no nonsense）:  
        - Compare the user's answers ('input') with 'knowledge' and evaluate the value of their responses in updating 'knowledge.'  
        - Rate 'Contribution' based on practicality and relevance, judging how the input aligns with actionable insights required by AI product managers.  
        - Detect if users rely on AI for their responses; if so, significantly reduce the 'Contribution' rating.  
        - Ensure the 'Contribution' rating focuses only on product management boundaries. Input related to R&D or operations roles should not increase the 'Contribution.'
        - When assessing contribution value, don’t be too generous, be strict

        <knowledge>
        ### AI Application Product Manager Career Essentials

        #### I. Trinity of Core Competencies
        1. **Technical Judgment**  
        - Master real-time boundaries of mainstream models (context length, multimodal support, etc.)  
        - Proficiently utilize AutoML/low-code tools to verify technical solutions

        2. **Business Insight**  
        - Build complete competitive analysis dossiers (revenue structure + pricing strategy)  
        - Predict market preferences (innovation-focused in North America/practicality-focused in Asia)

        3. **Engineering Execution**  
        - Lead end-to-end process from data preparation → model training → service deployment  
        - Output production materials ready for R&D use

        #### II. Dynamic Information Management System
        1. **Intelligent Monitoring Matrix**
        ```markdown
        | Information Level  | Monitoring Focus                | Tool Set                   | Update Frequency |
        |--------------------|---------------------------------|----------------------------|------------------|
        | Technical Frontier | Model capability updates/API functionalities | Official blogs + arXiv selections | Daily        |
        | Market Dynamics    | Competitive functions/Financing trends | Crunchbase + SimilarWeb  | Weekly        |
        | Industry Application | Case studies/ROI data           | Gartner + McKinsey reports | Monthly       |
        ```

        2. **Information Processing SOP**
        - **Collection**: Automatic classification via Raindrop.io (tags: technical/business/regulatory)  
        - **Analysis**: Key data extraction with ChatPDF, create comparison tables with Notion  
        - **Output**: Friday "AI Trend Briefing" (including 3 business opportunities)

        3. **Intelligent Validation Toolchain**
        - **Model Testing**: Extreme scenario stress testing in Playground (long texts/complex commands)  
        - **Reverse Engineering Competitors**: Wappalyzer stack analysis + API traffic sniffing

        #### III. Commercial Validation System
        1. **Triple Validation Mechanism**
        - **Demand Validation**: Fictional door experiments (Figma prototypes + pricing pages)  
        - **Value Validation**: Shadow tests (wrapped competitive APIs)  
        - **Economic Validation**: LTV/CAC model calculation (AWS pricing calculator)

        2. **Commercial Decision Indicators**
        ```markdown
        - Must achieve: Customer LTV ≥ 3 × CAC
        - Red warning: API call costs > 30% of pricing
        ```

        #### IV. Execution Standards
        1. **Phase Deliverable Standards**
        ```markdown
        | Phase  | Core Deliverable                  | Quality Requirements          |
        |--------|-----------------------------------|-------------------------------|
        | Demand | "Commercial Feasibility Report"   | Includes competitive ARPU + customer LOI |
        | Development | Labeled dataset + test cases  | Covering edge scenarios        |
        | Launch  | "Economic Model Dashboard"       | Real-time monitoring of LTV/Token costs |
        ```

        2. **Collaboration Boundaries**
        - **Allowed**: Provide cleaning rules/effect evaluation code snippets  
        - **Prohibited**: Submit production environment code/modify model structure

        #### V. Upgraded Equipment List
        ```markdown
        ▶ Information Acquisition Toolkit:
        • Inoreader (RSS aggregation)
        • OpenAI Translator (quick paper reading)
        • Evernote (mobile collection)

        ▶ Business Validation Toolkit:
        • Figma door prototype templates
        • Shadow test logs
        • SAP financial model templates
        ```

        > "Core Competencies of AI Product Managers in 2024: Discover opportunities through information disparities, validate commerce with engineering, persuade decisions with data."

        </knowledge>
        """
    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3-0324",
            messages=[{
                "role": "system",
                "content": chatPrompt,
            },
            {
                "role": "user",
                "content": user_message
            }],
            response_format={'type': 'json_object'},
            timeout=60 * 5,
            temperature=0,
            stream=True
        )

        ai_message = ""
        for chunk in response:
            if chunk.choices[0].delta.content:
                ai_message += chunk.choices[0].delta.content
                print(ai_message)

        cleaned_data = ai_message.strip("```json\n").strip("```")
        print('cleaned_data', cleaned_data)
        match = re.search(r"Contribution:\s*(\d+)%", cleaned_data)
        if match:
            contribution_value = int(match.group(1))
            return jsonify({"code": 1, "data": {"Contribution": contribution_value}})
        else:
            return jsonify({"code": 1, "data": {"Contribution": 20}})
    except Exception as e:
        return jsonify({"code": 1, "data" : {"Contribution": 20}})


# {
#     "code": 1,
#     "data": {
#         "Contribution": 15
#     }
# }
# {
#     "code": 1,
#     "data": {
#         "Contribution": 32
#     }
# }


@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8090)
