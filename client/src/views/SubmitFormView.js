var PubSub = require("../util/PubSub");

var SubmitFormView = function(){
	this.form = document.getElementById("submitForm");
	this.name = document.getElementById("name");
	this.quote = document.getElementById("quote");

	this.attachListeners();
}

SubmitFormView.prototype = {
	attachListeners: function(){
		this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
	},
	handleFormSubmit: function(event){
		event.preventDefault();
		var quoteObj = {
			name: this.name.value,
			quote: this.quote.value
		};
		PubSub.publish("/SubmitFormView/NewQuote", quoteObj);
	}
};

module.exports = SubmitFormView;
