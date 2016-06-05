
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var streetLoc = $("#street").val();
    var cityLoc = $("#city").val();
    var address = streetLoc + ' ,' + cityLoc;

    $greeting.text('So you want to move and live at ' + address + '?');
    var streetViewLocator = 'https://maps.googleapis.com/maps/api/streetview?size=1280x720&location='+
    address + '';

    $body.append('<img class="bgimg" src=" '+ streetViewLocator + '">');

// NY times article
var newyorktimesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityLoc +' &sort=newest&api-key=dce09e3080214712a8fed3a5360c148b';

// This function takes a newyour times url and return articles for a given city
$.getJSON(newyorktimesURL, function( data ) {


  $("#nytimes-header").text('New York Times Articles for ' + cityLoc);

  var articles = data.response.docs;

 //Loop throught articles return from NY times API
  for(var i =0; i < articles.length; i++){

    var article = articles[i];

    $("#nytimes-articles").append('<li class="article">'
        + '<a href="'+article.web_url+'">'+
        article.headline.main +
        '</a>' + article.snippet + '</li>');
  }).error(function (e)){
    $("#nytimes-header").text('New York Times Articles for ' + cityLoc + could not be loaded);

  }
});


    return false;
};

$('#form-container').submit(loadData);
