# from flask import Flask, redirect, render_template, request, session
# from flask import request, jsonify
# from api_logic import create_story_via_api
# from const import api_url, api_model, api_authorization
# import csv
# import os

from flask import Flask, redirect, render_template, request, session
from flask import request, jsonify
from api_logic import create_story_via_api  # Import from story_generator.py
from const import api_url, api_model, api_authorization
import csv
import os
import asyncio 
import openai

# from openai import AsyncOpenAI
# from async_openai import OpenAI, settings, CompletionResponse

app = Flask(__name__, static_folder='D:\PASSAU\AI_Engineer\Fourth Semester\AI Engineering Lab\givemeastory-ai\medias')
app.secret_key = 'your_secret_key'

@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    print("SADASDSAFASDASFASDASFAS")
    data = request.get_json()
    feedback = data['feedback']
    print(feedback)
    # Do something with the data, such as storing it in a database\
    response = {'message': 'Feedback received'}
    if feedback:
        write_like_dislike_to_csv(feedback)
    return jsonify(response)


# Global değişkenler (global variables)
global_creativity_level = None
global_top_p = None
global_story_length = None
global_form_of_req = None
global_place = None
global_time = None
global_personal_interests = None
global_target_or_problem = None
global_theme = None
global_protagonist = None
global_age_of_protagonist = None
global_friends = None

constants = {
    "api_url": api_url,
    "api_model": api_model,
    "api_authorization": api_authorization
}


def write_like_dislike_to_csv(feedback):
    csv_filename = "feedback.csv"
    print(feedback)
    like_dislike_exists = os.path.exists(csv_filename)

    with open(csv_filename, mode="a", newline="", encoding="utf-8") as csv_file:
        fieldnames = ["like_dislike"]
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        if not like_dislike_exists:
            writer.writeheader()
            
        writer.writerow({"like_dislike": feedback})

@app.route('/set_theme', methods=['POST'])
def set_theme():
    data = request.get_json()
    selected_theme = data['theme']
    print(selected_theme)
    # Do something with the selected theme, such as storing it in a session or database
    response = {'message': 'Selected theme received'}
    print(selected_theme)
    return jsonify(response)

import aiohttp
import asyncio

async def main():
    async with aiohttp.ClientSession() as session:
        response = await session.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            headers={
                'Authorization': f'Bearer {api_authorization}',
                'Content-Type': 'application/json',
            },
            json={
                "prompt": "Translate the following English text to French: 'Hello, how are you?'",
                "temperature": 0.5,
                "max_tokens": 60,
                "top_p": 1.0,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.0,
            },
        )
        result = await response.json()
        print(result)

# Run the async function
asyncio.run(main())


# @app.route('/generate_image', methods=['POST'])
# def generate_image():
#     prompt = request.json['prompt']  # Get the prompt from the POST request's body
#     AsyncOpenAI.api_key = api_authorization  # Replace with your actual OpenAI API key

#     try:
#         # Call the OpenAI API to generate an image
#         response = AsyncOpenAI.Image.create(prompt=prompt, n=1)
#         image_url = response['data'][0]['url']  # Get the URL of the generated image
#         return jsonify({'image_url': image_url})
#     except Exception as e:
#         return jsonify({'error': str(e)})
    
@app.route('/generate_image', methods=['POST'])
def generate_image():
    prompt = request.json['prompt']  # Get the prompt from the POST request's body
    openai.api_key = api_authorization  # Replace with your actual OpenAI API key

    try:
        # Call the OpenAI API to generate an image
        response = openai.Image.create(prompt=prompt, n=1)
        image_url = response['data'][0]['url']  # Get the URL of the generated image
        return jsonify({'image_url': image_url})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/', methods=['GET', 'POST'])
def index():
    story_text = None  # Initialize the variable to hold the story text
    image_url = ""


    if request.method == 'POST':
        # Retrieve form data
        theme = request.form.get('theme')
        age_range = request.form.get('age_range')
        creativity_level = request.form.get('creativity_level')
        story_length = request.form.get('story_length')
        form_of_req = request.form.get('add_req')
        place = request.form.get('story_place')
        period = request.form.get('period')
        protagonist = request.form.get('protagonist')
        friends = request.form.get('friends')

        # Print the received data to the console for debugging
        print(f"Theme: {theme}, Age Range: {age_range}, Creativity Level: {creativity_level}, Story Length: {story_length}")
        print(f"Form of Request: {form_of_req}, Place: {place}, Time: {period}")
        print(f"Protagonist: {protagonist}, Friends: {friends}")

        # Assuming create_story_via_api is a function that takes these parameters and returns a story
        story_text = create_story_via_api(
            constants,  # Assuming this is a dictionary with API keys and other constants
            creativity_level, 
            story_length,
            place, 
            period, 
            theme, 
            protagonist, 
            friends, 
            form_of_req
        )

        # Store the generated story in the session, if needed
        session['story_text'] = story_text

                
        client = openai(
            # defaults to os.environ.get("OPENAI_API_KEY")
            api_key=api_authorization
        )

        response = client.images.generate(
        model="dall-e-3",
        prompt=story_text,
        size="1024x1024",
        quality="standard",
        n=1,
        )

        image_url = response.data[0].url
        # image_url = ""

    # Render the index.html template whether it's a GET request or POST request
    # When POST, the story_text will be the generated story, otherwise it will be None
    # return render_template('index.html', story_text=story_text, generated_image=image_url)
    return render_template('index.html', story_text=story_text)
        


if __name__ == '__main__':
    app.run(debug=True)



