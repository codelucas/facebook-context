#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-
"""
Written by:
Lucas, Kevin, Olivier for the Facebook SoCal regional hackathon.
"""
from flask import Flask, request, jsonify, abort
# from redis import Redis

app = Flask(__name__, static_url_path='/static')
app.config.from_object('config')
# redis = Redis(host='localhost', port=6379, db=0)


def text_to_meta(text):
    """
    """
    pass


def meta_to_image(meta_dat):
    """
    """
    pass


def text_to_image(text=""):
    """
    """
    pass


@app.route('/', methods=['POST', 'GET'])
def main():
    """
    Input POST requests with the text field being
    populated with a facebook status. We return an
    appropriate image for that status using NLP.
    """
    #text = request.form['text']

    #if not text:
    #    abort(404)

    image_url = 'http://harro.com'  # text_to_image(text)
    return jsonify({'url': image_url})

app.debug = app.config['DEBUG']

if __name__ == '__main__':
    print ''
    app.run()
