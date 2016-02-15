'''
db create module
'''
import sys
import os.path
sys.path.append("../")

from migrate.versioning import api

import config
from app import models

# create db folder if not exist
if not os.path.exists(config.DB_BASE_DIR):
    os.makedirs(config.DB_BASE_DIR)

models.db.create_all()
if not os.path.exists(config.SQLALCHEMY_MIGRATE_REPO):
    api.create(config.SQLALCHEMY_MIGRATE_REPO, 'database repository')
    api.version_control(config.SQLALCHEMY_DATABASE_URI, config.SQLALCHEMY_MIGRATE_REPO)
else:
    api.version_control(config.SQLALCHEMY_DATABASE_URI,
                        config.SQLALCHEMY_MIGRATE_REPO, api.version(config.SQLALCHEMY_MIGRATE_REPO))
    