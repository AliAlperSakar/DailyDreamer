import requests
import json

def create_story_via_api(constants,global_creativity_level,  global_story_length, 
				  global_place, global_time,  
				  global_theme, global_protagonist, 
				  global_friends, global_form_of_req):
	
	return post_api(global_form_of_req, global_creativity_level,global_time,global_place, global_theme, global_story_length,global_friends,global_protagonist, constants)


# def post_api(feature_req, creativity, period, species, place, theme, length, friend, protagonist, constants):

#     prompt = f"Write a story about {protagonist}, who is friends with {friend}. The story is set in {place} during {period}. It involves {species} and has a theme of {theme}. {feature_req}"
    
#     payload = json.dumps({
#         "model": constants['api_model'],
#         "prompt": prompt,
#         "max_tokens": int(length),
#         "temperature": float(creativity)
#     })

#     headers = {
#         'Content-Type': 'application/json',
#         'Authorization': constants['api_authorization']
#     }

#     response = requests.post(constants['api_url'], headers=headers, data=payload)

#     if response.status_code == 200:
#         data = response.json()
#         story = data['choices'][0]['text'].strip()
#         print("AAAAAAAAAAAA")
#         print(data)
#         return story
#     else:
#         print(f"Error: {response.status_code}, {response.text}")
#         return "An error occurred while generating the story."


def post_api(feature_req, creativity, period, place,theme,length,friend,protagonist,constants):
	
	system_content = "Craft an Engaging and Educational Children's Story\n\nYou are an experienced and renowned creator of captivating children's stories. Your unique writing style is centered around education, imparting knowledge to young minds in an enthralling manner. These stories serve as a gateway to introduce new ideas, reinforce school teachings, and encourage young readers' curiosity.\n\nKey Guidelines:\n\n1. Educational Emphasis: Your stories should cleverly integrate educational elements, making learning enjoyable for children aged 7 to 12. Utilize relatable scenarios, characters, and settings to elucidate concepts and spark their interest in different subjects.\n\n2. Diversity and Inclusion: Uphold diversity and shatter biases. Create characters from various backgrounds, cultures, and abilities. Showcase the beauty of differences while fostering empathy and understanding.\n\n3. Content Excellence: Strive for impeccable content quality. Craft narratives that flow seamlessly, maintaining grammatical correctness and cohesiveness. Tailor the language to suit the age group, ensuring it's both accessible and engaging.\n\n4. Ethical Storytelling: Avoid any content that might propagate harmful behavior or negative values. Foster positive attitudes, kindness, and teamwork through your narratives.\n\nYour Task:\n\nWrite succinct yet impactful short stories for children aged 7 to 12. Infuse each story with educational elements that encourage curiosity and learning. Create characters that reflect the richness of our world, and weave tales that entertain while leaving a positive imprint on young readers' minds. Please give only the story that the reader will read, not the details about parameters that you get to create it such as Protagonist's Name and Friend's Name"
	user_content =  (
    f"Write a children's story about a protagonist named {protagonist}. " +
    f"The protagonist has a friend named {friend}. " +
    f"The story should be approximately {length} words long. " +
    f"Set the story in a {place} during {period}. " +
    f"The theme of the story is {theme}. " +
    f"Please ensure the story is suitable for children, engaging, and fosters positive values. " +
    f"Use a creativity level of {creativity}. " +
    f"Additional requests for the story: {feature_req}. " +
    f"Please avoid any content that might be inappropriate for a young audience."
)

	url = constants['api_url']
	model = constants['api_model']
	authorization = constants['api_authorization']
	content = protagonist
	
	print(constants)
	
	payload = json.dumps({
	"temperature": 0,
	"model": model,
	"messages": [
		{
		"role": "system",
		"content": system_content
		},
		{
		"role": "user",
		"content": user_content
		},
	]
	})
	
	headers = {
	'Content-Type': 'application/json',
	'Authorization': authorization
	}
	
	response = requests.request("POST", url, headers=headers, data=payload)
	print(response)
	data = json.loads(response.text)
	print(data)
	message = data["choices"][0]["message"]["content"]
	return message

