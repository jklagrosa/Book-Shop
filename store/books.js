import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    saleBooks: [],
    bestSeller: [],
    favBooks: [],
  },
  reducers: {
    GET_ALL_BOOKS: (state, action) => {
      state.books = action.payload;
    },
    GET_ALL_BOOKS_SALE: (state, action) => {
      state.saleBooks = action.payload;
    },
    GET_ALL_BEST_SELLER: (state, action) => {
      state.bestSeller = action.payload;
    },

    ALL_FAV_BOOKS: (state, action) => {
      state.favBooks = action.payload;
    },
  },
});

export const {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_SALE,
  GET_ALL_BEST_SELLER,
  ALL_FAV_BOOKS,
} = bookSlice.actions;

export default bookSlice.reducer;
