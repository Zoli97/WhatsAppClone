// adding all data structure that i will be using in db
import mongoose from "mongoose";

//define data schima (bas)

const whatsAppSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

//using scehma for this collection
export default mongoose.model("messagecontents", whatsAppSchema);
