const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

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

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    db.collection("books")
      .findOne({ _id: ObjectId(id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) =>
        res.status(500).json({ error: "Could not fetch the document" })
      );
  } else {
    res.status(500).json({ error: "Not valid document ID" });
  }
});
