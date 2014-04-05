#!/bin/bash

exec /home/lucas/www/text2img.lucasou.com/text2img-env/bin/gunicorn -c /home/lucas/www/text2img.lucasou.com/text2img-env/text2img/backend-flask/configs/gunicorn_config.py backend.wsgi;
