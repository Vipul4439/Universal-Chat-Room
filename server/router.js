const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
}); //access home root when try to access server

module.exports = router; //export routers to use it later in server.js file
