import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelectCard, showRows } from "../../redux/cardSlice";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";
import "./Cards.css";

export default function Cards() {
  const dispatch = useDispatch();
  const { allCards, selectedCards, showFront, stage } = useSelector(
    (state) => state.cards
  );

  const [selectedRow, setSelectedRow] = useState(null);

  // --- Selecting cards from full deck ---
  const handleSelectCard = (cardName) => {
    if (stage === "selecting") {
      dispatch(toggleSelectCard(cardName));
    }
  };

  // --- Checkbox for 3-row selection ---
  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  // --- First Ready: move to 3-row stage ---
  const handleFirstReady = () => {
    dispatch(showRows());
  };

  // --- Second Ready: after row selection ---
  const handleSecondReady = () => {
    if (selectedRow !== null) {
      console.log("Second Ready clicked for row:", selectedRow);
      // Logic for flipping/redeal can be added here
    }
  };

  // --- Rows stage (21 selected cards) ---
  if (stage === "rows") {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(
        allCards.filter((c) => selectedCards.includes(c.name)).slice(
          i * 7,
          i * 7 + 7
        )
      );
    }

    return (
      <div className="cards-wrapper">
        <h2>Pick your card and select the row it’s in:</h2>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row-wrapper">
            <div className="row-cards">
              <div className="input-container">
                <input
                  type="checkbox"
                  checked={selectedRow === rowIndex}
                  onChange={() => handleRowSelect(rowIndex)}
                />
              </div>
              {row.map((card) => (
                <img
                  key={card.name}
                  src={card.src}
                  alt={card.name}
                  className="card-image"
                  style={{ width: "120px", margin: "15px" }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Second Ready button appears after a row is selected */}
        {selectedRow !== null && (
          <div style={{ marginTop: "25px" }}>
            <button
              className="control-btn"
              onClick={handleSecondReady}
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Ready
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- Initial stage: 52 cards, 8 rows ---
  const rows = [];
  for (let i = 0; i < 7; i++) rows.push(allCards.slice(i * 7, i * 7 + 7));
  rows.push(allCards.slice(49, 52)); // 8th row: 3 cards

  return (
    <div className="cards-wrapper">
      <h2>Choose 21 Cards</h2>
      <div id="cards-container">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row-cards"
            style={{ justifyContent: "flex-start" }}
          >
            {row.map((card) => (
              <img
                key={card.name}
                src={showFront ? card.src : backOfCard}
                alt={card.name}
                className={`card-image ${
                  selectedCards.includes(card.name) ? "selected" : ""
                }`}
                onClick={() => handleSelectCard(card.name)}
                style={{ width: "120px", margin: "15px", cursor: "pointer" }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* First Ready button appears after 21 cards are selected */}
      {selectedCards.length === 21 && stage === "selecting" && (
        <div style={{ marginTop: "25px" }}>
          <button
            className="control-btn"
            onClick={handleFirstReady}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Ready
          </button>
        </div>
      )}
    </div>
  );
}
