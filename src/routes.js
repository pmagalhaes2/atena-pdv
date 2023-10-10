const express = require("express")

const { registerUser } = require("./controllers/controllersUsers")
const validateRequest = require("./middlewares/validateRequest")
const userSchema = require("./validations/userSchema")

const { getCategories } = require("./controllers/categoryController");

const route = express()

route.post('/usuario', validateRequest(userSchema), registerUser)

route.get("/", (req, res) => res.json("hello, world"));

route.get("/categorias", getCategories);


module.exports = route;

