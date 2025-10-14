import React from "react";
import { useSelector } from "react-redux";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";
import ReadyBtn2 from "../ReadyBtn/ReadyBtn2";
import "../RevealSetup/RevealSetup.css";

export default function RevealSetup({ handleRevealReady }) {
    const currentCards =  useSelector((state) => state.cards.currentCards);

    return (
        <div className="reveal-wrapper">
            <h2 className="reveal-title">I will now find your card!</h2>
            <div className="reveal-container">
                <div className="pile-containter">
                    {currentCards.map((card) => (
                        <img
                            key={card.name}
                            src={backOfCard}
                            alt={card.name}
                            className="pile-card"
                        />
                    ))}
                </div>
            </div>
            <div className="reveal-btn">
                <ReadyBtn2 onClick={handleRevealReady} />
            </div>
        </div>
    );
}