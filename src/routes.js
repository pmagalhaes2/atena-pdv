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

const {
  detailProduct,
  registerProduct,
  updateProduct,
  getProducts,
  deleteProduct
} = require("./controllers/productController");
const productSchema = require("./validations/productSchema");

const { registerClient, getClients, detailClient, updateClient } = require("./controllers/clientController")
const clientSchema = require('./validations/clientSchema');
const multer = require("./middlewares/multer");

const route = express();

route.get("/categoria", getCategories);

route.post("/usuario", validateRequest(userSchema), registerUser);
route.post("/login", validateRequest(loginSchema), login);

route.use(authenticatedUser);

route.get("/usuario", detailUser);
route.put("/usuario", validateRequest(userSchema), updateUser);

route.post("/cliente", validateRequest(clientSchema), registerClient);
route.get("/cliente", getClients);
route.get("/cliente/:id", detailClient);
route.put("/cliente/:id", validateRequest(clientSchema), updateClient);

route.get("/produto", getProducts);
route.get("/produto/:id", detailProduct);
route.post("/produto", multer.single("produto_imagem"), validateRequest(productSchema), registerProduct);
route.put("/produto/:id", multer.single("produto_imagem"), validateRequest(productSchema), updateProduct);
route.delete("/produto/:id", deleteProduct)

module.exports = route;
