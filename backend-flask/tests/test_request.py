import requests
"""
Here is a minimal testing suite for basic server side
operations eg. querying images out of text.
"""


text_a = 'I lost my gold iPhone yesterday, I feel pissed off!'
# This request will work and generate a json response
# with four images.
resp = requests.post('http://text2img.lucasou.com',
                     data={'text': text_a})

images_res = resp.json()['images']
assert len(images_res) == 4

for img in images_res:
    print img

text_b = ''
# This response is destined to fail and send back a
# a single fail red X image.
resp = requests.post('http://text2img.lucasou.com',
                     data={'text': text_b})

print resp.json()['images']
assert 'http://text2img.lucasou.com/static/fail.png' \
    == resp.json()['images'][0]
