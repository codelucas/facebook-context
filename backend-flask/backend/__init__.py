#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-
"""
Written by:
Lucas, Kevin, Olivier for the Facebook SoCal regional hackathon.
"""
from flask import Flask, request, jsonify, abort
from alchemyapi import AlchemyAPI
import json
# from redis import Redis

app = Flask(__name__, static_url_path='/static')
app.config.from_object('config')

# redis = Redis(host='localhost', port=6379, db=0)
alchemyapi = AlchemyAPI()


def text_to_keyword(text):
    """
    Utilizes alchemyAPI to transform text into top keyword
    which we later use to query for an image
    """
    demo_text = 'Yesterday dumb Bob destroyed my fancy iPhone in\
    beautiful Denver, Colorado. I guess I will have to head over\
    to the Apple Store and buy a new one.'

    response = alchemyapi.keywords('text', demo_text, {'sentiment': 1})

    if response['status'] == 'OK':
        # print(json.dumps(response, indent=4))
        keywords = response['keywords']
        if len(keywords) > 0:
            keyw_chunk = keywords[0]
            top_keyword = keyw_chunk['text'].encode('utf-8')
        else:
            top_keyword = ''

        return top_keyword

        # for keyword in response['keywords']:
        #    print('text: ', keyword['text'].encode('utf-8'))
        #    print('relevance: ', keyword['relevance'])
        #    print('sentiment: ', keyword['sentiment']['type'])
        #    if 'score' in keyword['sentiment']:
        #        print('sentiment score: ' + keyword['sentiment']['score'])
        #    print('')
    else:
        print('Error in keyword extaction call: ', response['statusInfo'])
        return ''


def keyword_to_image(keyword):
    """
    Uses google image api and our extracted keyword
    to find a related image to our status.
    """
    return keyword


def text_to_image(text=""):
    """
    Uses two helper methods to convert text (fb status)
    into a related image
    """
    top_keyword = text_to_keyword(text)
    img_url = keyword_to_image(top_keyword)
    return img_url


@app.route('/', methods=['POST', 'GET'])
def main():
    """
    Input POST requests with the text field being
    populated with a facebook status. We return an
    appropriate image for that status using NLP.
    """
    # text = request.form['text']

    text = request.args.get('text', '')

    # return ''
    # if not text:
    #    abort(404)

    image_url = text_to_image(text)
    return jsonify({'url': image_url})


app.debug = app.config['DEBUG']

if __name__ == '__main__':
    print ''
    app.run()
