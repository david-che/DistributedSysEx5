
    $(document).ready(function(){
        //return to movie list button
        $("#toMovieList").click(function(){
            location.href = "/list";
        });

        //get the movie id from the url
        let movieId=window.location.href.split("/");
        movieId=movieId[movieId.length-1];
        let data={};
        $.ajax({
            url:"http://localhost:3001/movies/"+movieId,
            success:function(result){
                result=result.actors;
                //save the data in the local storage
                let keys=Object.keys(result);

                if(keys.length>0)
                keys.forEach((key,index)=>{
                    let actorDet=$('<li class="list-group-item">').attr("id",result[key]["name?"]).append($("<h3></h3>").html("actor name - "+result[key]["name?"]));
                        actorDet.append($('<img style=" max-width:450px; max-height: 450px;" class="img-responsive"/>').attr('src',result[key]["picture"]));
                        actorDet.append($('<h3><a>Link to actor website</a></h3>').attr( "href" , result[key]["site"] ));
                        //delete actor button
                        actorDet.append(($('<button type="button" class="btn btn-danger">delete actor</button>')).click(function(){
                            let thisElement=$(this);
                            $.ajax({
                                url:"/actors/"+movieId+"/"+thisElement.parent().attr("id"),
                                type:"DELETE",
                                success: function (result) {
                                    $(thisElement).parent().remove();
                                },
                                error: function (err) {
                                    console.log("err", err);
                                    alert("something go wrong.. please try again later")
                                  }
                              });
                        }));
                        

                        $("#actor_list").append(actorDet);
    
                }); 
                else{
                    alert("There is no information about the actors in this movie");
                    location.href = "/list";
                }
                
            },
            error:function(err){
                console.log("err ",err);
                alert("error");
                location.href = "/list";
            }
        });
    });
