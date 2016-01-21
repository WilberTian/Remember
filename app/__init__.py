'''
create app instance
'''

import os

from flask import Flask, jsonify, abort, make_response, render_template
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path="")   # pylint: disable=invalid-name
app.config.from_object("config")
app.debug = False
auth = HTTPBasicAuth()  # pylint: disable=invalid-name

# redefine jinja start/end string to avoid conflict with AngularJS
app.jinja_env.variable_start_string = "{[{ "
app.jinja_env.variable_end_string = " }]}"

# use different static/templates folder with different mode
if not app.debug:
    app.template_folder = "build/templates"
    app.static_folder = "build/static"
else:
    app.template_folder = "src/templates"
    app.static_folder = "src/static"
    