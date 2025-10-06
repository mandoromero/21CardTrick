import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffleCards } from "../../redux/cardSlice";
import "./Nav.css";

export default function Nav() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.cards.selectedCards.length);

    return (
        <nav id="nav-bar">
            <h1 id="title">21 Card Trick</h1>
            <div className="nav-controls">
                <span id="counter">Chosen Cards: {count}/21</span>
                <button id="shuffle-btn" onClick={() => dispatch(shuffleCards())}>Shuffle</button>
            </div>
        </nav>
    );
} 