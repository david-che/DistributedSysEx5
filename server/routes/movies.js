const express = require('express')
const Movie = require('../models/movies')
const router = new express.Router()



//movies routes
router.get('/movies/:movie_id', (req, res) =>{

});
router.get('/movies', (req, res) => {
    User.find().then(users =>
        res.send(users)
    ).catch(e => res.status(500).send())
});
router.post('/movies', (req, res) => {
    const movie = new Movie(req.body)
    movie.save().then(movie => {
        console.log("in then - save");
        res.status(201).send(movie)
    }).catch(e => {
        res.status(400).send(e)
    });
  
});
router.put('/movies/:movie_id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(user => {
        if (!user) {
            return res.status(404).send()
        }
        else {
            console.log(user)
            res.send(user)
        }
    }).catch(e => res.status(400).send(e))
});
router.delete('/movies/:movie_id',(req, res) =>{
    
});

module.exports = router