const fs = require("fs"), path = require('path'),cors = require('cors');
const express = require("express");
const routes = require("./server/routes/routes.js");
const app = express();
const port =3001;

//route for client
app.use('/list',express.static(path.join(__dirname,'client/html/list.html')));
app.use('/js',express.static(path.join(__dirname,'client/js')));
app.use('/addActor/:movieID',express.static(path.join(__dirname,'client/html/addNewActor.html')));
app.use('/addMovie',express.static(path.join(__dirname,'client/html/addNewMovie.html')));
app.use('/actorList/:movieId',express.static(path.join(__dirname,'client/html/actorList.html')));
app.use('/updateMovie/:movieID',express.static(path.join(__dirname,'client/html/updateMovie.html')));



app.use(express.json());
app.use(express.urlencoded({extended:true}));

//route the requset into "router"
app.use("/",routes);

const server = app.listen(port,()=>{console.log("listening on port %s...",server.address().port);});