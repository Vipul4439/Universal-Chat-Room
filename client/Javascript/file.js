const socket = io("http://localhost:3000");

const form = document.getElementById("form-send");
const textinput = document.getElementById("textinp");
const mainmsgcontainer = document.querySelector(".main-container");

var ring = new Audio("rigntone.mp3");

function takeinputfuction() {
  var inputtag = document.getElementById("username-tag");
  var inputdata = document.getElementById("username-tag").value;
  inputtag.value = "";
  socket.emit("new-entry", inputdata);
}

const itemAppend = (message, position) => {
  const mainmsgelement = document.createElement("div");
  mainmsgelement.innerText = message;
  mainmsgelement.classList.add("message");
  mainmsgelement.classList.add(position);
  mainmsgcontainer.append(mainmsgelement);

  if (position == "left") {
    ring.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = textinput.value;
  itemAppend(`You : ${message}`, "right");
  socket.emit("send", message);
  textinput.value = "";
});

socket.on("left", (name) => {
  itemAppend(`${name} left the chat`, "left");
});

socket.on("user-name", (name) => {
  itemAppend(`${name} joined the chat`, "right");
});

socket.on("showmsgtoall", (data) => {
  itemAppend(`${data.name}: ${data.message}`, "left");
});
