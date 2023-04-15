const express = require("express");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");
const authMiddleware = require("../middleware/authMiddleware");

const bookRoute = express.Router();

bookRoute
  .route("/")
  .post(
    asyncHandler(async (req, res) => {
      const book = await Book.create(req.body);

      if (book) {
        res.status(200).json(book);
      } else {
        res.status(500);
        throw new Error("Book creation failed");
      }
    }),
  )
  .get(
    asyncHandler(async (req, res) => {
      const book = await Book.find({});

      if (book) {
        res.status(200).json(book);
      } else {
        res.status(500);
        throw new Error("There are no Books");
      }
    }),
  );

bookRoute
  .route("/:id")
  .put(
    authMiddleware,
    asyncHandler(async (req, res) => {
      const book = await Book.findById(req.params.id);

      if (book) {
        const updatedBook = await Book.findByIdAndUpdate(
          req.params.id,
          req.body,
          { useFindAndModify: false, new: true, runValidators: true },
        );
        res.status(200);
        res.json(updatedBook);
      } else {
        res.status(500);

        throw new Error("Update failed");
      }
    }),
  )
  .delete(
    asyncHandler(async (req, res) => {
      try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.send("book deleted");
      } catch (error) {
        console.log(error.message);
      }
    }),
  );

module.exports = bookRoute;
