const { MongoClient } = require("mongodb");

let dbConnection;
const uri =
  "mongodb+srv://davappler:ArDmj0XLmeHuTYOs@cluster0.80hvizr.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
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
