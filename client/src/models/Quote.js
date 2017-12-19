var PubSub = require("../util/PubSub");
var Request = require("../util/Request");

var Quote = function(name, quote){
	this.id = null;
	this.name = name;
	this.quote = quote;

	this.attachListeners();
}

Quote.prototype = {
	attachListeners: function(){
		PubSub.subscribe("/DeleteFormView/DeleteButtonClicked", this.deleteAll.bind(this));

		PubSub.subscribe("/SubmitFormView/NewQuote", this.save.bind(this));
	},
	all: function(){
		Request.get("/quotes", this.publishQuotes);
	},
	deleteAll: function(){
		Request.delete("/quotes", this.publishQuotes);
	},
	save: function(quote){
		Request.post("/quotes", quote.detail, this.publishQuotes);
	},
	publishQuotes: function(quotes){
		PubSub.publish("/quotes/all", quotes);
	}
};

module.exports = Quote;
