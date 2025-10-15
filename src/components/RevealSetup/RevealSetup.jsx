import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";
import ReadyBtn2 from "../ReadyBtn/ReadyBtn2";
import "../RevealSetup/RevealSetup.css";
import RevealModule from "../RevealModule/RevealModule";

export default function RevealSetup({ handleRevealReady }) {
  const currentCards = useSelector((state) => state.cards.currentCards);
  const [visibleCards, setVisibleCards] = useState([]);
  const [revealedCard, setRevealedCard] = useState(null);

  useEffect(() => {
    if (!currentCards.length) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < 10) {
        setVisibleCards((prev) => [...prev, currentCards[index]]);
        index++;
      } else {
        clearInterval(interval);
        // After 10 cards, reveal 11th card
        setTimeout(() => {
          setRevealedCard(currentCards[10]);
        }, 2000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentCards]);

  return (
    <div className="reveal-setup-wrapper">
      <h2 className="reveal-setup-title">I will now find your card!</h2>

      <div className="reveal-setup-container">
        {/* Pile */}
        <div className="pile-container">
          {currentCards.map((card) => (
            <img
              key={card.name}
              src={backOfCard}
              alt="card back"
              className="pile-card"
            />
          ))}
        </div>

        {/* 10-card grid */}
        <div className="grid-container">
          {visibleCards.map((card, i) => (
            <div key={card.name || i} className="card-slot">
              <img src={backOfCard} alt="card back" className="grid-card" />
            </div>
          ))}
        </div>
      </div>

      {/* Final reveal */}
      <RevealModule card={revealedCard} onClose={() => setRevealedCard(null)} />


      <div className="reveal-btn">
        <ReadyBtn2 onClick={handleRevealReady} />
      </div>
    </div>
  );
}