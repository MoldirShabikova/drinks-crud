const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getDrinks} = require('./controller')

app.get('/getDrinks', getDrinks)

app.listen(4000, ()=> console.log('Listening on port 4000'))