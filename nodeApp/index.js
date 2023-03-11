const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

// To create the app invoke the express function
const app = express();
app.use(express.json());
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

// Setting up pagination
app.get("/booksPagination", (req, res) => {
  const page = req.query.page || 0;
  const booksPerPage = 3;
  let books = [];
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(booksPerPage * page)
    .limit(booksPerPage)
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

app.post("/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document!!" });
    });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    db.collection("books")
      .deleteOne({ _id: ObjectId(id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) =>
        res.status(500).json({ error: "Could not delete the document" })
      );
  } else {
    res.status(500).json({ error: "Not a valid document ID" });
  }
});

app.patch("/books/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (ObjectId.isValid(id)) {
    db.collection("books")
      .updateOne({ _id: ObjectId(id) }, { $set: updates })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) =>
        res.status(500).json({ error: "Could not update the document" })
      );
  } else {
    res.status(500).json({ error: "Not a valid document ID" });
  }
});
