const express = require("express")
const { registerUser } = require("./controllers/controllersUsers")
const validateRequest = require("./middlewares/validateRequest")

const routes = express()

routes.post('usuario',validateRequest, registerUser)

