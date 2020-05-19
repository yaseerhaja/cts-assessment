const express = require("express");
const router = express.Router();
const request = require("request");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./tmp/" });
const csv = require("csv-parser");
const fs = require("fs");

const logger = require("../../logger");
const API_END_POINT = process.env.API_END_POINT;

var dir = "./tmp";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

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
  var file = req.files;
  var target_path = file.fileKey.path;

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
      fs.unlink(target_path, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      });
    });
});

module.exports = router;
