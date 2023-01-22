import pymongo


class Repository:
    """Simple base repository for all my database interactions."""

    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client["test_db"]
    return db["users"]