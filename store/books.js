import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    saleBooks: [],
  },
  reducers: {
    GET_ALL_BOOKS: (state, action) => {
      state.books = action.payload;
    },
    GET_ALL_BOOKS_SALE: (state, action) => {
      state.saleBooks = action.payload;
    },
  },
});

export const { GET_ALL_BOOKS, GET_ALL_BOOKS_SALE } = bookSlice.actions;

export default bookSlice.reducer;
