app.controller('loginController', function(userFactory,$location){
	userFactory.getName(function(data){
		if(data.name){
			$location.url('main');
		}
	})

	var self = this;

	this.requestName = function(input) {
		this.error = {};
		console.log("requestName",input)
		userFactory.setName(input,function(err){
			if(err){
				console.log("usersCtrl requestName", err); 
				self.error = err;
			}
			else{
				userFactory.getName(function(data){
					console.log("usersCtrl requestName",data);
					$location.url('main');
				})
			}
		})
		this.input = {}; 
	}
})