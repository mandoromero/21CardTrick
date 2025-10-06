import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelectCard } from "../../redux/cardSlice";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";
import "./cards.css";

export default function Cards() {
  const dispatch = useDispatch();
  const { allCards, selectedCards, showFront, ready } = useSelector(
    (state) => state.cards
  );

  const handleSelect = (cardName) => {
    if (selectedCards.length < 21 || selectedCards.includes(cardName)) {
      dispatch(toggleSelectCard(cardName));
    }
  };

  // When ready, show only selected cards
  const visibleCards = ready
    ? allCards.filter((card) => selectedCards.includes(card.name))
    : allCards;

  return (
    <div className="cards-wrapper">
      <h2>
        {ready
          ? "Your Deck is Ready!"
          : showFront
          ? "Choose 21 Cards"
          : "Deck Ready - Click Shuffle"}
      </h2>
      <div id="cards-container">
        {visibleCards.map((card) => (
          <div key={card.name} className="card">
            <img
              src={
                ready
                  ? card.src // only selected cards remain front-facing
                  : showFront
                  ? card.src
                  : backOfCard
              }
              alt={card.name.replace(".svg", "")}
              className={`card-image ${
                selectedCards.includes(card.name) ? "selected" : ""
              } ${showFront ? "flip" : ""}`}
              onClick={() => showFront && !ready && handleSelect(card.name)}
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "15px",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

