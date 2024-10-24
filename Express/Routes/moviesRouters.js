const express = require('express');
const router = express.Router();
const moviesController = require('./../Controller/moviesController');

// Routes for movies

router.route('/movie-states').get(moviesController.getMovieStats)
router.route('/movies-by-generA/:genre').get(moviesController.getMovieByGener)
router
  .route('/') // This sets up the route for '/' 
  .get(moviesController.getAllMovies) // GET all movies
  .post(moviesController.createNewMovie); // POST a new movie
  
router
  .route('/:id') // This sets up the route for '/:id'
  .get(moviesController.getMovie) // GET a movie by ID
  .patch(moviesController.updateMovie) // PATCH (update) a movie by ID
  .delete(moviesController.deleteMovie); // DELETE a movie by ID

module.exports = router;
