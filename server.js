const express = require("express");
const app = express();

const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoute')
const bookingsRoute = require('./routes/bookingsRoute')

app.use(express.json())
app.use('/api/rooms' , roomsRoute)
app.use('/api/users' , userRoute)
app.use('/api/bookings' , bookingsRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Server Started using nodemon`));