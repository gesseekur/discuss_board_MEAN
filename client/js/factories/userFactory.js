app.factory("userFactory", function($http){
	var user ={};
	user.name = "";
	return {
		getName:function(callback){
			callback(user);
		},


		readUser:function(id,callback){
			$http.get('/user/'+id).then(callback);
		},


		setName:function(input,callback){
			$http.post("/users",input).then(function(response){
				if(response.data.err){
					callback(response.data.err)
				}
				else {
					user = response.data.user;
					callback(null);
				}
			});
		},

		updateUserComments:function(data, user, callback){
			// console.log('usercomment', data)
			var comments = [];
			if(data.user_id == user._id){
				comments.push(data);
			}
			$http.patch('/user/comments/'+user._id,{comments:comments}).then(callback);
		},
		updateUserPosts:function(data, user, callback){
			var posts = [];
			console.log("updateUser",data)
			if(data.user_id == user._id){
				posts.push(data);
			}
			$http.patch('/user/posts/'+user._id,{posts:posts}).then(callback);
		},

		updateUserTopics: function(data, user,callback){
			var topics =[];
			// console.log(data.config.data.user_id);
			// console.log(data.config.data);
			// angular.forEach(data,function(topic){
				// console.log(topic);
				if(data.config.data.user_id == user._id){
					topics.push(data.config.data);
				}
			// })
			$http.post('/user/topics/'+user._id, {topics:topics}).then(function(response){})
		}
	}
})