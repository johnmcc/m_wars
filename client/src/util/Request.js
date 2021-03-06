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
