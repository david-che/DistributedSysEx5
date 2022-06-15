const express = require('express'),
moviesRoutes = require('./movies');
const { send } = require('express/lib/response');

var router = express.Router();

//restful

//movies routes
router.get('/movies/:movie_id', moviesRoutes.getMovie);
router.get('/movies', moviesRoutes.getMovies);
router.post('/movies', moviesRoutes.create_movie);
router.put('/movies/:movie_id', moviesRoutes.update_movie);
router.delete('/movies/:movie_id', moviesRoutes.delete_movie);

//actors routes
router.post('/actors/:movie_id', moviesRoutes.AddActorToMovie);
router.delete('/actors/:movie_id/:actor_name', moviesRoutes.delete_actor);

module.exports = router;