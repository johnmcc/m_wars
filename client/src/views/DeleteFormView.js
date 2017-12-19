var PubSub = require("../util/PubSub");

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
