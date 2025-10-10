import React from "react";
import "./ReadyBtn.css";

export default function ReadyBtn2({ onClick }) {
  return (
    <button className="ready-btn" onClick={onClick}>
      Ready
    </button>
  );
}
