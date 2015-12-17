from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, abort, make_response, render_template, request, redirect, url_for
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.ext.httpauth import HTTPBasicAuth
from app import app, api, auth, db, models
import json
import uuid
import os

@api.representation('application/json')
def output_json(data, code, headers=None):
    resp = make_response(json.dumps(data), code)
    resp.headers.extend(headers or {})
    return resp
    
@api.representation('application/xml')
def output_xml(data, code, headers=None):
    # place holder to implement xml response
    resp = make_response(json.dumps(data), code)
    resp.headers.extend(headers or {})
    return resp    

tag_fields = {
    "id": fields.Integer,
    "name": fields.String,
}    
    
category_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String
}
    
task_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    "category": fields.Nested(category_fields),
    'done': fields.Boolean,
    "tags": fields.List(fields.Nested(tag_fields)),
    'dimension': fields.Integer
}


class TaskList(Resource):
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=unicode, required=True, help='No task name provided', location='json')
        self.reqparse.add_argument('description', type=unicode, required=True, default="", location='json')
        self.reqparse.add_argument('done', type=bool, required=True, default="", location='json')
        self.reqparse.add_argument('category', type=dict, required=True, default="", location='json')
        self.reqparse.add_argument('tags', type=list, required=True, default="", location='json')
        self.reqparse.add_argument('dimension', type=int, default="", location='json')                           
        super(TaskList, self).__init__()
        
        self.representations = {
            'application/xml': output_xml,
            'application/json': output_json,
        }

    def get(self):
        tasks = models.Task.query.all()
        return {'tasks': [marshal(task, task_fields) for task in tasks]}

    def post(self):
        args = self.reqparse.parse_args()
      
        category = models.Category.query.filter_by(id = args['category']["id"]).first()
        
        tags = [models.Tag.query.filter_by(id = tag["id"]).first() for tag in args["tags"]]
        
        task = models.Task(args['name'], args['description'], category, args['done'], tags, args["dimension"])
        db.session.add(task)
        db.session.commit();

        return {'task': marshal(task, task_fields)}, 201

class Task(Resource):
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=unicode, location='json')
        self.reqparse.add_argument('description', type=unicode, location='json')
        self.reqparse.add_argument('done', type=bool, location='json')
        self.reqparse.add_argument('category', type=dict, location='json')
        self.reqparse.add_argument('tags', type=list, location='json')
        super(Task, self).__init__()

    def get(self, id):
        task = models.Task.query.filter_by(id=id).first()
        
        if not task:
            abort(404)
            
        return {'task': marshal(task, task_fields)}
    
    def put(self, id):
        task = models.Task.query.filter_by(id=id).first()
       
        if not task:
            abort(404)
 
        args = self.reqparse.parse_args()

        args.category = models.Category.query.filter_by(id = args['category']["id"]).first()
        args.tags = [models.Tag.query.filter_by(id = tag["id"]).first() for tag in args["tags"]]
        
        for k, v in args.items():
            if v is not None:
                setattr(task, k, v)
        '''
        task.tags = []
        for tag_id in args["tag_ids"]:
            task.tags.append(models.Tag.query.filter_by(id=tag_id).first())
        '''
        db.session.commit()
        return {'task': marshal(task, task_fields)}

    def delete(self, id):
        task = models.Task.query.filter_by(id=id).first()
        if not task:
            abort(404)
            
        db.session.delete(task)
        db.session.commit()
        return {'task': task.id}
  
class TaskListByStatus(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('done', type=unicode, default="", location='args')
        super(TaskListByStatus, self).__init__
        
    def get(self):
        args = self.reqparse.parse_args()
        done = args['done']
        done = [done.lower() == "true" and True or False][0]
        tasks = models.Task.query.filter_by(done = done).all()
        return {'tasks': [marshal(task, task_fields) for task in tasks]}
        
class TaskListByCategory(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('category_id', type=int, default="", location='args')
        super(TaskListByCategory, self).__init__
        
    def get(self):
        args = self.reqparse.parse_args()
        print args
        category_id = args['category_id']
        tasks = models.Task.query.filter_by(category_id = category_id).all()
        return {'tasks': [marshal(task, task_fields) for task in tasks]}        

class CategoryListAPI(Resource):
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=unicode, required=True, help='No category name provided', location='json')
        self.reqparse.add_argument('description', type=unicode, default="", location='json')
        super(CategoryListAPI, self).__init__()

    def get(self):
        categories = models.Category.query.all()
        return {'categories': [marshal(category, category_fields) for category in categories]}

    def post(self):
        args = self.reqparse.parse_args()
        category = models.Category(args['name'], args['description'])
        db.session.add(category)
        db.session.commit();
        return {'category': marshal(category, category_fields)}, 201

class CategoryAPI(Resource):
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=unicode, location='json')
        self.reqparse.add_argument('description', type=unicode, location='json')
        super(CategoryAPI, self).__init__()

    def get(self, id):
        category = models.Category.query.filter_by(id=id).first()
        if not category:
            abort(404)
            
        return {'category': marshal(category, category_fields)}
    
    def put(self, id):
        category = models.Category.query.filter_by(id=id).first()
       
        if not category:
            abort(404)

        args = self.reqparse.parse_args()
        for k, v in args.items():
            if v is not None:
                setattr(category, k, v)
        db.session.commit()
        return {'category': marshal(category, category_fields)}

    def delete(self, id):
        category = models.Category.query.filter_by(id=id).first()
        if not category:
            abort(404)
        db.session.delete(category)
        db.session.commit()
        return {'category': marshal(category, category_fields)}

class TagListAPI(Resource):
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=unicode, required=True, help='No tag name provided', location='json')
        super(TagListAPI, self).__init__()

    def get(self):
        tags = models.Tag.query.all()
        return {'tags': [marshal(tag, tag_fields) for tag in tags]}

    def post(self):
        args = self.reqparse.parse_args()
        print args
        tag = models.Tag(args['name'])
        db.session.add(tag)
        db.session.commit();
        return {'tag': marshal(tag, tag_fields)}, 201

class TagAPI(Resource):
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=unicode, location='json')
        super(TagAPI, self).__init__()

    def get(self, id):
        tag = models.Tag.query.filter_by(id=id).first()
        if not tag:
            abort(404)
            
        return {'tag': marshal(tag, tag_fields)}
    

    def put(self, id):
        tag = models.Tag.query.filter_by(id=id).first()
       
        if not tag:
            abort(404)

        args = self.reqparse.parse_args()
        for k, v in args.items():
            if v is not None:
                setattr(tag, k, v)
        db.session.commit()
        return {'tag': marshal(tag, tag_fields)}

    def delete(self, id):
        tag = models.Tag.query.filter_by(id=id).first()
        if not tag:
            abort(404)
        db.session.delete(tag)
        db.session.commit()
        return {'tag': marshal(tag, tag_fields)}
    

# This is the path to the upload directory
app.config['UPLOAD_FOLDER'] = 'uploads/'
# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'py'])
    
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']
    
    
class UploadAttachment(Resource):
    def __init__(self):
        super(UploadAttachment, self).__init__
        
    def post(self):
        file = request.files['file']
        if file and allowed_file(file.filename.lower()):
            extension = os.path.splitext(file.filename)[1]
            f_name = str(uuid.uuid4()) + extension          
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], f_name))
            return {'filename':f_name}
     
api.add_resource(TaskList, '/remember/api/v1.0/tasks', endpoint='tasks')
api.add_resource(TaskListByStatus, '/remember/api/v1.0/tasks/find-by-status', endpoint='taskByStatus')
api.add_resource(TaskListByCategory, '/remember/api/v1.0/tasks/find-by-category', endpoint='taskByCategory')
api.add_resource(Task, '/remember/api/v1.0/tasks/<int:id>', endpoint='task')

api.add_resource(CategoryListAPI, '/remember/api/v1.0/categories', endpoint='categories')
api.add_resource(CategoryAPI, '/remember/api/v1.0/categories/<int:id>', endpoint='category')

api.add_resource(TagListAPI, '/remember/api/v1.0/tags', endpoint='tags')
api.add_resource(TagAPI, '/remember/api/v1.0/tags/<int:id>', endpoint='tag')

api.add_resource(UploadAttachment, '/task/uploadAttachment', endpoint='uploadAttachment')



