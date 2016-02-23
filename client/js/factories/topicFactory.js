app.factory('topicFactory', function($http){
	return {
		createTopic: function(newTopic, callback){
			$http.post('/topics', newTopic).then(function(data){
				callback(data);
			})
		},

		listAll: function(callback){
			$http.get('/topics').then(callback);
		},

		readTopic:function(id,callback){
			$http.get('/topics/'+id).then(callback);
		},

		readPosts:function(id, callback){
			$http.get('/posts/'+id).then(callback);
		},

		createPost: function(newPost, callback){
			$http.post('/posts', newPost).then(function(response){
				callback(response);
			})
		},

		

		postLikes: function(post_id, callback){
			$http.patch('/posts/likes/'+post_id).then(callback);
		},

		postDislikes: function(post_id, callback){
			$http.patch('/posts/dislikes/'+post_id).then(callback);
		},

		createComment: function(newComment, currentUser,callback){
			newComment.user_id = currentUser._id;
			$http.post('/comments', newComment).then(function(response){
				console.log(response.data.user_id);
				// var allComments =[];
				var comments =[];
					if(response.data.user_id == currentUser._id){
						comments.push(response.data);
					}
				$http.patch	('/posts/comments/'+newComment.post_id,{comments: comments}).then(callback)
				
			})
				
		},

		updateTopic:function(numOfPosts, id , callback){
			$http.patch('/topics/'+id, {posts: numOfPosts}).then(function(data){
				callback(data);
			})
		}

	}
})