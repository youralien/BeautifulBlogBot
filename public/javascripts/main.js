// // scope all jquery objects
// // ...kitchen page
// var $kitchen; // all forms

// // ...ingredients page
// var $inStock; // in stock forms
// var $outOfStock; // out of stock forms
// var $editIngr; // edit buttons
// var $addIngr; // add ingredient form

// // ...order page
// var $order; // form
// var $orderOpt; // ingredient checkboxes

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
  // $kitchen.submit(HANDLERS.makeSubmitHandler('fulfilled', CALLBACKS.success.orderFulfilled));
  // $inStock.submit(HANDLERS.makeSubmitHandler('markOutOfStock', CALLBACKS.success.toggleIngredient));
  // $outOfStock.submit(HANDLERS.makeSubmitHandler('markInStock', CALLBACKS.success.toggleIngredient));
  // $addIngr.submit(HANDLERS.makeSubmitHandler('addIngredient', CALLBACKS.success.newIngredient, true));
  // $editIngr.click(HANDLERS.click.edit);
  // $orderOpt.click(HANDLERS.click.orderOpt);
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
    var farmId = photo.farm;
    var serverId = photo.server;
    var id = photo.id;
    var oSecret = photo.secret;
    $photos.append(
      "<li><img src='" + 
      "https://farm{}.staticflickr.com/{}/{}_{}.jpg".format(farmId, serverId, id, oSecret) + 
      "'></li>");
  });
}