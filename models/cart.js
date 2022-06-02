import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
  cart: {
    type: Boolean,
  },
  
});

mongoose.models = {};

export default mongoose.model("cart", cartSchema);
