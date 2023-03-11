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
- `db.books.find({$or: [ {pages: {$lt:300}}, {pages: {$gt:400}}] })` - This will look for books with pages <300 or pages>400
- `db.books.find({rating: {$in:[7,8,9]}})` - This will find the books in range of (7,8,9) including 7 and 9.
- `db.books.find({rating: {$nin:[7,8,9]}})` - This will find the books that are not in range of (7,8,9).
- `db.books.find({genres:"fantasy"})` - Here in this case `genres` is an array, and if array contains the string `fantasy` then the book document will be returned.
- `db.books.find({genres:['fantasy']})` - Here now we have encapsulated the word with square brackets and now it will look for exact match of the array, it will only return if there is an array `['fantasy']`
- `db.books.find({genres: {$all:["fantasy","magic"]} })` - using the `$all` will not look for exact array match, it will look for arrays that contain both fantasy and magic and returns that document.
- `db.books.find({"reviews.name":"luigi"})` - This is finding in nested objects, it will returns the document in which `luigi` is a name under review property

# Deleting documents from collections

- `db.books.deleteOne({_id: ObjectId("1234324234234232432")})` - This will delete one document with the given id
- `db.books.deleteMany({author: "J.k Rowling"})`- This will delete all the documents who has the given author.

# Updating documents from collections

- `db.books.updateOne({_id: ObjectId("1234324234234232432")} , {$set: {rating: 8, pages: 500}} )` - This will find the document with the given id and then update it with the data given in second argument.
- `db.books.updateMany({author: "J.k Rowling"}, {$set: {author:"Harry potter"} })` - This will find all the documents with the given author in first argument, and update them with the second argument.
- `db.books.updateOne({_id: ObjectId("1234324234234232432")} , {$inc: {pages: 2}} )` - This will find the document with the given objectId, and then increment the pages property by 2.
- `db.books.updateOne({_id: ObjectId("1234324234234232432")} , {$pull: {genres: "fantasy"}} )` - This `pull` keyword will take the `fantasy` string out of the genres array (it will delete it from that array)
- `db.books.updateOne({_id: ObjectId("1234324234234232432")} , {$push: {genres: "fantasy"}} )` - This `push` keyword will add the `fantasy` string to the genres array,
- `db.books.updateOne({_id: ObjectId("1234324234234232432")} , {$push: {genres: {$each: ["fantasy","thriller"]} }} )` - This `push` keyword will add the `["fantasy","thriller"]` each of these strings to the genres array,

- find() method does not return all the documents to us, here it returns a cursor object, it is an object that points to a set of documents. If find() has arguments then cursor object points to a subset of documents.
- cursor objects has few methods which we can then use to fetch the data which the cursor points to, two of these methods are => `toArray` and `forEach`
- toArray puts the documents that the cursor points to into an array
- if we run a find method and it gets 50k documents from database, they do not all come in one go from database.
- Data comes in batches of 101 documents, then forEach is executed on those 101 documents then next 101 are fetched and so on until 50k are iterated.

# Setting up the express app and mongo db

- run this node app with `nodemon app`
- we are making a file `db.js` => `connectToDb` is responsible for establishing connection to the database and `getDB` is responsible for returning that connection.

```
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/Bookstore")
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((error) => {
        console.log(error);
        return cb(error);
      });
  },
  getDb: () => dbConnection,
};
```

- In the above code we are passing `cb` as an argument to the `connectToDb` function, and then we invoke it when it is a success or invoke it with error when there is an error.


```
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => {
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
```

- In the code above `find` and `sort` return cursor and `forEach` is a cursor method that we apply on the cursor we get from `sort()`


# Tips and knowledge
- In the file we ass `app.use(express.json());`
- The `app.use()` function adds a new middleware to the app.
- `express.json()` is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.
- `express.json()`: It parses incoming JSON requests and puts the parsed data in req.body.
