'''
create app instance
'''

import os

from flask import Flask, jsonify, abort, make_response, render_template
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path="")   # pylint: disable=invalid-name
app.config.from_object("config")
auth = HTTPBasicAuth()  # pylint: disable=invalid-name

# redefine jinja start/end string to avoid conflict with AngularJS
app.jinja_env.variable_start_string = "{[{ "
app.jinja_env.variable_end_string = " }]}"

# use the compressed template if exist
if os.path.isdir(os.path.join(os.path.dirname(__file__), "templates/build/templates")):
    app.template_folder = "templates/build/templates"
    