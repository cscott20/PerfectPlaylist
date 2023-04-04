from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import openai
from dotenv import load_dotenv




@csrf_exempt
def process_sentence(request):
    if request.method == 'POST':
        load_dotenv()
        api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = api_key
        data = json.loads(request.body.decode('utf-8'))

        description = data['description']

        system_prompt = """
            Your role is to Generate a list of songs and a playlist title based on the user's description.
            Your response should look like : {"title": "Playlist Title", "songs": [{"name": "Song Name", "link": "Spotify_Link"}, ... ]}
            The link should be a link to the song on spotify. Verify that the link is a valid link to a spotify song before adding it to the playlist.
            Return in JSON format, with no extra text before or after the json object.
            You must never include duplicate songs on the same playlist, even if the featured artist has changed.
            Include a minimum of 10 songs, and a maximum of 20.
        """
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": description},
            ]
        )

        # Do something with the sentence data, e.g. process it with a machine learning model
        result = {'processed_sentence': response.choices[0].message.content}
        return JsonResponse(result, status=200)
    elif request.method == 'OPTIONS':
        return HttpResponse(status=200)
    else:
        print("method:")
        print(request.method)
        return JsonResponse({}, status=405)