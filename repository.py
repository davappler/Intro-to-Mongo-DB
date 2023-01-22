import pymongo

class MongoRepository:
    """Base class for all repositories that use MongoDB as a backend."""
    def __init__(self, config):
        self.client = pymongo.MongoClient(config["host"], config["port"])
        self.db = self.client[config["db"]]
        self.collection = self.db[config["collection"]]

    def _insert(self, data):
        self.collection.insert_one(data)

    def _find(self, query):
        return self.collection.find(query)

    def _find_one(self, query):
        return self.collection.find_one(query)

    def _update(self, query, data):
        self.collection.update_one(query, data)

    def _delete(self, query):
        self.collection.delete_one(query)

    def _delete_many(self, query):
        self.collection.delete_many(query)


class UserRepository(MongoRepository):
    def __init__(self, config):
        new_config = config.copy()
        new_config["collection"] = "users"
        super().__init__(new_config)
    
    def create_user(self, username):
        self._insert({"username": username})
        return self._find_one({"username": username})

    def get_user(self, username):
        return self._find_one({"username": username})
    
    def update_user(self, username, new_username):
        self._update({"username": username}, {"username": new_username})
        return self._find_one({"username": new_username})
    
    def delete_user(self, username):
        self._delete({"username": username})
        return self._find_one({"username": username})
