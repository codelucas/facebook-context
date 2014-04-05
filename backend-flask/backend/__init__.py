#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-
"""
Written by:
Lucas, Kevin, Olivier for the Facebook SoCal regional hackathon.
"""
from flask import Flask, request, jsonify, abort
from alchemyapi import AlchemyAPI
import json

from urllib import FancyURLopener
import urllib2
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


class MyOpener(FancyURLopener):
    version = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.8.1.11)\
    Gecko/20071127 Firefox/2.0.0.11'


def keyword_to_images(keyword):
    """
    Uses google image api and our extracted keyword
    to find a related image to our status.
    """
    searchTerm = keyword
    searchTerm = searchTerm.replace(' ', '%20')

    # Start FancyURLopener with defined version
    # myopener = MyOpener()

    # Notice that the start changes for each iteration in order
    # to request a new set of images for each loop
    url = ('https://ajax.googleapis.com/ajax/services/search/images?' +
           'v=1.0&q='+searchTerm+'&start='+str(0)+'&userip=MyIP')

    # print url
    request_obj = urllib2.Request(url, None, {'Referer': 'testing'})
    response = urllib2.urlopen(request_obj)

    # Get results using JSON
    results = json.load(response)
    data = results['responseData']
    dataInfo = data['results']

    images = []
    # Iterate for each result and get unescaped url
    for myUrl in dataInfo:
        print myUrl['unescapedUrl']
        images.append(myUrl['unescapedUrl'])
        # return myUrl['unescapedUrl']
        # myopener.retrieve(myUrl['unescapedUrl'],str(count)+'.jpg')
    return images
    # return keyword


def text_to_images(text=""):
    """
    Uses two helper methods to convert text (fb status)
    into a related image
    """
    top_keyword = text_to_keyword(text)
    images = keyword_to_images(top_keyword)
    return images


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

    images = text_to_images(text)
    return jsonify({
        'img1': images[0],
        'img2': images[1],
        'img3': images[2],
        'img4': images[3]
    })


app.debug = app.config['DEBUG']

if __name__ == '__main__':
    print ''
    app.run()
