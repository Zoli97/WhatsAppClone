import { Avatar } from "@mui/material";
import React from "react";
import "../styles/SidebarChatItem.css";
function SidebarChatItem({ name, profilePic }) {
  return (
    <div className="sidebar__chat">
      <Avatar src={profilePic} />
      <div className="sidebar__chat__info">
        <h2>{name}</h2>
        <p>This is the last message </p>
      </div>
    </div>
  );
}

export default SidebarChatItem;
