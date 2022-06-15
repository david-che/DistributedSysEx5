const fs = require('fs');

// variables
const dataPath = './server/data/movies.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (!data) data="{}";
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                console.log(err);
            }

            callback();
        });
    };



const noExtraFields=(req_body)=>{
    let temp={"id?":"1","name":"2","picture":"3","director":"4","date":"5"
    ,"rating":"6","isSeries":"7","series_details":"8","actors":"9"}
    return Object.keys(req_body).every(item=>temp[item]!=undefined);    
}


const correctReqFields=(movie)=>{
    temp=["id?","name","picture","director","date","rating","isSeries","series_details","actors"]
    return temp.every(item=>movie[item]!=undefined)
}

const allActorFieldsExist=(req_body)=>{
    let temp=["name?","picture","site"];
    return temp.every(item=>req_body[item]!=undefined);
}

const noActorExtraFields= (req_body)=>{
    let temp=["name?","picture","site"];
    Object.keys(req_body).every(item=>temp.indexOf[item]!=-1)
}

module.exports = {
 

    //READ
    getMovie: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            data=JSON.parse(data);
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            /*else{
                if(!data)
                    data="{}";
                data=JSON.parse(data);
                if(!data[req.params["movie_id"]])
                    data=JSON.parse("{}");
                else
                    data=data.[req.params["movie_id"]];
            }*/
            else
                res.send(!data||!data[req.params["movie_id"]]? JSON.parse("{}") : data[req.params["movie_id"]]);
        });
    },
  
    getMovies: function (req, res){
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else
                res.send(!data? JSON.parse("{}") : JSON.parse(data));
        });
    },
    // CREATE
   create_movie: function (req, res) {
        readFile(data => {            
            //save the movie id
            let movie_id=Object.keys(req.body);
            if(movie_id.length==0) return res.sendStatus(500);
            movie_id=movie_id[0];
            //chack if the movie id already exist in the "data"
            if(data[movie_id]!=undefined) return res.sendStatus(500);//.send("movie already exist");
            //check for missing requst field
            if (!correctReqFields(req.body[movie_id])) return res.sendStatus(500);//.send("missing field"); 
            
            //check for extra requst field
            if (!noExtraFields(req.body[movie_id])) return res.sendStatus(500);//.send("extra field"); 
            // add the new movie
            data[movie_id] = req.body[movie_id];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new movie added');
            });
        },
            true);
    },

    // UPDATE
    update_movie: function (req, res) {

        readFile(data => {

            let movie_id=req.params["movie_id"];
            // check if the movie in the data
            if (!data[movie_id]){
                res.send("movie_id= "+movie_id+", is not exist.")
                return res.sendStatus(500);//.send("movie_id= "+movie_id+", is not exist.");
            }
               
            //check for extra field and if try to update id and actor in the request
            if ( !noExtraFields(req.body)||!(!req.body["id?"]&&!req.body["actors"])){
                res.send("there is invalid field.");
                return res.sendStatus(500);//.send("there is invalid field."); 
            }
                
            //update the data axcept the id and actors
            Object.keys(req.body).forEach(item=>{data[req.params["movie_id"]][item]=req.body[item];});          

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`movie id:${movie_id} updated`);
            });
        },
            true);
    },
    
    // DELETE
    delete_movie: function (req, res) {

        readFile(data => {

            
            const movie_id = req.params["movie_id"];
            
            if(!data[req.params["movie_id"]])
               return res.status(500).send("movie dos'nt exist");
            delete data[movie_id];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send("movie id:"+movie_id+" removed");
            });
        },
            true);
    },

    // CREATE ACTOR
    AddActorToMovie : function (req, res) {
        readFile(data => {
            //save the movie id
            let movie_id=req.params["movie_id"];
            //chack if the movie id not exist in the "data"
            if(data[movie_id]==undefined) return res.sendStatus(500);
            //check the requst field
            if (!allActorFieldsExist(req.body)&&!noActorExtraFields(req.body)) return res.sendStatus(500);  
            //chack if the actor name not already exist in the movie
            if(data[movie_id]["actors"][req.body["name?"]]!=undefined) return res.sendStatus(500);
            // add the new actor
            data[movie_id]["actors"][req.body["name?"]] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new actor added');
            });
        },
            true);

    },
    // DELETE ACTOR
    delete_actor: function (req, res) {

        readFile(data => {
            const movie_id = req.params["movie_id"], actor_name=req.params["actor_name"];
            if(!actor_name)
                return res.status(500).send("there is no actor name in the body of the request");          
            if(!data[req.params["movie_id"]])
                return res.status(500).send("movie dos'nt exist");
            delete data[movie_id]["actors"][actor_name];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send("actor name:"+actor_name+" removed");
            });
        },
            true);
    }

    
};
