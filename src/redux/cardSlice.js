import { createSlice } from "@reduxjs/toolkit";
import allCardsData from "../allCards.js"; // master deck

// Helper to shuffle the cards array
const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const initialState = {
  allCards: allCardsData,  // 52 cards
  selectedCards: [],        // stores selected card objects
  currentCards: [],         // 21 active cards during trick
  selectedRow: null,        // which row user picked (0,1,2)
  showFront: false,         // cards start face down
  stage: "initial",         // "initial" | "selecting" | "rows" | "revealPrep"
  round: 0,                 // counts redeals
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    /** 🔁 Shuffle button clicked — start selection phase */
    shuffleCards(state) {
      state.selectedCards = [];
      state.currentCards = [];
      state.selectedRow = null;
      state.showFront = false;
      state.round = 0;
      state.stage = "selecting";
    },  
    /** 🃏 Select or deselect a card (limit 21) */
    toggleSelectCard(state, action) {
      const cardName = action.payload;
      const exists = state.selectedCards.find((c) => c.name === cardName);

      if (exists) {
        // deselect
        state.selectedCards = state.selectedCards.filter(
          (c) => c.name !== cardName
        );
      } else if (state.selectedCards.length < 21) {
        // select new card
        const card = state.allCards.find((c) => c.name === cardName);
        if (card) state.selectedCards.push(card);
      }
    },
    flipAllFaceUp: (state) => {
      state.allCards = state.allCards.map((card) => ({
        ...cardSlice,
        faceUp: false,
      }));
    },
    flipAllFaceDown: (state) => {
      state.allCards = state.allCards.map((card) => ({
        ...card,
        faceUp: false,
      }));
    },

    /** ▶️ Move to 3-row view after selecting 21 cards */
    showRows(state) {
      if (state.selectedCards.length === 21) {
        state.currentCards = [...state.selectedCards];
        state.stage = "rows";
        state.round = 1;
      }
    },

    /** ☑️ Store which row was selected (0,1,2) */
    setSelectedRow(state, action) {
      state.selectedRow = action.payload;
    },

    /** 🔄 Redeal cards following classic 21-card trick logic */
    redealCards(state) {
      const { currentCards, selectedRow } = state;
      if (selectedRow === null) return;

     // Flip cards internally
    const flipped = currentCards.map((c) => ({ ...c, flipped: true }));

      // Split into 3 rows of 7
      const rows = [];
      for (let i = 0; i < 3; i++) rows.push(flipped.slice(i * 7, i * 7 + 7));

     // Collect with selected row in middle
      let collected = [];
      if (selectedRow === 0) collected = [...rows[1], ...rows[0], ...rows[2]];
      else if (selectedRow === 1) collected = [...rows[0], ...rows[1], ...rows[2]];
      else collected = [...rows[0], ...rows[2], ...rows[1]];

      // Redeal top → middle → bottom
      const newRows = [[], [], []];
      collected.forEach((card, i) =>
       newRows[i % 3].push({ ...card, flipped: false })
      );

      const redealt = [...newRows[0], ...newRows[1], ...newRows[2]];

      state.currentCards = redealt;
      state.selectedRow = null;
      state.round += 1;

      // Stage transition
      if (state.round >= 4) {
        state.stage = "revealPrep"; // show RevealSetup after 3 redeals
        state.showFront = false;
      } else {
        state.showFront = true; // keep cards clickable for next row selection
      }
    },

    /** 🔁 Reset to initial state */
    resetGame: () => initialState,
  },
});

export const {
  shuffleCards,
  toggleSelectCard,
  showRows,
  setSelectedRow,
  redealCards,
  resetGame,
} = cardSlice.actions;

export default cardSlice.reducer;
