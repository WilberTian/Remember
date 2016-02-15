'''
this is the config file of Remember
'''

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DB_BASE_DIR = os.path.join(BASE_DIR, "db")

SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(DB_BASE_DIR, "app.db")
SQLALCHEMY_MIGRATE_REPO = os.path.join(DB_BASE_DIR, "db_repository")

