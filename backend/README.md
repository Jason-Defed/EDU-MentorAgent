# server
cp .env_example .env
# 生成当前项目的pip类库
pipreqs ./ --encoding=utf8 --force
# Create a Virtual Environment
python3 -m venv aienv
# Activate the Virtual Environment
source aienv/bin/activate
# Install Packages in the Virtual Environment安装当前项目requirements.txt的类库依赖
pip install -r requirements.txt

