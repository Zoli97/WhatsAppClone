import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import Picker from "emoji-picker-react";
import axios from "../axios";
import "../styles/Chat.css";
//import Avatar from "react-avatar-edit";

function ChatComponent({ messages }) {
  const [input, setInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showColor2, setShowColor2] = useState(false);
  const [showColor3, setShowColor3] = useState(false);
  const [showColor4, setShowColor4] = useState(false);

  // i need to keep tracking what the user typing
  const sendTheMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Ionel",
      timestamp: new Date().toLocaleTimeString(),
      received: true,
    });

    setInput("");
  };

  const changeColor = () => {
    setShowColor((current) => !current);
    setShowPicker((show) => !show);
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    //close the picker when click on emoji
    setShowPicker(false);
  };

  const changeColor2 = () => {
    setShowColor2((currentColor) => !currentColor);
  };

  const changeColor3 = () => {
    setShowColor3((currentColor) => !currentColor);
  };

  const changeColor4 = () => {
    setShowColor4((currentColor) => !currentColor);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__header__info">
          <h3>Room name </h3>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>

        <div className="chat__header__right">
          <IconButton
            onClick={changeColor2}
            style={{ color: showColor2 ? "#008000" : "" }}
          >
            <SearchOutlinedIcon />
          </IconButton>

          <IconButton
            onClick={changeColor3}
            style={{ color: showColor3 ? "#008000" : "" }}
          >
            <AttachFileIcon />
          </IconButton>

          <IconButton
            onClick={changeColor4}
            style={{ color: showColor4 ? "#008000" : "" }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* the chat body if the message was a received only then i attach chat__reciever*/}

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
        ;
      </div>

      <div className="chat__footer">
        <IconButton
          style={{ color: showColor ? "#961D4E" : "" }}
          onClick={changeColor}
        >
          <InsertEmoticonIcon />
        </IconButton>
        {showPicker && (
          <Picker
            pickerStyle={{ width: "50%" }}
            onEmojiClick={onEmojiClick}
            skinTonesDisabled={true}
          />
        )}
        <form action="">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendTheMessage}>Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatComponent;
