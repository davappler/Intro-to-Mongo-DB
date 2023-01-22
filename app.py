from flask import Flask
from repository import UserRepository

app = Flask(__name__)


def get_db_config():
    return {"host": "localhost", "port": 27017, "db": "test"}


@app.route("/")
def create_user():
    user_repository = UserRepository(get_db_config())
    user = user_repository.create_user(username="test")
    return f"successully created user {user}"
