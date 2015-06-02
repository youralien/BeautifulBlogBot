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

    $.post('/analyzeText', {"textContent": editor.textContent}, function() {
      alert("Success in Analyzing Text");
    })
  });
  // $kitchen.submit(HANDLERS.makeSubmitHandler('fulfilled', CALLBACKS.success.orderFulfilled));
  // $inStock.submit(HANDLERS.makeSubmitHandler('markOutOfStock', CALLBACKS.success.toggleIngredient));
  // $outOfStock.submit(HANDLERS.makeSubmitHandler('markInStock', CALLBACKS.success.toggleIngredient));
  // $addIngr.submit(HANDLERS.makeSubmitHandler('addIngredient', CALLBACKS.success.newIngredient, true));
  // $editIngr.click(HANDLERS.click.edit);
  // $orderOpt.click(HANDLERS.click.orderOpt);
}