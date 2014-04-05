#!/usr/bin/env python2.7
"""
/shell.py will allow you to get a console and enter commands
within your flask environment.
"""
import os
import sys
import readline
from pprint import pprint

from flask import *

sys.path.insert(0, '/home/lucas/www/text2img.lucasou.com/text2img-env/text2img/backend-flask')

from backend import *

os.environ['PYTHONINSPECT'] = 'True'
