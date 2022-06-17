const express = require('express')
const Actor = require('../models/actors');
const Movie = require('../models/movies');
const router = new express.Router()


//actors routes
//creat new actor
router.post('/actors', (req, res)=> {
    Actor.findOne({ name: req.body.name }).then(actorExist =>{
        //if actor not exist creat the new actor
        if(!actorExist){
                const actor = new Actor(req.body)
                actor.save().then(actor => {
                res.status(201).send(actor)
            }).catch(e => {
                res.status(400).send(e)
            });
        }else{
            res.status(400).send("actor already exist")
        }
    }).catch(e => {
        res.status(400).send(e)
    });  


});

//add actors to movie
router.post('/actors/:movie_id/:actor_id', (req, res)=> {
    Actor.findOne({ _id: req.body.actor_id }).then(actorExist =>{
        //if actor not exist creat the new actor
        if(actorExist){
            //get the actors array from the db
            Movie.find({_id:req.params.movie_id},'actors').then(actors=>{
                if(actors){
                    //add the requested actor from the actors array
                    let addToMovie=actors[0]["actors"].filter(actor=> actor!=req.params.actor_id);
                    addToMovie.append(req.body.actor_id);
                    //update the db after the actor after adding the actor
                        Movie.findByIdAndUpdate(req.params.movie_id,{actors:updatedActors}).then(
                            res.status(200).send({actors:updatedActors})
                        ).catch(e => {
                            res.status(400).send(e)
                        });                
        }else{
            res.status(400).send("movie is not exist")
        }
    }).catch(e => {
        res.status(400).send(e)
    });  











    const actor = new Actor(req.body)
    actor.save().then(actor => {
        console.log("in then - save");
        res.status(201).send(actor)
    }).catch(e => {
        res.status(400).send(e)
    });


});


router.delete('/actors/:movie_id/:actor_id', (req, res)=>{
    //get the actors array from the db
    Movie.find({_id:req.params.movie_id},'actors').then(actors=>{
        if(actors){
            //remove the requested actor from the actors array
        let updatedActors=actors[0]["actors"].filter(actor=> actor!=req.params.actor_id);
        //update the db after the actor after rmoved
        Movie.findByIdAndUpdate(req.params.movie_id,{actors:updatedActors}).then(
            res.status(200).send({actors:updatedActors})
        ).catch(e => {
            res.status(400).send(e)
        });
        }else{
            res.status(200).send("actor not exist in the movie")
        }
    }).catch(e => {
        res.status(400).send(e)
    });

 
});
module.exports = router
