# Refer to the following link for help:
# http://docs.gunicorn.org/en/latest/settings.html

# Generally we recommend (2 x $num_cores) + 1 as the
# number of workers to start off with.
command = '/home/lucas/www/text2img.lucasou.com/text2img-env/bin/gunicorn'
pythonpath = '/home/lucas/www/text2img.lucasou.com/text2img-env/text2img/backend-flask'
bind = '127.0.0.1:8060'
workers = 1
user = 'lucas'
accesslog = '/home/lucas/logs/text2img.lucasou.com/gunicorn-access.log'
errorlog = '/home/lucas/logs/text2img.lucasou.com/gunicorn-error.log'
