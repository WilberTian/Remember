from app import db

tags = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('task_id', db.Integer, db.ForeignKey('task.id'))
)           
     
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    done = db.Column(db.Boolean)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    category = db.relationship('Category', backref=db.backref('tasks', lazy='dynamic'))
    tags = db.relationship('Tag', secondary=tags, backref=db.backref('tasks', lazy='dynamic'))
    dimension  = db.Column(db.Integer)
    
    def __init__(self, name, description, category, done, tags, dimension):
        self.name = name
        self.description = description
        self.category = category
        self.done = done
        self.tags = tags
        self.dimension = dimension

    def __repr__(self):
        return '<Task %r>' % self.name
    
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(100))
    
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return '<Category %r>' % self.name
    
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Tag %r>' % self.name
        
        
  