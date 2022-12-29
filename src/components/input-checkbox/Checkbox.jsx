import React from "react";

function Checkbox({ active }) {
  return (
    <div className="chacked">
      <input
        type="checkbox"
        id="switch-switch"
        className="switch-active"
        checked={active}
        readOnly={true}
      />
      <label className="switch-label-active" htmlFor="switch-switch"></label>
    </div>
  );
}

export default Checkbox;
