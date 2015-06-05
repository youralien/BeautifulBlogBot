var $editor;

// run registerSubmitHandlers to initialize
registerSubmitHandlers();

function registerSubmitHandlers () {
  // get new jquery objects and UNBIND ANY EXISTING HANDLERS
  $editor = $('form#editor').unbind();

  // register new handler for each jquery object w/ non-default action
  
  $editor.submit(function(event) {
    event.preventDefault();
    $textarea = $("textarea#inputText")
    textContent = $textarea.html();
    if (textContent) {    
      $.post('/analyzeText', {"textContent": textContent}, function(data) {
        topicsPartial = Handlebars.templates["topTopics"]
        
        $(topicsPartial({
          "topTopics": data.topTopics
        })).insertBefore(".photos")
        $.get('/search/flickr', {"topTopics": data.topTopics}, function(searchResult) {
          appendPhotos(searchResult);
        });

      })
    }
  });

  $("#testArticlePopulate0").click(function() {
    testArticlePopulate(0);
  });
  $("#testArticlePopulate1").click(function() {
    testArticlePopulate(1);
  });
  $("#testArticlePopulate2").click(function() {
    testArticlePopulate(2);
  });

}

function testArticlePopulate(n) {
  $.ajax(
  {
    url : "samplearticle{}.txt".format(n),
    dataType: "text",
    success : function (data) {
      var $textarea = $("textarea#inputText")
      $textarea.html(data);
    }
  });
}

// To have similar functionality as Python's String.format function
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

function appendPhotos(data) {
  $photos = $("#photos");
  $photos.empty()
  data.photos.photo.forEach(function(photo) {
    flickrPhotoUrl = photo.url_m;
    ownername = photo.ownername;
    photoPartial = Handlebars.templates["photo"];
    $photos.append(photoPartial({
      "photoUrl": flickrPhotoUrl,
      "ownername": ownername
    }));
  });
}

function topPhotoUrl(data) {
  var photo = data.photos.photo[0];
  return getFlickrPhotoUrl(photo)
}

function getFlickrPhotoUrl(photo) {
  /*
  getFlickrPhotoUrl

  EDIT: using different params for the flickr.photos.search API, we can get
  the url passed to us without having to calculate it ourselves.

  Arguments
  ---------
  photo: a single photo object in the "photo" array of the Flickr Search API JSON response

  Returns
  -------
  photoUrl: the photoUrl that can be linked with <img src={{photoUrl}}> in HTML for example
   */
  var farmId = photo.farm;
  var serverId = photo.server;
  var id = photo.id;
  var oSecret = photo.secret;
  var photoUrl =  "https://farm{}.staticflickr.com/{}/{}_{}.jpg".format(farmId, serverId, id, oSecret)
  return photoUrl;
}