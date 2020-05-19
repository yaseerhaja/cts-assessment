const express = require("express");
const router = express.Router();
const request = require("request");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const csv = require("csv-parser");
const fs = require("fs");

const logger = require("../../logger");
const API_END_POINT = process.env.API_END_POINT;

var dir = "./tmp/";

const replaceKeys = (object) => {
  Object.keys(object).forEach(function (key) {
    var newKey = key.replace(/\s+/g, "_");
    if (object[key] && typeof object[key] === "object") {
      replaceKeys(object[key]);
    }
    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }
  });
};

router.post("/csvFile", multipartMiddleware, (req, res) => {
  logger.log("info", "%s", req.originalUrl);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  var tmp_path = req.files.fileKey.path;
  var target_path = "./tmp/" + req.files.fileKey.name;
  //fs.rename(tmp_path, target_path, function (err) {
    let data = [];
    fs.createReadStream(target_path)
      .pipe(csv())
      .on("data", (row) => {
        replaceKeys(row);
        data.push(row);
      })
      .on("end", () => {
        res.send(data);
        console.log("CSV file successfully processed");
      });

    // fs.unlink(tmp_path, function () {
    //   if (err) throw err;
    // });
  //});
});

module.exports = router;
