var PubSub = require("../util/PubSub");

var QuoteList = function(){
	this.element = document.getElementById("quotes");
	this.attachListeners();
};

QuoteList.prototype = {
	attachListeners: function(){
		PubSub.subscribe("/quotes/all", function(quotes){
			this.populateQuotes(quotes);
		}.bind(this));
	},
	populateQuotes: function(quotes){
		while (this.element.firstChild) {
	    this.element.removeChild(this.element.firstChild);
		}
		for(var quote of quotes.detail){
			var li = document.createElement("li");
			li.innerText = `${quote.name}: ${quote.quote}`;
			this.element.appendChild(li);
		}
	}
};

module.exports = QuoteList;
