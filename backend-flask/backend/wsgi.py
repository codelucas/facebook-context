#!/usr/bin/env python
"""
"""
import sys
sys.path.insert(0, '/home/lucas/www/text2img.lucasou.com/text2img-env/text2img/backend-flask')

from werkzeug.contrib.fixers import ProxyFix  # needed for http server proxies
from werkzeug.debug import DebuggedApplication

from backend import app  # as application

app.wsgi_app = ProxyFix(app.wsgi_app)  # needed for http server proxies
application = DebuggedApplication(app, True)
