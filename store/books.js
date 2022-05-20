import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
  },
  reducers: {
    GET_ALL_BOOKS: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { GET_ALL_BOOKS } = bookSlice.actions;

export default bookSlice.reducer;
