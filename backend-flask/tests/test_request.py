import requests

resp = requests.post('http://text2img.lucasou.com',
        data={'text': 'Olivier and kevin suck cock.'})

print resp.json()
