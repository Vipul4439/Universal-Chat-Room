const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const usersarr = {};

io.on("connection", (socket) => {
  socket.on("new-entry", (nameOfUser) => {
    usersarr[socket.id] = nameOfUser;

    socket.broadcast.emit("user-name", nameOfUser);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("showmsgtoall", {
      message: message,
      name: usersarr[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", usersarr[socket.id]);
    delete usersarr[socket.id];
  });
});
