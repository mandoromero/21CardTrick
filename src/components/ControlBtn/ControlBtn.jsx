import "./ControlBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { setStage } from "../../redux/cardSlice";

export default function ControlBtn() {
  const dispatch = useDispatch();
  const { stage, selectedCards } = useSelector((state) => state.cards);

  if (stage !== "rows") return null; // only show during the row-selection phase

  return (
    <div className="btn-container">
      <button
        className="control-btn"
        onClick={() => dispatch(setStage("redeal"))} // move to redeal phase
      >
        Ready
      </button>
    </div>
  );
}
