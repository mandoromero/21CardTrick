import React from "react";
import { useDispatch } from "react-redux";
import { toggleSelectCard } from "../../redux/cardSlice";
import ReadyBtn1 from "../ReadyBtn/ReadyBtn1";

export default function ChooseCards({
  allCards,
  showFront,
  selectedCards,
  stage,
  handleFirstReady,
  backOfCard,
}) {
  const dispatch = useDispatch();

  // ✅ Create 8 rows: 7x7 + 1x3 = 52 cards
  const rows = [];
  for (let i = 0; i < 7; i++) {
    rows.push(allCards.slice(i * 7, i * 7 + 7)); // 7 full rows
  }
  rows.push(allCards.slice(49, 52)); // final 3 cards

  return (
    <div className="cards-wrapper">
      <h2>Choose 21 Cards</h2>

      <div className="cards-container">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="cards-row">
            {row.map((card) => {
              const isSelected = selectedCards.some((c) => c.name === card.name);
              return (
                <div key={card.name} className={`card-wrapper ${isSelected ? "selected" : ""}`}>
                  <div
                    className="card"
                    onClick={() => dispatch(toggleSelectCard(card.name))}
                  >
                    <div className="card-inner">
                      <div className="card-front">
                        <img
                          src={card.src}
                          alt={card.name}
                          className="card-image"
                        />
                      </div>
                      <div className="card-back">
                        <img
                          src={backOfCard}
                          alt="Back of Card"
                          className="card-image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedCards.length === 21 && stage === "selecting" && (
        <ReadyBtn1 onClick={handleFirstReady} />
      )}
    </div>
  );
}
