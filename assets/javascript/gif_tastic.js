$(document).ready(function() {

 var topics = ['soccer','Messi','Ronaldo','Drogba','Wenger','Sir Alex','Guardiola'];

 loadButtons();

 function loadButtons(){

 $("#button_area").empty();

  topics.forEach(function(t){
   var button = $("<button>");

   button.addClass("topic_button");
   button.attr("data",t);
   button.text(t);

   $("#button_area").append(button);
  });
 }

 $(document).on ("click", ".topic_button", function(){

 	var keyWord = $(this).attr("data").replace(' ','+');
 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyWord + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {

    console.log(response);

    $("#display_area").empty();

    response.data.forEach(function(g){
     var imageUrl = g.images.original_still.url;

     var gifImage = $("<img>");
     var imageDiv = $("<div>");
     var rating = $("<p>");

     rating.html("Rating: " + g.rating);

     gifImage.addClass("gif_image");
     gifImage.attr("src", imageUrl);
     gifImage.attr("alt", keyWord);
     gifImage.attr("state","still");
     gifImage.attr("other_state_url",g.images.original.url)

     imageDiv.addClass("col-lg-4 col-md-4 col-sm-4 col-xs-4");
     imageDiv.html(rating);
     imageDiv.append(gifImage);
     $("#display_area").prepend(imageDiv);
    });

    });
 });

 $(document).on ("click", "#add_button", function(event){
 	event.preventDefault();
 	topics.push($("#button_input").val());
 	$("#button_input").val('');
 	loadButtons();
 });

  $(document).on ("click", ".gif_image", function(event){
 	if($(this).attr("state") === "still"){
 	 var currentSrc = $(this).attr("src");
 	 $(this).attr("src", $(this).attr("other_state_url"));
 	 $(this).attr("state","animate");
     $(this).attr("other_state_url",currentSrc);
 	}else{
 	 var currentSrc = $(this).attr("src");
 	 $(this).attr("src", $(this).attr("other_state_url"));
 	 $(this).attr("state","still");
     $(this).attr("other_state_url",currentSrc);
 	}
 });

});