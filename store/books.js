import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    saleBooks: [],
    bestSeller: [],
    favBooks: [],
    remove_from_favs: [],
    dynamic_page_change: [],
    cartAdded: [],
    remove_from_cart: [],
    decement_cart_changes: [],
    check_out: null,
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

    BOOK_IS_REMOVE_FROM_FAVS: (state, action) => {
      state.remove_from_favs = action.payload;
    },

    DYNAMIC_PAGE_BOOK: (state, action) => {
      state.dynamic_page_change = action.payload;
    },

    ALL_CART_ADDED: (state, action) => {
      state.cartAdded = action.payload;
    },

    BOOK_IS_REMOVE_FROM_CART: (state, action) => {
      state.remove_from_cart = action.payload;
    },
    ITEM_REMOVE_FROM_CART: (state, action) => {
      state.decement_cart_changes = action.payload;
    },
    CHECK_OUT_TRUE: (state, action) => {
      state.check_out = action.payload;
    },
  },
});

export const {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_SALE,
  GET_ALL_BEST_SELLER,
  ALL_FAV_BOOKS,
  BOOK_IS_REMOVE_FROM_FAVS,
  DYNAMIC_PAGE_BOOK,
  ALL_CART_ADDED,
  BOOK_IS_REMOVE_FROM_CART,
  ITEM_REMOVE_FROM_CART,
  CHECK_OUT_TRUE,
} = bookSlice.actions;

export default bookSlice.reducer;
