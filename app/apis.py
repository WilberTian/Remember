'''
all the REST api implementations
'''

import os
import uuid
import json

import werkzeug
from flask import abort, make_response, send_from_directory
from flask_restful import Api, Resource, reqparse, fields, marshal


from app import app, models
from app.models import db


api = Api(app)  # pylint: disable=C0103

@api.representation("application/json")
def output_json(data, code, headers=None):
    '''
    convert the response data to json
    '''
    resp = make_response(json.dumps(data), code)
    resp.headers.extend(headers or {})
    return resp

@api.representation("application/xml")
def output_xml(data, code, headers=None):
    '''
    convert the response data to xml
    TODO: place holder to implement xml response
    '''
    resp = make_response(json.dumps(data), code)
    resp.headers.extend(headers or {})
    return resp


NOTE_FIELDS = {
    "id": fields.Integer,
    "content": fields.String,
    "width": fields.Integer,
    "color": fields.String
}

TAG_FIELDS = {
    "id": fields.Integer,
    "name": fields.String,
}

CATEGORY_FIELDS = {
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String
}

ATTACHMENT_FIELDS = {
    "id": fields.Integer,
    "name": fields.String,
    "identity": fields.String,
    "type": fields.String,
    "tags": fields.List(fields.Nested(TAG_FIELDS))
}

TASK_FIELDS = {
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "category": fields.Nested(CATEGORY_FIELDS),
    "done": fields.Boolean,
    "tags": fields.List(fields.Nested(TAG_FIELDS)),
    "dimension": fields.Integer
}


class TaskList(Resource):
    '''
    this is Task list resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=unicode,
                                   required=True, help="No task name provided", location="json")
        self.reqparse.add_argument("description", type=unicode, default="", location="json")
        self.reqparse.add_argument("done", type=bool, required=True, location="json")
        self.reqparse.add_argument("category", type=dict, required=True, location="json")
        self.reqparse.add_argument("tags", type=list, default=[], location="json")
        self.reqparse.add_argument("dimension", type=int, required=True, location="json")
        super(TaskList, self).__init__()

        self.representations = {
            "application/xml": output_xml,
            "application/json": output_json,
        }

    def get(self):
        '''
        method to get task list
        '''
        tasks = models.Task.query.all()
        return {"tasks": [marshal(task, TASK_FIELDS) for task in tasks]}

    def post(self):
        '''
        method to add a task
        '''
        args = self.reqparse.parse_args()

        category = models.Category.query.filter_by(id=args["category"]["id"]).first()
        tags = [models.Tag.query.filter_by(id=tag["id"]).first() for tag in args["tags"]]
        task = models.Task(args["name"], args["description"], category,
                           args["done"], tags, args["dimension"])

        db.session.add(task)
        db.session.commit()

        return {"task": marshal(task, TASK_FIELDS)}, 201


class Task(Resource):
    '''
    this is Task resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=unicode, location="json")
        self.reqparse.add_argument("description", type=unicode, location="json")
        self.reqparse.add_argument("done", type=bool, location="json")
        self.reqparse.add_argument("category", type=dict, location="json")
        self.reqparse.add_argument("tags", type=list, location="json")
        self.reqparse.add_argument("dimension", type=int, required=True, location="json")
        super(Task, self).__init__()

    def get(self, task_id):
        '''
        method to get task info by task id
        '''
        task = models.Task.query.filter_by(id=task_id).first()

        if not task:
            abort(404)

        return {"task": marshal(task, TASK_FIELDS)}

    def put(self, task_id):
        '''
        method to update task by task id
        '''
        task = models.Task.query.filter_by(id=task_id).first()

        if not task:
            abort(404)

        args = self.reqparse.parse_args()

        args.category = models.Category.query.filter_by(id=args["category"]["id"]).first()
        args.tags = [models.Tag.query.filter_by(id=tag["id"]).first() for tag in args["tags"]]

        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(task, arg_name, arg_value)

        db.session.commit()
        return {"task": marshal(task, TASK_FIELDS)}

    def delete(self, task_id):
        '''
        method to delete task by task id
        '''
        task = models.Task.query.filter_by(id=task_id).first()
        if not task:
            abort(404)

        db.session.delete(task)
        db.session.commit()
        return {"task": task.id}


class TaskListByStatus(Resource):
    '''
    this is Task list resource by task status
    '''
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("done", type=unicode, default="", location="args")
        super(TaskListByStatus, self).__init__()

    def get(self):
        '''
        method to get task list by task status
        '''
        args = self.reqparse.parse_args()
        done = args["done"]
        done = [done.lower() == "true" and True or False][0]
        tasks = models.Task.query.filter_by(done=done).all()
        return {"tasks": [marshal(task, TASK_FIELDS) for task in tasks]}


class TaskListByCategory(Resource):
    '''
    this is Task list resource by task category
    '''
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("category_id", type=int, default="", location="args")
        super(TaskListByCategory, self).__init__()

    def get(self):
        '''
        method to get task list by task category
        '''
        args = self.reqparse.parse_args()
        print args
        category_id = args["category_id"]
        tasks = models.Task.query.filter_by(category_id=category_id).all()
        return {"tasks": [marshal(task, TASK_FIELDS) for task in tasks]}


class CategoryListAPI(Resource):
    '''
    this is Category list resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=unicode, required=True,
                                   help="No category name provided", location="json")
        self.reqparse.add_argument("description", type=unicode, default="", location="json")
        super(CategoryListAPI, self).__init__()

    def get(self):
        '''
        method to get category list
        '''
        categories = models.Category.query.all()
        return {"categories": [marshal(category, CATEGORY_FIELDS) for category in categories]}

    def post(self):
        '''
        method to add a category
        '''
        args = self.reqparse.parse_args()
        category = models.Category(args["name"], args["description"])
        db.session.add(category)
        db.session.commit()
        return {"category": marshal(category, CATEGORY_FIELDS)}, 201


class CategoryAPI(Resource):
    '''
    this is Category resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=unicode, location="json")
        self.reqparse.add_argument("description", type=unicode, location="json")
        super(CategoryAPI, self).__init__()

    def get(self, category_id):
        '''
        method to get category info by category id
        '''
        category = models.Category.query.filter_by(id=category_id).first()
        if not category:
            abort(404)

        return {"category": marshal(category, CATEGORY_FIELDS)}

    def put(self, category_id):
        '''
        method to update category by category id
        '''
        category = models.Category.query.filter_by(id=category_id).first()

        if not category:
            abort(404)

        args = self.reqparse.parse_args()
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(category, arg_name, arg_value)
        db.session.commit()
        return {"category": marshal(category, CATEGORY_FIELDS)}

    def delete(self, category_id):
        '''
        method to delete category by category id
        '''
        category = models.Category.query.filter_by(id=category_id).first()
        if not category:
            abort(404)
        db.session.delete(category)
        db.session.commit()
        return {"category": marshal(category, CATEGORY_FIELDS)}


class TagListAPI(Resource):
    '''
    this is Tag list resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=unicode, required=True,
                                   help="No tag name provided", location="json")
        super(TagListAPI, self).__init__()

    def get(self):
        '''
        method to get tag list
        '''
        tags = models.Tag.query.all()
        return {"tags": [marshal(tag, TAG_FIELDS) for tag in tags]}

    def post(self):
        '''
        method to add a tag
        '''
        args = self.reqparse.parse_args()
        tag = models.Tag(args["name"])
        db.session.add(tag)
        db.session.commit()
        return {"tag": marshal(tag, TAG_FIELDS)}, 201


class TagAPI(Resource):
    '''
    this is Tag resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=unicode, location="json")
        super(TagAPI, self).__init__()

    def get(self, tag_id):
        '''
        method to get tag info by tag id
        '''
        tag = models.Tag.query.filter_by(id=tag_id).first()
        if not tag:
            abort(404)

        return {"tag": marshal(tag, TAG_FIELDS)}


    def put(self, tag_id):
        '''
        method to update tag by tag id
        '''
        tag = models.Tag.query.filter_by(id=tag_id).first()

        if not tag:
            abort(404)

        args = self.reqparse.parse_args()
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(tag, arg_name, arg_value)
        db.session.commit()
        return {"tag": marshal(tag, TAG_FIELDS)}

    def delete(self, tag_id):
        '''
        method to delete tag by tag id
        '''
        tag = models.Tag.query.filter_by(id=tag_id).first()
        if not tag:
            abort(404)
        db.session.delete(tag)
        db.session.commit()
        return {"tag": marshal(tag, TAG_FIELDS)}


class NoteListAPI(Resource):
    '''
    this is Note list resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("content", type=unicode, required=True,
                                   help="No note content provided", location="json")
        self.reqparse.add_argument("width", type=int, default=1, location="json")
        self.reqparse.add_argument("color", type=str, location="json")
        super(NoteListAPI, self).__init__()

    def get(self):
        '''
        method to get note list
        '''
        notes = models.Note.query.all()
        return {"notes": [marshal(note, NOTE_FIELDS) for note in notes]}

    def post(self):
        '''
        method to add a note
        '''
        args = self.reqparse.parse_args()
        print args
        note = models.Note(args["content"], args["width"], args["color"])
        db.session.add(note)
        db.session.commit()
        return {"note": marshal(note, NOTE_FIELDS)}, 201


class NoteAPI(Resource):
    '''
    this is Note resource
    '''
    #decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("content", type=unicode, location="json")
        self.reqparse.add_argument("width", type=int, default=1, location="json")
        self.reqparse.add_argument("color", type=str, location="json")
        super(NoteAPI, self).__init__()

    def get(self, note_id):
        '''
        method to get note info by id
        '''
        note = models.Note.query.filter_by(id=note_id).first()
        if not note:
            abort(404)

        return {"note": marshal(note, NOTE_FIELDS)}


    def put(self, note_id):
        '''
        method to update note by id
        '''
        note = models.Note.query.filter_by(id=note_id).first()

        if not note:
            abort(404)

        args = self.reqparse.parse_args()
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(note, arg_name, arg_value)
        db.session.commit()
        return {"note": marshal(note, NOTE_FIELDS)}

    def delete(self, note_id):
        '''
        method to delete note by id
        '''
        note = models.Note.query.filter_by(id=note_id).first()
        if not note:
            abort(404)
        db.session.delete(note)
        db.session.commit()
        return {"note": marshal(note, NOTE_FIELDS)}


# This is the path to the upload directory
app.config["UPLOAD_FOLDER"] = "uploads"
# These are the extension that we are accepting to be uploaded
app.config["ALLOWED_EXTENSIONS"] = set(["txt", "pdf", "png", "jpg", "jpeg", "gif", "py"])

def allowed_file(filename):
    '''
    function to check allowed attachment extension
    '''
    return "." in filename and filename.rsplit(".", 1)[1] in app.config["ALLOWED_EXTENSIONS"]

class AttachmentListAPI(Resource):
    '''
    this is Attachment list resource
    '''
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("file",
                                   type=werkzeug.datastructures.FileStorage,
                                   location="files")
        self.reqparse.add_argument("tags", type=str, default="", location="form")
        super(AttachmentListAPI, self).__init__()

    def get(self):
        '''
        method to get attachment list
        '''
        attachments = models.Attachment.query.all()
        return {"attachments":
                [marshal(attachment, ATTACHMENT_FIELDS) for attachment in attachments]}

    def post(self):
        '''
        method to add attachment
        '''
        args = self.reqparse.parse_args()
        file_obj = args["file"]
        tag_ids = []
        if args["tags"]:
            tag_ids = args["tags"].split(",")

        #if file and allowed_file(file.filename.lower()):
        if file_obj:
            filename = werkzeug.secure_filename(file_obj.filename)
            raw_name = os.path.splitext(filename)[0]
            extension = os.path.splitext(filename)[1]
            identity = str(uuid.uuid4()) + extension
            file_obj.save(os.path.join(app.config["UPLOAD_FOLDER"], identity))

            tags = [models.Tag.query.filter_by(id=tag_id).first() for tag_id in tag_ids]

            attachment = models.Attachment(raw_name, extension, identity, tags)
            db.session.add(attachment)
            db.session.commit()

            return {"attachment": marshal(attachment, ATTACHMENT_FIELDS)}, 201


class AttachmentAPI(Resource):
    '''
    this is Attachment resource
    '''
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=unicode, default="", location="json")
        self.reqparse.add_argument("tags", type=list, default=[], location="json")
        super(AttachmentAPI, self).__init__()

    def get(self, attachment_id):
        '''
        method to get attachment by id
        '''
        attachment = models.Attachment.query.filter_by(id=attachment_id).first()

        if not attachment:
            abort(404)

        return send_from_directory(
            os.path.join(os.getcwd(), app.config["UPLOAD_FOLDER"]),
            attachment.identity)

    def put(self, attachment_id):
        '''
        method to update attachment by id
        '''
        attachment = models.Attachment.query.filter_by(id=attachment_id).first()

        if not attachment:
            abort(404)

        args = self.reqparse.parse_args()
        tags = args["tags"]

        args.tags = [models.Tag.query.filter_by(id=tag).first() for tag in tags]

        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(attachment, arg_name, arg_value)
        print attachment
        db.session.commit()
        return {"attachment": marshal(attachment, ATTACHMENT_FIELDS)}

    def delete(self, attachment_id):
        '''
        method to delete attachment by id
        '''
        attachment = models.Attachment.query.filter_by(id=attachment_id).first()

        if not attachment:
            abort(404)

        db.session.delete(attachment)
        db.session.commit()

        # delete the uploaded file from disk
        identity = attachment.identity
        os.remove(os.path.join(app.config["UPLOAD_FOLDER"], identity))

        return {"attachment": attachment.id}


api.add_resource(TaskList,
                 "/remember/api/v1.0/tasks",
                 endpoint="ep_tasks")
api.add_resource(TaskListByStatus,
                 "/remember/api/v1.0/tasks/find-by-status",
                 endpoint="ep_taskByStatus")
api.add_resource(TaskListByCategory,
                 "/remember/api/v1.0/tasks/find-by-category",
                 endpoint="ep_taskByCategory")
api.add_resource(Task,
                 "/remember/api/v1.0/tasks/<int:task_id>",
                 endpoint="ep_task")


api.add_resource(CategoryListAPI,
                 "/remember/api/v1.0/categories",
                 endpoint="ep_categories")
api.add_resource(CategoryAPI,
                 "/remember/api/v1.0/categories/<int:category_id>",
                 endpoint="ep_category")


api.add_resource(TagListAPI,
                 "/remember/api/v1.0/tags",
                 endpoint="ep_tags")
api.add_resource(TagAPI,
                 "/remember/api/v1.0/tags/<int:tag_id>",
                 endpoint="ep_tag")


api.add_resource(NoteListAPI,
                 "/remember/api/v1.0/notes",
                 endpoint="ep_notes")
api.add_resource(NoteAPI,
                 "/remember/api/v1.0/notes/<int:note_id>",
                 endpoint="ep_note")


api.add_resource(AttachmentListAPI,
                 "/remember/api/v1.0/attachments",
                 endpoint="ep_attachments")
api.add_resource(AttachmentAPI,
                 "/remember/api/v1.0/attachments/<int:attachment_id>",
                 endpoint="ep_attachment")
