'''
Models used in Remember
'''
from flask_sqlalchemy import SQLAlchemy

from app import app


db = SQLAlchemy(app)    # pylint: disable=C0103

tags_tasks = db.Table(  # pylint: disable=C0103
    "tags_tasks",
    db.Column("tag_id", db.Integer, db.ForeignKey("tag.id")),
    db.Column("task_id", db.Integer, db.ForeignKey("task.id"))
)

tags_attachments = db.Table(    # pylint: disable=C0103
    "tags_attachments",
    db.Column("tag_id", db.Integer, db.ForeignKey("tag.id")),
    db.Column("attachment_id", db.Integer, db.ForeignKey("attachment.id"))
)


class Task(db.Model):
    '''
    this is Task model
    '''
    id = db.Column(db.Integer, primary_key=True)    # pylint: disable=C0103
    name = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    done = db.Column(db.Boolean)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"))
    category = db.relationship("Category", backref=db.backref("tasks", lazy="dynamic"))
    tags = db.relationship("Tag", secondary=tags_tasks, backref=db.backref("tasks", lazy="dynamic"))
    dimension = db.Column(db.Integer)

    def __init__(self, name, description, category, done, tags, dimension):
        self.name = name
        self.description = description
        self.category = category
        self.done = done
        self.tags = tags
        self.dimension = dimension

    def __repr__(self):
        return "<Task %r>" % self.name


class Category(db.Model):
    '''
    this is Category model
    '''
    id = db.Column(db.Integer, primary_key=True)    # pylint: disable=C0103
    name = db.Column(db.String(100))
    description = db.Column(db.String(100))

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return "<Category %r>" % self.name


class Tag(db.Model):
    '''
    this is Tag model
    '''
    id = db.Column(db.Integer, primary_key=True)    # pylint: disable=C0103
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Tag %r>" % self.name


class Note(db.Model):
    '''
    this is Note model
    '''
    id = db.Column(db.Integer, primary_key=True)    # pylint: disable=C0103
    content = db.Column(db.String(1000))
    width = db.Column(db.Integer)
    color = db.Column(db.String(20))

    def __init__(self, content, width, color):
        self.content = content
        self.width = width
        self.color = color

    def __repr__(self):
        return "<Note %r>" % self.content


class Attachment(db.Model):
    '''
    this is attachment model
    '''
    id = db.Column(db.Integer, primary_key=True)    # pylint: disable=C0103
    name = db.Column(db.String(50))
    type = db.Column(db.String(50))
    identity = db.Column(db.String(50))
    tags = db.relationship("Tag", secondary=tags_attachments,
                           backref=db.backref("attachments", lazy="dynamic"))

    def __init__(self, name, extension, identity, tags):
        self.name = name
        self.type = extension
        self.identity = identity
        self.tags = tags

    def __repr__(self):
        return "<Attachment %r>" % self.name
