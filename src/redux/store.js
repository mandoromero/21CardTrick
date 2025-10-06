// /src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";

const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
});

export default store; // ✅ DEFAULT EXPORT

