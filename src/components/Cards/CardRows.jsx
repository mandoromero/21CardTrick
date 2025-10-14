import React from "react";
import ReadyBtn2 from "../ReadyBtn/ReadyBtn2";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";

export default function CardRows({
  currentCards = [],
  selectedRow,
  round,
  handleRowSelect,
  handleSecondReady,
}) {
  // Split into 3 rows of 7
  const rows = [];
  for (let i = 0; i < 3; i++) rows.push(currentCards.slice(i * 7, i * 7 + 7));

  return (
    <div className="cards-wrapper">
      <h2>
        {round === 0
          ? "Pick a card and select the row it’s in:"
          : `Round ${round + 1}: Select the row your card is in again`}
      </h2>

      <div className="cards-container">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="cards-row">
            <div className="input-container">
              <input
                className="input"
                type="checkbox"
                checked={selectedRow === rowIndex}
                onChange={() => handleRowSelect(rowIndex)}
              />
            </div>

            {row.map((card) => (
              <div key={card.name} className="card-wrapper">
                <img
                  src={card.flipped ? backOfCard : card.src}
                  alt={card.name}
                  className="card-image"
                  style={{
                    transition: "transform 0.3s",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <ReadyBtn2 onClick={handleSecondReady} />
    </div>
  );
}