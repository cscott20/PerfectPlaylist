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

        sentence = data['sentence']
        example= "I want a playlist for working out that features high-energy, upbeat songs from the 80s and 90s."

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Your role is to Generate a list of songs and a playlist title based on the user's description.  Your response should be a playlist title, followed by a numbered list of songs, and that's it."},
                {"role": "user", "content": sentence},
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