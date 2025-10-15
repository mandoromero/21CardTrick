import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showRows, setSelectedRow, redealCards } from "../../redux/cardSlice";
import ChooseCards from "./ChooseCards";
import CardRows from "./CardRows";
import RevealSetup from "../RevealSetup/RevealSetup";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";
import "../Cards/Cards.css";

export default function Cards() {
  const dispatch = useDispatch();
  const {
    allCards,
    selectedCards,
    showFront,
    stage,
    currentCards,
    selectedRow,
    round,
  } = useSelector((state) => state.cards);

  /** Move to rows view after selecting 21 cards */
  const handleFirstReady = () => {
    if (selectedCards.length !== 21) {
      alert("Please select exactly 21 cards!");
      return;
    }
    dispatch(showRows());
  };

  /** Handle row selection & redeal */
  const handleSecondReady = () => {
    if (selectedRow === null) {
      alert("Please select a row first!");
      return;
    }
    dispatch(redealCards());
  };

  // ==========================
  // INITIAL STAGE — show full deck
  // ==========================
  if (stage === "initial") {
    const rows = [];
    for (let i = 0; i < 7; i++) rows.push(allCards.slice(i * 7, i * 7 + 7));
    rows.push(allCards.slice(49, 52));

    return (
      <div className="cards-wrapper">
        <h2>Click Shuffle to Begin</h2>
        <div className="cards-container">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="cards-row">
              {row.map((card) => (
                <div key={card.name} className="card-wrapper">
                  <img src={backOfCard} alt="Back of card" className="card-image" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================
  // SELECTION STAGE — choose 21 cards
  // ==========================
  if (stage === "selecting") {
    return (
      <ChooseCards
        allCards={allCards}
        showFront={showFront}
        selectedCards={selectedCards}
        stage={stage}
        handleFirstReady={handleFirstReady}
        backOfCard={backOfCard}
      />
    );
  }

  // ==========================
  // ROW STAGE — select which row contains the card
  // ==========================
  if (stage === "rows") {
    return (
      <CardRows
        currentCards={currentCards}
        selectedRow={selectedRow}
        round={round}
        handleRowSelect={(row) => dispatch(setSelectedRow(row))}
        handleSecondReady={handleSecondReady}
      />
    );
  }

  // ==========================
  // REVEAL STAGE — show the final chosen card
  // ==========================
  if (stage === "revealPrep") {
    return (
      <RevealSetup
        currentCards={currentCards}
        backOfCard={backOfCard}
      />
    );
  }

  return null;
}
