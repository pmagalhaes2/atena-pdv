require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
	return res.json('Api está funcionando!')
})


app.listen(process.env.PORT)
