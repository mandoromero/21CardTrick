import { createSlice } from "@reduxjs/toolkit";
import cardImages from "../components/CardImages/CardImages.jsx";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    allCards: shuffleArray(cardImages),
    selectedCards: [],
    showFront: false,
    stage: "initial", // stages: initial, selecting, rows, redeal
  },
  reducers: {
    shuffleCards: (state) => {
      state.allCards = shuffleArray(state.allCards);
      state.showFront = true;
      state.stage = "selecting";
      state.selectedCards = [];
    },
    toggleSelectCard: (state, action) => {
      const cardName = action.payload;
      if (state.selectedCards.includes(cardName)) {
        state.selectedCards = state.selectedCards.filter((c) => c !== cardName);
      } else if (state.selectedCards.length < 21) {
        state.selectedCards.push(cardName);
      }
    },
    showRows: (state) => {
      state.stage = "rows";
    },
    updateCards: (state, action) => {
      state.allCards = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
  },
});

export const { shuffleCards, toggleSelectCard, showRows, updateCards, setStage } =
  cardSlice.actions;

export default cardSlice.reducer;
