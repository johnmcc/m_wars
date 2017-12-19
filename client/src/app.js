var Quote = require("./models/Quote");
var QuoteList = require("./views/QuoteList");
var DeleteFormView = require("./views/DeleteFormView");
var SubmitFormView = require("./views/SubmitFormView");

window.addEventListener("load", function(){
	new SubmitFormView();
	new DeleteFormView();
	new QuoteList();

	var quote = new Quote();
	quote.all();
});
