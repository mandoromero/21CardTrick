// /src/redux/cardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cards = import.meta.glob("/src/assets/SVG-cards/*.svg", {
  eager: true,
  import: "default",
});

const initialCards = Object.entries(cards).map(([path, src]) => ({
  name: path.split("/").pop(),
  src,
}));

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    allCards: shuffleArray(initialCards),
    selectedCards: [],
    showFront: false,
    ready: false, // ✅ new flag to hide unselected cards later
  },
  reducers: {
    shuffleCards: (state) => {
      state.allCards = shuffleArray(state.allCards);
      state.selectedCards = [];
      state.showFront = true;
      state.ready = false; // reset ready flag
    },
    toggleSelectCard: (state, action) => {
      const cardName = action.payload;
      if (state.ready) return; // ✅ prevent selecting after ready
      if (state.selectedCards.includes(cardName)) {
        state.selectedCards = state.selectedCards.filter((c) => c !== cardName);
      } else if (state.selectedCards.length < 21) {
        state.selectedCards.push(cardName);
      }
    },
    resetSelection: (state) => {
      state.selectedCards = [];
      state.showFront = false;
      state.ready = false;
    },
    markReady: (state) => {
      state.ready = true;
      // Flip unselected cards to back side
      state.showFront = false;
    },
  },
});

export const { shuffleCards, toggleSelectCard, resetSelection, markReady } =
  cardSlice.actions;

export default cardSlice.reducer;
