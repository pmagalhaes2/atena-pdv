const express = require("express")

const { registerUser } = require("./controllers/controllersUsers")
const validateRequest = require("./middlewares/validateRequest")
const userSchema = require("./validations/userSchema")

const routes = express()

routes.post('/usuario', validateRequest(userSchema), registerUser)



module.exports = routes
