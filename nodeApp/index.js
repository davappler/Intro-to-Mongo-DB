const express = require("express");
const { connectToDb, getDb } = require("./db");

// To create the app invoke the express function
const app = express();

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on 3000!");
    });
    db = getDb();
  }
});

// find() method does not return all the documents to us
// here it returns a cursor object, it is an object that points to a set of documents
// if find() has arguments then cursor object points to a subset of documents
// cursor objects has few methods which we can then use to fetch the data which the cursor points to
// two of these methods are => toArray and forEach
// toArray puts the documents that the cursor points to into an array
//

// if we run a find method and it gets 50k documents from database, they do not all come in one go from database.
// data comes in batches of 101 documents, then forEach is executed on those 101 documents then next 101 are fetched and so on.

// routes
app.get("/books", (req, res) => {
  let books = [];
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => {
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch the documents." });
    });
});
