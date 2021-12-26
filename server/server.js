const express = require("express"); //import express
const http = require("http");
const app = express();
const socketio = require("socket.io"); //import the socket.io
const cors = require("cors"); //import cors

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const router = require("./router");

app.use(cors()); //used to handled cors errors

app.use(router);

const usersarr = {}; //make an pobject it will keep track of all the new users added in chat

io.on("connection", (socket) => {
  //made an connection which will handle all the socket connections
  socket.on("new-entry", (nameOfUser) => {
    //broadcast everyone whenever new user join the chat
    usersarr[socket.id] = nameOfUser;

    socket.broadcast.emit("user-name", nameOfUser);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("showmsgtoall", {
      //broadcast message to all the users whenever new message receive
      message: message,
      name: usersarr[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    // broadcast message to everyone whenever any user left the chat
    socket.broadcast.emit("leftthechat", usersarr[socket.id]);
    delete usersarr[socket.id];
  });
});

server.listen(process.env.PORT || 3000, () =>
  console.log(`Server has started.`)
); //listen to the serven and set the env and default port for server to listen requests
