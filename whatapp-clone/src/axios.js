import axios from "axios";

//this is the base url for any req that i made , ex once i deploy it all i need to do si change the url
const instance = axios.create({
  baseURL: "http://localhost:9000/",
});

export default instance;
