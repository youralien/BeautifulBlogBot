var mongoose = require('mongoose');
var _ = require('underscore');
var path = require("path");
var indico = require('indico.io');
indico.apiKey = process.env.INDICO_API_KEY;
var shutterstock = require('shutterstock');
 
var api = shutterstock.v2(require("./shutterStockAuth"));

/* DEFINE ROUTE CALLBACKS */
var routes = {};

routes.home = function(req, res) {
	res.render('home', {"message": "Yea Let's Do This"});
};

routes.analyzeText = function(req, res) {
	var textContent = req.body.textContent;
	indico.textTags(textContent)
	  .then(function(tagProbas) {
	    var sortedTextTags = sortObject(tagProbas);
	    res.status(200).json({"sortedTextTags": sortedTextTags});
	  }).catch(function(err) {
	    console.warn(err);
	    return;
	  });
}

routes.search = function(req, res) {
	
	var options = {
		query: "climate", 
		per_page: 7
	};

	api.image.search(options, function(err, result) {
	  // results
	  // src can be found at result.data[i].assets.preview.url

	  if (err) throw err;
	  res.json({"previews": result.data.map(previewObject)});
	});
}

module.exports = routes;

// HELPERS

// data: a shutterstock result.data from the shutterstock image/search API
function previewObject(dataPoint) {
	return dataPoint.assets.preview;
}

function sortObject(object, order) {
	/*
		function: sortObject
		
		Sorts an object by its values
		
		Arguments
		---------
		object: Javascript Object, with Key:(Numerical)Value mappings
		order: optional, default -1.  1 == ascending vs -1 == descending order
		
		Returns
		-------
		sorted: array-like, shape (num_keys, 2)
			the sorted object; indicies 0 and 1 map to the key and values respectively
	 */
	if (typeof order === 'undefined') {
    order = -1;
  }
	sortable = _.pairs(object)
	sorted = sortable.sort(function(a, b) { return order*(a[1] - b[1]) });
	return sorted;
}