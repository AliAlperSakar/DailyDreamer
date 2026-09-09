import os

# NOTE (v2 rewrite): this file used to contain a real OpenAI API key committed
# in plain text. It has been redacted here. If you ever hardcode a secret in a
# public repo, treat it as compromised and rotate it immediately.
api_url = "https://api.openai.com/v1/chat/completions"
api_model = "gpt-3.5-turbo-1106"
api_authorization = f"Bearer {os.environ.get('OPENAI_API_KEY', '')}"  # set OPENAI_API_KEY in your environment
