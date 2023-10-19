const express = require("express");

const {
  registerUser,
  detailUser,
  updateUser,
} = require("./controllers/userController");
const validateRequest = require("./middlewares/validateRequest");
const userSchema = require("./validations/userSchema");

const { getCategories } = require("./controllers/categoryController");

const login = require("./controllers/loginController");
const loginSchema = require("./validations/loginSchema");

const authenticatedUser = require("./middlewares/authentication");

const { registerProduct } = require("./controllers/productController");
const productSchema = require("./validations/productSchema");

const {registerCustomer} = require("./controllers/clientController")
const customerSchema = require('./validations/costumerSchema')

const route = express();

route.get("/categoria", getCategories);

route.post("/usuario", validateRequest(userSchema), registerUser);
route.post("/login", validateRequest(loginSchema), login);

route.use(authenticatedUser);

route.get("/usuario", detailUser);
route.put("/usuario", validateRequest(userSchema), updateUser);
route.post("/cliente", validateRequest(customerSchema), registerCustomer)
route.post("/produto", validateRequest(productSchema), registerProduct);

module.exports = route;
