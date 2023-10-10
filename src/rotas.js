const express = require("express")
const { registerUser } = require("./controllers/controllersUsers")

const rotas = express()

rotas.post('usuario', registerUser)

