import React from "react";

function DropDownItem({ text }) {
  return (
    <div>
      <li>
        <a href="#lorem" style={{ paddingLeft: "1em" }}>
          {text}
        </a>
      </li>
    </div>
  );
}

export default DropDownItem;
