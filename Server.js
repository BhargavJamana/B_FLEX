require('dotenv').config();
const db = require('./model/db')
const express = require('express');
const auth = require('./routes/authRoutes');
const movie = require('./routes/movieRoutes')
const bookingRoute = require('./routes/bookingRoutes');


const app = express();


app.use(express.json());

app.use('/api', auth);
app.use('/api/movies', movie)
app.use('/api/bookings', bookingRoute);






app.listen(8000, ()=>{
    console.log("server up ");
})