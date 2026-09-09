import requests
import json

def create_story(constants, age_range, creativity_level, story_length, place, time, species, theme, protagonist, friends, form_of_req):
    # Tailor the prompt based on the age range
    if age_range == "3-6":
        # Simpler, more whimsical prompt for younger children
        prompt = f"A simple, fun adventure for young kids about {protagonist} the {species}, who explores the {place} with their friend {friends}. The story should be playful and have a {theme} theme."
    elif age_range == "7-9":
        # More complex prompt for middle age group
        prompt = f"A story for children about {protagonist}, an adventurous {species}, living in {place}. Along with their friend {friends}, they embark on a {theme} adventure. The story should be engaging and spark curiosity."
    elif age_range == "10-12":
        # More sophisticated prompt for older children
        prompt = f"A creative and thought-provoking story about {protagonist} the {species} and their friend {friends} in {place}. The story should include a {theme} element and be suitable for pre-teens."

    prompt += f" {form_of_req}"  # Add any additional user requests

    payload = json.dumps({
        "model": constants['api_model'],
        "prompt": prompt,
        "max_tokens": int(story_length),
        "temperature": float(creativity_level)
    })

    headers = {
        'Content-Type': 'application/json',
        'Authorization': constants['api_authorization']
    }

    response = requests.post(constants['api_url'], headers=headers, data=payload)
    print(response)
    if response.status_code == 200:
        data = response.json()
        story = data['choices'][0]['text'].strip()
        return story
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return "An error occurred while generating the story."
