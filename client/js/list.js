let sortByDate=function(date_1,date_2){

    date_1=date_1.split('-');
    date_2=date_2.split('-');

    //compare year
    date_1[2]=parseInt(date_1[2]);
    date_2[2]=parseInt(date_2[2]);
    if( date_1[2]>date_2[2]){
        return 1;
    }else if(date_2[2]> date_1[2]){
        return -1;
    }

    //compare mounth
    date_1[1]=parseInt(date_1[1]);
    date_2[1]=parseInt(date_2[1]);
    if( date_1[1]>date_2[1]){
        return 1;
    }else if(date_2[1]> date_1[1]){
        return -1;
    }

    //compare day
    date_1[0]=parseInt(date_1[0]);
    date_2[0]=parseInt(date_2[0]);
    if( date_1[0]>date_2[0]){
        return 1;
    }else if(date_2[0]> date_1[0]){
        return -1;
    }
    return 0;
}


$(document).ready(function () {
        $(".addMoviebtn").on("click",function(){
            location.href = "/addMovie";
        });
        let movieObj={};
        $.ajax({
            url:"http://localhost:3001/movies",
            success:function(result){
                //save the data in the local storage
                localStorage.setItem("movieList",JSON.stringify(result));
                //add the data to the page
                reSort();
            },
            error:function(err){
                console.log("err ",err);
            }
        });

        //sort the list
        let reSort = function(){
            let data = JSON.parse(localStorage.getItem("movieList"));
            let keys = Object.keys(data);
            let sortBy = $("#sortBy").val();

            //sort by
            if(sortBy=="date")
                keys.sort((key1 , key2) => {return sortByDate(data[key1]["date"],data[key2]["date"]);});
            else if(sortBy=="name")
                keys.sort();
            else
                keys.sort((key1 , key2) => {return data[key1]["rating"]-data[key2]["rating"]});

            //sort order
            if( $("#sortOrder").val()=="descending")
                keys.reverse();
        
            //delete previos dom
            $("li").remove();

            keys.forEach((key,index)=>{
                let movieDet=$('<li class="list-group-item"></li>').attr("id",data[key]["id?"]).append($("<h3></h3>").html("movie id - "+data[key]["id?"]));
                    movieDet.append($('<h3 ></h3>').html("movie name: "+data[key]["name"]));
                    movieDet.append($('<h3></h3>').html("rating: "+data[key]["rating"]));
                    movieDet.append($('<h3></h3>').html("release date: "+data[key]["date"]));
                    movieDet.append($('<img style=" max-width:450px; max-height: 450px;" class="img-responsive"/>').attr('src',data[key]["picture"]));
                   

                    //add actor button
                    movieDet.append(($('<button  type="button" class="btn btn-dark">add actor</button>')).click(function(){
                        location.href = "/addActor/"+$(this).parent().attr("id");
                    }));
                    //watch actor list button
                    movieDet.append(($('<button type="button" class="btn btn-primary">Watch actor list</button>')).click(function(){
                        location.href = "/actorList/"+$(this).parent().attr("id");
                    }));

                    //update movie button
                    movieDet.append(($('<button  type="button" class="btn btn-dark">update movie</button>')).click(function(){
                        location.href = "/updateMovie/"+$(this).parent().attr("id");
                    }));

                    //delete movie button
                    movieDet.append(($('<button type="button" class="btn btn-danger">delete movie</button>')).click(function(){
                        let thisElement=$(this);
                        $.ajax({
                            url:"/movies/"+thisElement.parent().attr("id"),
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

                    movieObj[key]=movieDet;
                    $("#movie_list").append(movieDet);

            });     
                
        }
        $("#sortBy").on("change",reSort);
        $("#sortOrder").on("change",reSort);
});