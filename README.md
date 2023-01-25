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
- `help` - will list the available commands
- `exit`- will exit the mongosh

#### List of commands

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
- `db.books.find().count()` - chaining `count()` will give the number of results that `find()` returned.
- `db.books.find().limit(3)` - This will limit the number of returned results to a limit of 3.
- `db.books.find().sort({title:1})` - This will sort with title in ascending order
- `db.books.find().sort({title:-1})` - This will sort with title in descending order

# Commands for operators and complex queries

- `db.books.find({rating:{$gt :7}})` - `{$gt :7}` This will filter with rating greater than 7 (not including 7). `{$gte :7}` will include 7
- `db.books.find({rating:{$lt :7}})` - `{$lt :7}` This will filter with rating less than 7 (not including 7). `{$lte :7}` will include 7
- `db.books.find({$or: [{rating: 7},{rating: 9}] })` - `or` operator will find using both filters if they exist. It will find books with 7 and books with rating 9 both of them if available.
- `db.books.find({$or: [ {pages: {$lt:300}}, {pages: {$gt:400}}] })` -  This will look for books with pages <300 or pages>400
- `db.books.find({rating: {$in:[7,8,9]}})` - This will find the books in range of (7,8,9) including 7 and 9.
- `db.books.find({rating: {$nin:[7,8,9]}})` - This will find the books that are not in range of (7,8,9).
- `db.books.find({genres:"fantasy"})` - Here in this case `genres` is an array, and if array contains the string `fantasy` then the book document will be returned. 
- `db.books.find({genres:['fantasy']})` - Here now we have encapsulated the word with square brackets and now it will look for exact match of the array, it will only return if there is an array `['fantasy']`
- `db.books.find({genres: {$all:["fantasy","magic"]} })` - using the `$all` will not look for exact array match, it will look for arrays that contain both fantasy and magic and returns that document.
- `db.books.find({"reviews.name":"luigi"})` - This is finding in nested objects, it will returns the document in which `luigi` is a name under review property
- 
