var mongoose = require('mongoose');
var path = require("path");

var shutterstock = require('shutterstock');
 
var api = shutterstock.v2(require("./shutterStockAuth"));

/* DEFINE ROUTE CALLBACKS */
var routes = {};

routes.home = function(req, res) {
	res.render('home', {"message": "Yea Let's Do This"});
};

routes.analyzeText = function(req, res) {
	console.log("text: \n", req.body.textContent);

	// do indico text analysis!
	res.status(200).end();
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