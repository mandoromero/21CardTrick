import "./ControlBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { markReady } from "../../redux/cardSlice";

export default function ControlBtn() {
  const dispatch = useDispatch();
  const { selectedCards, ready } = useSelector((state) => state.cards);

  if (selectedCards.length !== 21 || ready) return null; // ✅ Hide unless ready to start

  return (
    <div className="btn-container">
      <button className="control-btn" onClick={() => dispatch(markReady())}>
        Ready
      </button>
    </div>
  );
}
