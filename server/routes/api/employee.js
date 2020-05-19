const express = require("express");
const router = express.Router();
const request = require('request');

const logger = require('../../logger');
const API_END_POINT = process.env.API_END_POINT;

router.get("/getEmployeeList", (req, res) => {
  logger.log('info', '%s', req.originalUrl);

  const uri = `http://${API_END_POINT}/api/v1/employees`;

  request.get(uri,
    {
    },
    (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res
          .header("")
          .status(response.statusCode)
          .json(JSON.parse(response.body));
      }
    });
});

router.post("/create", (req, res) => {
  logger.log("info", "%s", req.originalUrl);

  const uri = `http://${API_END_POINT}/api/v1/create`;
  var post_options = {
    url: uri,
    headers: {
      'Content-Type': 'application/json'
    },
    json: false,
    body: JSON.stringify(req.body)
  };

  request.post(post_options, (error, response, body) => {
    if (error) {
      res.send(error);
    } else {
      res
        .header(response.header)
        .status(response.statusCode)
        .send(response.body);
    }
  });
});

module.exports = router;
