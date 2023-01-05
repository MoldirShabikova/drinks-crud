const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const { getTours, addTours, deleteTour, updateTour } = require("./controller");

app.get("/getTours", getTours);

app.post("/addTours", addTours);

app.delete("/deleteTour/:id", deleteTour);

app.put("/likeTour/:id", updateTour);

app.listen(4000, ()=> console.log('Listening on port 4000'))