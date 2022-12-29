import React from "react";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from "react-icons/fa";

function ToolTip({ contact, id }) {
  return (
    <div className="tooltip">
      <button data-tip="" data-for={id}>
        <FaQuestionCircle className="question-mark " />
      </button>
      <ReactTooltip arrowColor={"rgb(0, 103, 255, 1)"} place={"top"} id={id} className="extraClass">
        {contact}
      </ReactTooltip>
    </div>
  );
}

export default ToolTip;
