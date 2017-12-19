var Request = {
	get: function(url, onComplete){
		fetch(url)
	    .then(request => request.json())
	    .then(onComplete)
	    .catch(console.error);
	},
	post: function(){
		
	}
};

export default Request;
