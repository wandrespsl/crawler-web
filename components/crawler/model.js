const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  nameU: String,
  records: {
    author: String,
    detail: String,
    rank: Number,
    title: String
  },
  totalRecords: Number,
  universidad: String,
  url: String,
  date: Date
});

const model = mongoose.model("keyword-search", mySchema);

module.exports = model;

