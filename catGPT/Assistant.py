import json
from dotenv import load_dotenv
import os
from openai import OpenAI
import requests
from tenacity import retry, wait_random_exponential, stop_after_attempt

# Load the .env file
load_dotenv()

client = OpenAI()
OpenAI.api_key = os.getenv('OPENAI_API_KEY')

def get_cat_image(limit: int) -> list[str]:
    payload = {'limit': limit}
    headers = {'x-api-key': os.getenv('CATAPI_API_KEY')}
    api_url= "https://api.thecatapi.com/v1/images/search"
    response = requests.get(api_url, headers=headers, params=payload).json()
    print(response)
    catImageUrls = []
    for entry in response:
        catImageUrls.append(entry.get("url"))
    return catImageUrls

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_cat_image",
            "description": "Get a random cat image",
            "parameters": {
                "type": "object",
                "properties": {
                    "limit": {
                        "type": "integer",
                        "description": "The number of cat images to show. e.g. 1, 2, 10",
                    }
                },
                "required": ["limit"]
            }
        }
    }
]

@retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
def chat_completion_request(messages, tools=None, tool_choice=None, model=os.getenv('GPT_MODEL')):
    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            tools=tools,
            tool_choice=tool_choice,
        )
        return response
    except Exception as e:
        print("Unable to generate ChatCompletion response")
        print(f"Exception: {e}")
        return e

messages = []

# Step 1: Add a Message to a MessageList
def createMessageForAI(message) -> list[str]:
    print(f"This is the message object: {message} \n")
    messages.append({"role": "user", "content": message})
    return runAssistant()

# Step 2: Run the Assistant
def runAssistant() -> list[str]:
    chat_response = chat_completion_request(
    messages, tools=tools
    )

    print(chat_response)
    assistant_message = chat_response.choices[0].message
    messages.append(assistant_message)

    if assistant_message.tool_calls != None:
        messages.clear()
        numCatImages = json.loads(assistant_message.tool_calls[0].function.arguments).get("limit")
        return get_cat_image(limit=numCatImages)
    else:
        print(assistant_message.content)
        return [assistant_message.content]
    