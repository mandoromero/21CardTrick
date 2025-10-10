import React from "react";
import ReadyBtn1 from "../ReadyBtn/ReadyBtn1";
import "../ChooseCards/ChooseCards.css";

export default function ChooseCards({
  allCards,
  showFront,
  selectedCards,
  handleSelectCard,
  stage,
  handleFirstReady,
  backOfCard,
}) {
  const rows = [];
  for (let i = 0; i < 7; i++) rows.push(allCards.slice(i * 7, i * 7 + 7));
  rows.push(allCards.slice(49, 52));

  return (
    <div className="cards-wrapper">
      <h2>Choose 21 Cards</h2>
      <div id="card-container">
        {rows.map((row, rowIndex) => ( 
          <div key={rowIndex} className="row-cards">
             {row.map((card) => (
              <div key={card.name} className="card-wrapper">
                <img
                  id="choose-cards"
                  key={card.name}
                  src={showFront ? card.src : backOfCard}
                  alt={card.name}
                  className={`card-image ${
                    selectedCards.includes(card.name) ? "selected" : ""
                  }`}
                  onClick={() => handleSelectCard(card.name)}
                  style={{
                    border: selectedCards.includes(card.name)
                      ? "3px solid gold"
                      : "none",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      

      {selectedCards.length === 21 && stage === "selecting" && (
        <ReadyBtn1 onClick={handleFirstReady} />
      )}
    </div>
  );
}
