from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, abort, make_response, render_template
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.ext.httpauth import HTTPBasicAuth
from app import app, api, auth, db

@auth.get_password
def get_password(username):
    if username == 'miguel':
        return 'python'
    return None

@auth.error_handler
def unauthorized():
    # return 403 instead of 401 to prevent browsers from displaying the default
    # auth dialog
    return make_response(jsonify({'message': 'Unauthorized access'}), 403)


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500   

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")
    
@app.route("/list-task")
def list_task():
    return render_template("list-task.html")    
    
@app.route("/view-task")
def view():
    return render_template("view-task.html")       
    
@app.route("/create-task")
def create_task():
    return render_template("create-task.html")        
    
@app.route("/edit-task")
def edit_task():
    return render_template("edit-task.html")      
    
@app.route("/category-info")
def category_info():
    return render_template("category-info.html")        
    
@app.route("/tag-info")
def tag_info():
    return render_template("tag-info.html")         
    
@app.route("/swagger/swagger_config")
def swagger_json():
    #return (swagger_config)
    return app.send_static_file('swagger/remember_swagger.json')
    
@app.route("/swagger")
def swagger():
    return render_template('swagger.html')    
    
@app.route('/upload')
def upload():
    return render_template('upload.html')
