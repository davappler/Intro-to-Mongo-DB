from flask import Flask
import pymongo

app = Flask(__name__)

def get_user_collection():


@app.route("/")
def create_user():
    collection = get_user_collection()
    collection.insert_one({"username": "testdata"})
    return "successfully inserted username"