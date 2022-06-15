$(document).ready(function () {

    // process the form
    $('#user_form').submit(function (event) {
        if(!$("#user_form").valid()) return;
        let data={
            "name?": $("#actor-name").val(),
            "picture": $("#actor-picture").val(),
            "site": $("#actor-site").val()
        }

        //save the data as an object 
        // let temp={};
        // temp[data["name?"]]=data;
        // data=temp;
        //get the movie id from the url
        temp=window.location.href.split("/");
        temp=temp[temp.length-1];
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/actors/'+temp, // the url where we want to POST
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
