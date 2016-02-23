app.controller("userController", function($scope, userFactory, topicFactory, $routeParams, $location){
	var id = $routeParams.id

	function readUser(){
		userFactory.readUser(id, function(response){
			console.log(response);
			$scope.user =response.data;
			})
		}

	readUser();

})