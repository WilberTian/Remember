'''
create app instance
'''

import os

from flask import Flask, jsonify, abort, make_response, render_template
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path="")   # pylint: disable=invalid-name
app.config.from_object("config")
app.debug = True
auth = HTTPBasicAuth()  # pylint: disable=invalid-name

# This is the path to the upload directory
app.config["UPLOAD_FOLDER"] = "uploads"
# These are the extension that we are accepting to be uploaded
app.config["ALLOWED_EXTENSIONS"] = set(["txt", "pdf", "png", "jpg", "jpeg", "gif", "py"])
# create upload folder if not exist
if not os.path.exists(app.config["UPLOAD_FOLDER"]):
    os.makedirs(app.config["UPLOAD_FOLDER"])

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
    