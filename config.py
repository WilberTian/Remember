'''
this is the config file of Remember
'''

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "db/app.db")
SQLALCHEMY_MIGRATE_REPO = os.path.join(BASE_DIR, "db/db_repository")

