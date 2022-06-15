$(document).ready(function () {
    $("#isSeries").on("change",function() {
        if(this.value =='series'){
            $("#isSeries-group").after('<div id="number-of-seson-group" class="form-group">'+
                    '<label for="number-of-seson">number of seson</label>'+
                    '<input type="number" min="0" class="form-control" name="profession" id="enter-number-of-seson"'+
                        'placeholder="write number of seson here">'+
                '</div>');
                $("#enter-number-of-seson").on("change",function() {
                    if($("#episode-detail").length!==this.value){
                        $("#episode-detail").remove();
                        $("#enter-number-of-seson").after('<div id="episode-detail"></div>')
                        for(i=1;i<=this.value;i++){
                            $("#episode-detail").append($('<div class="form-group">'+
                            '<label class="control-label col-xs-3">saeson '+i+'</label>'+
                        '</div>').append($(
                            '<div class="controls col-xs-9">'+
                                '&nbsp;<span class="glyphicon " data-toggle="popover" data-placement="right"></span>'+
                            '</div>').append($('<input type="number" min="0"  placeholder="Enter number of episode">').attr("id","saeson-"+String(i)))));                        
                        }
                    }
                    
                })
        }else{
            $('#number-of-seson-group').remove();
        }
    });



    // process the form
    $('#user_form').submit(function (event) {
        if(!$("#user_form").valid()) return;
        let data={};
        if($("#moviename").val()!="")
            data["name"]=$("#moviename").val();
        if($("#picture").val()!="")
            data["picture"]=$("#picture").val();
        if($("#director").val()!="")
            data["director"]=$("#director").val();
        if($("#date").val()!="")
            data["date"]=$("#date").val().split( '-' ).reverse( ).join( '-' );
        if($("#movieRating").val()!="")
            data["rating"]=$("#movieRating").val();


        if($("#isSeries").val()=="series"){
            data.isSeries= true;
           let episode=[];
           for(i=0;i< $("#enter-number-of-seson").val();i++){
            episode[i]=$('#saeson-'+String(i+1)).val();
         } 
           data.series_details=episode;
        }else if($("#isSeries").val()=="movie"){
            data.isSeries= false;
            data.series_details="";
        }
    
        // let temp={};
        // temp[data["id?"]]=data;
        // data=temp;

        let movieId=window.location.href.split("/");
        movieId=movieId[movieId.length-1];
        // process the form
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: '/movies/'+movieId, // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify( data ),
            processData: false,            
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data, textStatus, jQxhr ){
                location.href = "/list";

            },
            error: function( jqXhr, textStatus, errorThrown ){
                alert("error");
                console.log( errorThrown );
                location.href = "/list";
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });



});