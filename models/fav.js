import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
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
  fav: {
    type: Boolean,
  },
  qty: {
    type: Number,
  },
});

mongoose.models = {};

export default mongoose.model("favs", favSchema);
