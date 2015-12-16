from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, abort, make_response, render_template
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path="")
api = Api(app)
auth = HTTPBasicAuth()
app.config.from_object('config')
db = SQLAlchemy(app)

app.jinja_env.variable_start_string = '{[{ '
app.jinja_env.variable_end_string = ' }]}' 

from app import models, views, apis

 
    