const socket = io("https://chat-application-bac.herokuapp.com");

const form = document.getElementById("form-send");
const textinput = document.getElementById("textinp");
const mainmsgcontainer = document.querySelector(".main-container");

var ring = new Audio("rigntone.mp3");

function colorchange() {
  var x = document.getElementById("nametoggle");
  if (x.innerHTML === "Light Mode") {
    x.innerHTML = "Dark Mode";
  } else {
    x.innerHTML = "Light Mode";
  }

  var element = document.body;
  var extra = document.getElementById("extra");
  var main = document.querySelector(".main-container");
  var warning = document.querySelector(".defaultclass");
  var warningDate = document.getElementById("date");
  var inputBox = document.getElementById("textinp");
  var sendBtn = document.querySelector(".btnclass");
  var introductionInput = document.getElementById("username-tag");
  var introductionButton = document.getElementById("buttonid");

  element.classList.toggle("dark-mode");
  extra.classList.toggle("blue-mode");
  main.classList.toggle("inner-body");
  warning.classList.toggle("warning-heading");
  warningDate.classList.toggle("warning-date");
  inputBox.classList.toggle("input-box-color");
  sendBtn.classList.toggle("send-btn");
  introductionInput.classList.toggle("introduction-input");
  introductionButton.classList.toggle("introduction-button");
}

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

socket.on("leftthechat", (name) => {
  itemAppend(`${name} left the chat`, "left");
});

socket.on("user-name", (name) => {
  itemAppend(`${name} joined the chat`, "right");
});

socket.on("showmsgtoall", (data) => {
  itemAppend(`${data.name}: ${data.message}`, "left");
});
