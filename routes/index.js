var mongoose = require('mongoose');
var _ = require('underscore');
var path = require("path");
var indico = require('indico.io');
indico.apiKey = process.env.INDICO_API_KEY;
var Flickr = require('flickrapi');
var flickrOptions = require(path.join('..', '/flickrOptions.js'));

/* DEFINE ROUTE CALLBACKS */
var routes = {};

routes.home = function(req, res) {
	res.render('home');
};

routes.beautiful = function(req, res) {
	res.render('beautiful', {"pageContent": "Yea Let's Do This"});
};

routes.analyzeText = function(req, res) {
	var textContent = req.body.textContent;
	var paragraphs = splitByParagraphs(textContent); 

	// batch request
	indico.batchTextTags(paragraphs)
	  .then(function(batchTagProbas) {
	  	var batchTopTopics = [];
	    batchTagProbas.forEach(function(tagProbas) {
		    var sortedTextTags = sortObject(tagProbas);
		    var topTopics = getTopTopics(sortedTextTags, 1);
	    	batchTopTopics.push(topTopics);
    	})
    	redundantDocumentTopTopics = getAllTopicOccurances(batchTopTopics);
	    documentTopTopics = _.uniq(redundantDocumentTopTopics);
	    res.status(200).json({"topTopics": documentTopTopics});	    	
	  }).catch(function(err) {
	    console.warn(err);
	    return;
	  });
}

routes.searchFlickr = function(req, res) {
	Flickr.authenticate(flickrOptions, function(error, flickr) {
	  flickr.photos.search({
	      tags: req.query.topTopics
	    , sort: "relevance" // relevance, interestingness-desc
	    , content_type: 1 // photos
	    , safe_search: 1
	    /* extras
	     - url_l, url_c, url_m, url_n == large, kinda-large, medium, small
	     - url_o == original big image
	     */
	    , extras: ["description","owner_name","url_l","url_c","url_m","url_n"]
	    , per_page: 200
	    // https://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html
	    // , license: "1,2,3,4,5,6,7,8", // everything but all-rights-reserved
	  }, function(err, searchResult) {
	    if(err) { throw new Error(err); }
	    res.status(200).json(searchResult);
	  });
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

function getTopTopics(sortedTextTags, numTop) {
  /*
  	function: getTopTopics
		
		Arguments
		---------
		sortedTextTags: array-like, shape (num_keys, 2)
			the sorted object; indicies 0 and 1 map to the topic and probability respectively

		numTop: Number, optional, default 3
			the number of top topics to return

		Returns
		-------
		topTopics: array
			array of the top topics
   */
  if (typeof numTop === 'undefined'){
  	numTop = 3
  }
  if (typeof numTop !== 'number') {
  	console.warn("numTop argument supplied was not a number. Using default")
  	numTop = 3
  }
  if (!Array.isArray(sortedTextTags)) {
  	console.warn("sortedTextTags should be an array of sortedTextTags")
  	return
  }
  if (numTop > sortedTextTags.length) {
  	console.warn("numTop is greater in length than sortedTextTags. Using all tags")
  }
  topTopics = sortedTextTags.slice(0, numTop).map(function(element) {return element[0]})
  return topTopics;
}

function generateSearchText(topTopics) {
	var searchText = topTopics.join(' ');
	return searchText; 
}

function splitByParagraphs(textContent) {
	return textContent.split(new RegExp('\r?\n?\\r?\\n','g'));
}

function getAllTopicOccurances(batchTopTopics) {
	/*
	Arguments
	---------
	batchTopTopics: array like, shape (n_paragraphs, n_topics_per_paragraph)
	
	Returns
	-------
	allTopicOccurances: array
	 */
	return batchTopTopics.reduce(function(a, b) { return a.concat(b) })
}
