const socket = io("https://chat-application-bac.herokuapp.com"); //connect client side with server side

const form = document.getElementById("form-send");
const textinput = document.getElementById("textinp");
const mainmsgcontainer = document.querySelector(".main-container");

var ring = new Audio("rigntone.mp3");

function colorchange() {
  //this fuction is used to change theme of application
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
  var changethemebtn = document.getElementById("nametoggle");

  element.classList.toggle("dark-mode"); //used toggle property to change the styling of elements
  extra.classList.toggle("blue-mode");
  main.classList.toggle("inner-body");
  warning.classList.toggle("warning-heading");
  warningDate.classList.toggle("warning-date");
  inputBox.classList.toggle("input-box-color");
  sendBtn.classList.toggle("send-btn");
  introductionInput.classList.toggle("introduction-input");
  introductionButton.classList.toggle("introduction-button");
  changethemebtn.classList.toggle("dark-mode-switch");
}

function takeinputfuction() {
  //this function will take the name of the user and append it as the new user join
  var inputtag = document.getElementById("username-tag");
  var inputdata = document.getElementById("username-tag").value;
  inputtag.value = "";
  socket.emit("new-entry", inputdata);
}

const itemAppend = (message, position) => {
  //this function will decide to append the messange on which side of screen
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
  //take the input from form and connect with server using socket and broadcast the message
  e.preventDefault();
  const message = textinput.value;
  itemAppend(`You : ${message}`, "right");
  socket.emit("send", message);
  textinput.value = "";
});

socket.on("leftthechat", (name) => {
  //when anyone left the chat this will print the user name who left
  itemAppend(`${name} left the chat`, "left");
});

socket.on("user-name", (name) => {
  // when new user join the chat this will inform all the other participants that new user joined
  itemAppend(`${name} joined the chat`, "right");
});

socket.on("showmsgtoall", (data) => {
  //this will broadcast the message to everyone
  itemAppend(`${data.name}: ${data.message}`, "left");
});
