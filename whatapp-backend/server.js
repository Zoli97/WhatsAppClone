// require all stuff
import express from "express";
import mongoose from "mongoose";
import Messages from "../whatapp-backend/dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config allow my to write api routes
const app = express();
const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1503441",
  key: "f37c7d1136be9f20aa63",
  secret: "c0d2a010a276b34892a5",
  cluster: "eu",
  useTLS: true,
});

//adding the changestream that will trigger the pusher
//middlewares
app.use(express.json());
app.use(cors());

//db config (mongoose this is gonna be a client that is connectiong to my db ). Help me run mongoose perfectly smooth
const connection_url =
  "mongodb+srv://zoli:OKPQqeDniYlK90Fn@cluster0.vnhpuly.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {});

//???

const database = mongoose.connection;
database.once("open", () => {
  console.log("DB is connected");

  const msgCollection = database.collection("messagecontents");
  const changestream = msgCollection.watch();
  changestream.on("change", (change) => {
    console.log("A change occured", change);

    //save in a change variable, if the op type of that change is insert then fis a full doc field,
    // save that in a var which will be called msgdetails and that is the time when i trigger the pusher and has a channel which will create messages
    //every single time a message get send in i should see.
    if (change.operationType === "insert") {
      const msgDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: msgDetails.name,
        message: msgDetails.message,
        timestamp: msgDetails.timestamp,
        received: msgDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});
//a function that fire off once something has change in my db
// api routes
app.get("/", (req, resp) => resp.status(200).send("Hello lume"));

//find method to get back all the messages, i need to add a room id (1 chat room) to distngis the messages between rooms
app.get("/messages/sync", (req, resp) => {
  Messages.find((error, data) => {
    if (error) {
      resp.status(500).send(error);
    } else {
      resp.status(200).send(data);
    }
  });
});

//passing the msgs structure into the req body
app.post("/messages/new", (req, resp) => {
  const dbMessage = req.body;

  //using mongoose to create a new message using the data dbmessage which is sent in the body
  Messages.create(dbMessage, (error, data) => {
    if (error) {
      resp.status(500).send(error);
    } else {
      resp.status(201).send(`new message created: \n ${data}`);
    }
  });
});

// the listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
