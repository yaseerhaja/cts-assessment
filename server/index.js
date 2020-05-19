const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const employee = require('./routes/api/employee');
const login = require('./routes/api/login');
const fileImport = require('./routes/api/importFile');

app.use('/api/employee', employee);
app.use('/api/login', login);
app.use('/api/fileImport', fileImport);


if (process.env.NODE_ENV === "production") {
  //Static Folder
  app.use(express.static(__dirname + "/public/"));

  //Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
