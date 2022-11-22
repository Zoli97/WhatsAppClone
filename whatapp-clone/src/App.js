import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatComponent from "./components/ChatComponent";
import Pusher from "pusher-js";
import axios from "./axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //fetching all the initial info, give some kind of response and all messages i want to store and when i get back
    axios.get("/messages/sync").then((resp) => {
      // console.log(resp.data);
      setMessages(resp.data);
    });
  }, []);

  //run a piece of code when the app loads, when this component loads by icnluding [], when the app comp loads run this code once
  useEffect(() => {
    const pusher = new Pusher("f37c7d1136be9f20aa63", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      alert(JSON.stringify(data));
      //keep all the messages but also the new one
      setMessages([...messages, data]);
    });

    // even the messages changes, only have one subscriber.
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="App">
      <div className="app__body">
        {/*Sidebar */}
        <Sidebar />

        {/*Chat component*/}

        <ChatComponent messages={messages} />
      </div>
    </div>
  );
}

export default App;
