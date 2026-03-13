
const express = require('express');
const router = express.Router();

const {addMovie, getMovies, addShow, getShows, getSeats} = require('../Controllers/movieCOntroller')

router.post('/add-movie', addMovie);
router.get('/', getMovies);

router.post('/add-show', addShow);
router.get('/shows/:id', getShows);

router.get('/seats/:id', getSeats);

module.exports = router;
