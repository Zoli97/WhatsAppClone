import React from "react";
import DropDownItem from "./DropDownItem";
function Dropdown() {
  return (
    <div>
      <ul style={{ margin: "none" }}>
        <DropDownItem text={"New Group"} />
        <DropDownItem text={"Create a Room"} />
        <DropDownItem text={"Profile"} />
        <DropDownItem text={"Archived"} />
        <DropDownItem text={"Starred"} />
        <DropDownItem text={"Settings"} />
        <DropDownItem text={"Log out"} />
      </ul>
    </div>
  );
}

export default Dropdown;
