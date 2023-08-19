const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  gnere: String,
  author : String,
  publishing_year : Number,
})

const BookModel = mongoose.model("books", bookSchema);

module.exports = BookModel
