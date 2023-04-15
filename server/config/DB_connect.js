const mongoose = require("mongoose");

//pass: LWurv7glzvYvBfpq
const DB_URL = process.env.MONGODB_URL;

const DB_connection = () => {
  mongoose
    .connect(DB_URL, {
      useUnifiedTopology: true,

      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = DB_connection;
