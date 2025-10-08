import React from "react";
import Nav from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import ControlBtn from "./components/ControlBtn/ControlBtn.jsx";

export default function App() {
  return (
    <div>
      <Nav />
      <Cards />
      <ControlBtn />
    </div>
  );
}