const express = require("express");
const app = express();
const server = require("http").Server(app);

const config = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const router = require("./network/routes");

db(config.dbUrl);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);

app.set("port", process.env.PORT || 3000);

app.use(config.publicRoute, express.static("public"));

server.listen(app.get("port"), function() {
  console.log(`La aplicación está escuchando en ${app.get("port")}`);
});
