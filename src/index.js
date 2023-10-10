require("dotenv").config();
const express = require("express");
const route = require("./routes");

const app = express();

app.use(express.json());

app.use(route);

app.listen(process.env.PORT);
