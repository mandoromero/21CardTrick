import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSelectCard,
  showRows,
  updateSelectedCards,
} from "../../redux/cardSlice";
import backOfCard from "../../assets/Back_of_card/back_of_card.svg";
import ChooseCards from "../ChooseCards/ChooseCards";
import CardRows from "../CardRows/CardRows";
import "./Cards.css";

export default function Cards() {
  const dispatch = useDispatch();
  const { allCards, selectedCards, showFront, stage } = useSelector(
    (state) => state.cards
  );

  const [selectedRow, setSelectedRow] = useState(null);
  const [currentCards, setCurrentCards] = useState([]);
  const [round, setRound] = useState(0);

  // --- Select individual cards (first phase)
  const handleSelectCard = (cardName) => {
    if (stage === "selecting") dispatch(toggleSelectCard(cardName));
  };

  // --- Move to 3-row view
  const handleFirstReady = () => {
    const selected = allCards.filter((c) => selectedCards.includes(c.name));
    console.log("Selected Cards:", selected);
    setCurrentCards(selected);
    dispatch(showRows());
    console.log("Selected cards data:", selected);
  };

  // --- Handle row selection + redeal
  const handleSecondReady = () => {
    if (selectedRow === null) {
      alert("Did you pick a card? What row is it in?");
      return;
    }

    const flipped = currentCards.map((c) => ({ ...c, flipped: true }));

    // Divide into 3 rows of 7
    const rows = [];
    for (let i = 0; i < 3; i++) rows.push(flipped.slice(i * 7, i * 7 + 7));

    // Stack rows with selected in middle
    let collected = [];
    if (selectedRow === 0) collected = [...rows[1], ...rows[0], ...rows[2]];
    else if (selectedRow === 1) collected = [...rows[0], ...rows[1], ...rows[2]];
    else collected = [...rows[0], ...rows[2], ...rows[1]];

    // Redeal pattern: top → middle → bottom repeatedly
    const newRows = [[], [], []];
    collected.forEach((card, i) => newRows[i % 3].push({ ...card, flipped: false }));

    const redealt = [...newRows[0], ...newRows[1], ...newRows[2]];

    setSelectedRow(null);
    setCurrentCards(redealt);
    setRound(round + 1);

    dispatch(updateSelectedCards(redealt.map((c) => c.name)));
  };

  // --- Render 3-row view (after 21 cards chosen)
  if (stage === "rows") {
    return (
      <CardRows
        currentCards={currentCards}
        selectedRow={selectedRow}
        handleRowSelect={setSelectedRow}
        handleSecondReady={handleSecondReady}
        round={round}
        backOfCard={backOfCard}
      />
    );
  }

  // --- Render initial 52-card selection view
  return (
    <ChooseCards
      allCards={allCards}
      showFront={showFront}
      selectedCards={selectedCards}
      handleSelectCard={handleSelectCard}
      handleFirstReady={handleFirstReady}
      stage={stage}
      backOfCard={backOfCard}
    />
  );
}
