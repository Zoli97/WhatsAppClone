import React, { useState } from "react";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { IconButton, Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../styles/Sidebar.css";
import SidebarChatItem from "./SidebarChatItem";
import Dropdown from "../components/Dropdown";
import { contactList } from "../mockData";
import "../styles/Dropdown.css";

function Sidebar(props) {
  const [showColor, setShowColor] = useState(false);
  const [showColor2, setShowColor2] = useState(false);
  const [showColor3, setShowColor3] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const changeColor = () => {
    setShowColor((currentColor) => !currentColor);
  };

  const changeColor2 = () => {
    setShowColor2((currentColor) => !currentColor);
  };

  const changeColor3 = () => {
    setShowColor3((currentColor) => !currentColor);
    setIsOpen(!isOpen);
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://faces-img.xcdn.link/thumb-lorem-face-4885_thumb.jpg" />

        <div className="sidebar__header__right">
          <IconButton
            onClick={changeColor2}
            style={{ color: showColor2 ? "#008000" : "" }}
          >
            <DonutLargeIcon />
          </IconButton>

          <IconButton
            onClick={changeColor}
            style={{ color: showColor ? "#008000" : "" }}
          >
            <ChatIcon />
          </IconButton>

          <IconButton
            onClick={changeColor3}
            style={{ color: showColor3 ? "#008000" : "" }}
          >
            <MoreVertIcon />
          </IconButton>

          <div className={`dropdown-menu ${isOpen ? "active" : "inactive"}`}>
            <Dropdown />
          </div>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="Sidebar__search__Container">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        {contactList.map((user) => {
          return (
            <SidebarChatItem
              key={user.id}
              name={user.name}
              profilePic={user.profilePic}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
