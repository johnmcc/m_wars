/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var PubSub = {
	publish: function(channel, payload){
		// we need to check for the existence of the CustomEvent object,
    // otherwise our tests will fail
		if(typeof CustomEvent !== 'undefined' && typeof document !== undefined){
			var event = new CustomEvent(channel, {
				detail: payload
			});
			document.dispatchEvent(event);
		}
	},

	subscribe: function(channel, callback){
		// Same - we need to check for the existence of document
		if(typeof document !== 'undefined'){
			document.addEventListener(channel, callback);
		}
	}
}

module.exports = PubSub;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Quote = __webpack_require__(2);
var QuoteList = __webpack_require__(4);
var DeleteFormView = __webpack_require__(5);
var SubmitFormView = __webpack_require__(6);

window.addEventListener("load", function(){
	new SubmitFormView();
	new DeleteFormView();
	new QuoteList();

	var quote = new Quote();
	quote.all();
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var PubSub = __webpack_require__(0);
var Request = __webpack_require__(3);

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Request = {
	get: function(url, onComplete){
		fetch(url)
	    .then(request => request.json())
	    .then(onComplete)
	    .catch(console.error);
	},
	post: function(url, payload, onComplete){
		var myConfig = {
			headers: {
      	'Accept': 'application/json',
      	'Content-Type': 'application/json'
    	},
			method: "POST",
			body: JSON.stringify(payload)
		};

		fetch(url, myConfig)
    	.then(request => request.json())
			.then(onComplete)
			.catch(console.error);
	},
	delete: function(url, onComplete){
		var myConfig = {
			method: "DELETE"
		};

		fetch(url, myConfig)
    	.then(request => request.json())
			.then(onComplete)
			.catch(console.error);
	}
};

module.exports = Request;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var PubSub = __webpack_require__(0);

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var PubSub = __webpack_require__(0);

var DeleteFormView = function(){
	this.form = document.getElementById("deleteForm");
	this.attachListeners();
};

DeleteFormView.prototype = {
	attachListeners: function(){
		this.form.addEventListener("submit", function(event){
			event.preventDefault();
			PubSub.publish("/DeleteFormView/DeleteButtonClicked");
		});
	}
};

module.exports = DeleteFormView;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var PubSub = __webpack_require__(0);

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
		this.name.value = "";
		this.quote.value = "";
	}
};

module.exports = SubmitFormView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map