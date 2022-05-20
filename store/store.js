import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import BookSlice from "../store/books";

const store = configureStore({
  reducer: {
    book: BookSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
