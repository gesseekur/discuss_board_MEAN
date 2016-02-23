app.controller("mainController", function($location, $scope, userFactory,topicFactory){
	$scope.currentUser={};

	userFactory.getName(function(data){
		if(!data.name){
			$location.url('/');
		}
		else{
			$scope.currentUser = data; 
		}
	})

	$scope.createTopic = function(newTopic, user){
		newTopic.name = user.name;
		newTopic.user_id = user;
		newTopic.posts = 0;
		topicFactory.createTopic(newTopic, function(data, info){
			userFactory.updateUserTopics(data,user, function(info){});
			$scope.topics = data.data
			$scope.newTopic={};
			getTopics();
		})
	}


	function getTopics(){
		topicFactory.listAll(function(response){
			// console.log("getTopics", response);
			$scope.topics =response.data;
			})
		}
	getTopics();



})