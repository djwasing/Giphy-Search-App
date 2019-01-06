//store some buttons on the page to get the user started
var btnArr = [
    "Lord of the Rings",
    "Star Wars",
    "Spider-Man",
    "The Sandlot",
    "Heavy Weights"
]

//build a func to dynamically create a button for each 
//string in the btnArr on load, and each time
//the user adds a btn

$(document).ready(function() {

    function makeBtn() {

        //loop to create a btn for each string in btnArr
        for (i = 0; i < btnArr.length; i++) {
            var addBtn = $("<button>");
            addBtn.addClass("btn btn-primary movieBtn")
            addBtn.text(btnArr[i]);
            addBtn.attr("movieName", btnArr[i]);

            //update the html with the new btn
            $("#btnArea").append(addBtn);
        }
    }
        //call the makeBtn func
    makeBtn(); 



//need to be able to add a button---
//take the text the user inputs and add it to btnArr
//when the submit btn is clicked
    $("#subBtn").on("click", function(event) {
        event.preventDefault();
        btnArr.push($("#inputMovie").val().trim())
        $("#btnArea").empty();
        makeBtn();
        // reset the inputMovie area to blank
        $("#inputMovie").val("")
    });



//for when one of the movie buttons is clicked:
//on click of button, AJAX req for search of giphy API for the text on that button
    $(document).on("click", ".movieBtn", function() {
        //console.log("hi");
        $("#gifArea").empty();
        var movieName = $(this).attr("movieName");
        var apiKey = "l4rTiwy6XT6KwlkOqVtLThMThBJYqrhU";
        // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + movieName + "&limit=10&rating=g" ;
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${movieName}&limit=10&rating=g` ;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);
      var data = response.data;
      for (i = 0; i < data.length; i++) {
        var newImg = $("<img width= '200px' height= '150px'>");
        //<img src="ffbwwg" alt="bbdbs" class="img-fluid" />
        
        newImg.addClass("img-fluid movieGif").attr("src", data[i].images.fixed_width_still.url)
            .attr("alt", movieName)
            .attr("state", "still")
            .attr("still", data[i].images.fixed_width_still.url)
            .attr("animated", data[i].images.fixed_width.url);
        $("#gifArea").append(newImg);
      }
    });

    })
        //comment in this area
    $(document).on("click", ".movieGif", function() {
        var state = $(this).attr("state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("animated"))
            $(this).attr("state", "animated")
        } 
        else {
            $(this).attr("src", $(this).attr("still"))
            $(this).attr("state", "still")
        }
        
        //if still image, then give it animated attr, if animated, give it the still attr

    })
//set a max size for the gifs if possible?
//show 10 gifs in the gifArea div with RATING: displayed

//in order to get the rating:
//use JSON to go into the object, key(rating) and display it








});


