const express = require("express");
const bodyparser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();
const DB_connection = require("../server/config/DB_connect.js");
const userRoute = require("./routes/usersRoute.js");
const bookRoute = require("./routes/booksRoute.js");
const error = require("../server/middleware/errorMiddlewareHandler.js");
const app = express();

//server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("connected to port 8080 ");
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(error.errorMiddlewareHandler);

//users route
app.use("/api/users", userRoute);

//books route
app.use("/api/books", bookRoute);

//mongodb
DB_connection();
