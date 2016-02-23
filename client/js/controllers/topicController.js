app.controller("topicController", function($scope, userFactory, topicFactory, $routeParams, $location){

	// $scope.newComment={};
	$scope.currentUser={};
	var id = $routeParams.id;
	var likes = 0;

	userFactory.getName(function(data){
		if(!data.name){
			$location.url('/');
		}
		else{
			$scope.currentUser = data; 
		}
	})

	function readTopic(){
		topicFactory.readTopic(id, function(response){
			// console.log("listOne", response);
			$scope.topics =response.data;
			readPosts();
			})
		}

	readTopic();

	function readPosts(){
		topicFactory.readPosts(id, function(response){
		$scope.posts = response.data;
		// console.log("readPosts",$scope.posts);
		var numOfPosts = response.length;
		})
	}

	readPosts();

	$scope.postLikes = function(post_id){
		console.log("postLikes",post_id);
		topicFactory.postLikes(post_id, function(response){
			readPosts();
		})
	}

	$scope.postDislikes = function(post_id){
		topicFactory.postDislikes(post_id, function(response){
			readPosts();
		})
	}

	$scope.createComment = function(newComment, post, currentUser){
		newComment.post_id = post._id;
		newComment.name = currentUser.name;
		// newComment.user_id = currentUser._id
		newComment.topic_id = post.topic_id;
		topicFactory.createComment(newComment, currentUser,function(response){
			// console.log("newComment",response.data.comment);
			$scope.posts = response.data;
			userFactory.updateUserComments(newComment, currentUser, function(yep){})
			readPosts();
			readTopic();
			// $scope.posts=response.data
		})
	}


	$scope.createPost = function(newPost, topic_id, currentUser){
		newPost.name = currentUser.name;
		newPost.like =0;
		newPost.dislike = 0;
		newPost.topic_id = topic_id;
		newPost.user_id = currentUser._id;


		topicFactory.createPost(newPost, function(data){
				topicFactory.readPosts(id, function(response){
				$scope.posts = response;
		 		numOfPosts = response.data.length;
		 		topicFactory.updateTopic(numOfPosts, id, function(yep){});
		 		userFactory.updateUserPosts(newPost, currentUser, function(yep){})

		 		$scope.newPost={};
		 		$scope.newComment={};
		 		readTopic();
		 		readPosts();
			})
		})
	}
	
})