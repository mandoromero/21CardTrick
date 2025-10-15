import React, { useEffect } from "react";
import "../RevealModule/RevealModule.css";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";

export default function RevealModule({ card, onClose }) {
  useEffect(() => {
    // Disable background scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  if (!card) return null;

  const imageSrc = card.src || backOfCard;

  return (
    <div className="reveal-overlay" onClick={onClose}>
      <div className="reveal-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="reveal-title">Your card is the...</h2>

        <div className="reveal-card-wrapper">
          <img src={imageSrc} alt={card.name} className="revealed-card" />
        </div>

        <p className="reveal-card-name">{card.name.replace(/_/g, " ")}</p>

        <button className="close-btn" onClick={onClose}>
          ✖ Close
        </button>
      </div>
    </div>
  );
}