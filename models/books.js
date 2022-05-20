import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  p_date: {
    type: String,
  },
  lang: {
    type: String,
  },
  genre: {
    type: String,
  },
  price: {
    type: Number,
  },
  img: {
    type: String,
  },
  desc: {
    type: String,
  },
  cat: {
    type: String,
  },
  prevPrice: {
    type: Number,
  },
});

mongoose.models = {};

export default mongoose.model("books-collection", bookSchema);
