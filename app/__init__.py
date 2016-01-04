import os

from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, abort, make_response, render_template
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path="")

# use the compressed template if exist
if os.path.isdir(os.path.join(os.path.dirname(__file__), "templates/build/templates")):
    app.template_folder = "templates/build/templates"
    
api = Api(app)
auth = HTTPBasicAuth()
app.config.from_object('config')
db = SQLAlchemy(app)

app.jinja_env.variable_start_string = '{[{ '
app.jinja_env.variable_end_string = ' }]}' 

from app import models, views, apis

 
    