from openai import OpenAI;
import os;
from dotenv import load_dotenv
load_dotenv(verbose=True)

api_key = os.getenv('API_KEY')
base_url = os.getenv('BASE_URL', 'https://openrouter.ai/api/v1')
model = os.getenv('MODEL', 'deepseek/deepseek-chat-v3-0324')
client = OpenAI(api_key=api_key, base_url=base_url)


