'''
Views used in Remember
'''
from flask import jsonify, make_response, render_template, request

from app import app, auth
from app.models import db


@auth.get_password
def get_password(username):
    '''
    function to get password
    '''
    if username == "admin":
        return "python"
    return None

@auth.error_handler
def unauthorized():
    '''
    unauthorized response
    '''
    return make_response(jsonify({"message": "Unauthorized access"}), 403)

@app.errorhandler(404)
def not_found_error(error):
    '''
    function to handle 404 error
    '''
    app.logger.error("%s: %s" %(error, request.path))
    return render_template("404.html"), 404

@app.errorhandler(500)
def internal_error(error):
    '''
    function to handle 500 error
    '''
    app.logger.error("%s: %s" %(error, request.path))
    db.session.rollback()
    return render_template("500.html"), 500


@app.route("/")
@app.route("/index")
def index():
    '''
    function to handle index page
    '''
    return render_template("index.html")

@app.route("/list-task")
def list_task():
    '''
    function to handle task list page
    '''
    return render_template("list-task.html")

@app.route("/view-task")
def view():
    '''
    function to handle task view page
    '''
    return render_template("view-task.html")

@app.route("/create-task")
def create_task():
    '''
    function to handle create task page
    '''
    return render_template("create-task.html")

@app.route("/edit-task")
def edit_task():
    '''
    function to handle edit task page
    '''
    return render_template("edit-task.html")

@app.route("/category-info")
def category_info():
    '''
    function to handle category info page
    '''
    return render_template("category-info.html")

@app.route("/tag-info")
def tag_info():
    '''
    function to handle tag info page
    '''
    return render_template("tag-info.html")

@app.route("/notes")
def notes():
    '''
    function to handle note page
    '''
    return render_template("notes.html")

@app.route("/attachments")
def attachments():
    '''
    function to handle attachment page
    '''
    return render_template("attachments.html")

@app.route("/edit-attachment-modal")
def edit_attachment():
    '''
    function to handle edit attachment page
    '''
    return render_template("edit-attachment-modal.html")

@app.route("/confirm-modal")
def confirm_modal():
    '''
    function to handle common confirm modal
    '''
    return render_template("confirm-modal.html")

@app.route("/swagger/swagger_config")
def swagger_json():
    '''
    function to get swagger config of Remember REST api
    '''
    return app.send_static_file("swagger/remember_swagger.json")

@app.route("/swagger")
def swagger():
    '''
    function to handle swagger page
    '''
    return render_template("swagger.html")

