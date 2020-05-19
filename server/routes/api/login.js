const express = require("express");
const router = express.Router();

const logger = require("../../logger");

//Get

//Post
router.post("/identifyLogin", (req, res) => {
  logger.log("info", "%s", req.originalUrl);

  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    res.status(200).send({
      id: 9858685,
      username: "admin",
      firstName: "Admin",
      lastName: "System",
      token: "aswdefrgtyhu",
    });
  } else {
    res.status(200).send(null);
  }
});

//Post

//Put

//Detele

module.exports = router;
