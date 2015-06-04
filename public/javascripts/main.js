var $editor;

// run registerSubmitHandlers to initialize
registerSubmitHandlers();

function registerSubmitHandlers () {
  // get new jquery objects and UNBIND ANY EXISTING HANDLERS
  $editor = $('form#editor').unbind();

  // register new handler for each jquery object w/ non-default action
  
  $editor.submit(function(event) {
    event.preventDefault();
    var editor = event.target;

    $.post('/analyzeText', {"textContent": editor.textContent}, function(data) {
      data.topTopics.forEach(function(topic) {

        $.get('/search/flickr', {textTag: topic}, function(searchResult) {
          appendPhotos(searchResult);
        })
      })
    })
  });

  $("#testArticlePopulate").click(function(event) {
    $.ajax(
    {
      url : "samplearticle.txt",
      dataType: "text",
      success : function (data) {
        $("textarea").attr("textContent", data);
      }
    });
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
  data.photos.photo.forEach(function(photo) {
    $photos.append(
      "<li><img src='{}'></li>".format(getFlickrPhotoUrl(photo))
    );
  });
}

function topPhotoUrl(data) {
  var photo = data.photos.photo[0];
  return getFlickrPhotoUrl(photo)
}

function getFlickrPhotoUrl(photo) {
  /*
  getFlickrPhotoUrl

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