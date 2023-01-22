#### Intro-to-Mongo-DB

Installing community version of mongoDB in local machine
```
brew tap mongodb/brew
brew install mongodb-community
```

Starting and stopping the service with 
- `brew services start mongodb-community`
- `brew services stop mongodb-community`

#### Installing mongosh
- https://www.youtube.com/watch?v=AF1yiS9Avrw
- https://www.mongodb.com/docs/mongodb-shell/install/
- start the mongodb database then run `mongosh` in another terminal to start the shell.

#### General Information
- MongoDB compass is a local interface that allows us to interact with databases


#### Mongosh commands
- `show databases` or `show dbs` - will show the list of databases
- `use bookstore` - will change the current database to `bookstore`
- `cls` will clear the screen
- `db` will list the name of the current database
- `show collections` will list the collections of the current database
- `var name = "Dav"` will create a variable, which can then be modified like js variable.
- `help` -  will list the available commands
- `exit`- will exit the mongosh

#### Inserting collection 
(We are assuming `bookstore` is a database and `books` is a collection in that database)
- `db.bookstore.insertOne()` - This will insert one document in the collection
- `db.bookstore.insertOne({title:"The magic",pages:500})` 
- If a collection does not exist, `insertOne` will still create one in order to add document in it (Just like an object property is created if it does not exit in js)
- `db.bookstore.insertMany([{},{},{}])` - This will insert many documents in the collection
- `db.books.find()` - Will find the first 20 documents from this collection
- `db.books.find({author:"J.K Rowling"})` - We can filter with the help of `find()` method
- `db.books.find({author:"J.K Rowling"},{title:1, author:1})` - `find` takes a second argument as an object and only returns properties that are 1/true.
- `db.books.find({},{title:1, author:1})` - It will send first 20 documents with title and author properties only.
- `db.books.findOne({title:"Something"})` - This will find only one document from collection.
- 

