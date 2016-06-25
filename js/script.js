
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
    var streetViewLocator = 'https://maps.googleapis.com/maps/api/streetview?size=1920x1080&location='+
    address + '';

    $body.append('<img class="bgimg" src=" '+ streetViewLocator + '">');

// NY times article custom URL
var newyorktimesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityLoc +' &sort=newest&api-key=dce09e3080214712a8fed3a5360c148b';

/**
 * [getJSON // This function takes a New York times url and return
 *  articles for a given city these are return with a link to
 *  the article.
 * @param  {[type]} newyorktimesURL [custom url]
 * @param  {[type]} function(       data
 * @return {[type]}                 article that match the criteria for the city and street
 */
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
    }

}).fail(function(){
    $("#nytimes-header").text('No New York Times Articles for ' + cityLoc +" "+ streetLoc);
});

//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
// wikipedia custom URL
var wikipediaUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityLoc+'&format=json&callback=wikiCallback';

  console.log("here 1");
$.ajax({
  url: wikipediaUrl,
  jsonp: "callback",
  datatype: "jsonp",
  crossDomain:false,
  success: function(response){
    console.log("here 3");
    var wikiArtiles = response[1];

    for(var i=0; i < wikiArtiles.length; i++){
          articleList = wikiArtiles[i];
      var url = 'http://en.wikipedia.org/wiki/'+ articleList;
      $("#wikipedia-links").append('<li><a href"' + url + '">'+articleList + '</a></li>');
    }
  }

});


    return false;
};

$('#form-container').submit(loadData);
