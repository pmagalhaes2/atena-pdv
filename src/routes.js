const express = require("express");
const { getCategories } = require("./controllers/categoryController");

const route = express();

route.get("/", (req, res) => res.json("hello, world"));

route.get("/categorias", getCategories);

module.exports = route;
