const CelebM = require("../models/Celebrity.model");
const MovieM = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here
router.get('/movies/create', (req, res, next) => {
    CelebM.find()
        .then(celebArr => {
            console.log(celebArr)
            res.render('../views/movies/new-movie.hbs', {celebs: celebArr})})
        .catch(err => console.log(err))
})
router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;

    MovieM.create({title, genre, plot, cast})
        .then(createdMovie => {
            console.log(`Movie ${createdMovie.title} created`)
            res.redirect('/movies')
        })
        .catch(err => console.log(err));
})

router.get('/movies', (req, res, next) => {
    MovieM.find()
        .then(movieArr => {
            res.render('../views/movies/movies.hbs', {movies: movieArr})
        })
        .catch(err => console.log(err));
})

router.get('/movies/:id', (req, res, next) => {
    const movieID = req.params.id;

    MovieM.findById(movieID)
        .populate('cast')
        .then(movieItem => {
            console.log(movieItem);
            res.render('../views/movies/movie-details.hbs', {movie: movieItem})
        })
})

router.post('/movies/:id/delete', (req, res, next) => {
    const movieID = req.params.id;

    MovieM.findByIdAndRemove(movieID)
        .then(res.redirect('/movies'))
        .catch(err => console.log(err));
})

router.get('/movies/:id/edit', (req, res, next) => {
    const movieID = req.params.id;

    MovieM.findById(movieID)
        .then(movieItem => {
            CelebM.find()
            .then(celebArr => {
                console.log(celebArr)
                res.render('../views/movies/edit-movie.hbs', {movie: movieItem, celebs: celebArr})})
            .catch(err => console.log(err))
        })
})
router.post('/movies/:id/edit', (req, res, next) => {
    const movieID = req.params.id;
    const {title, genre, plot, cast} = req.body;

    MovieM.findByIdAndUpdate(movieID, {title, genre, plot, cast})
        .then(updatedMovie => {
            console.log(`Movie ${updatedMovie.title} updated`)
            res.redirect('/movies')
        })
        .catch(err => console.log(err));
})
module.exports = router;