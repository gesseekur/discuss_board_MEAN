module.exports = function(app) {
	var users = require('./../controllers/users.js')
	var topics = require('./../controllers/topics.js')
	app.post('/users', function(req,res){
		users.create(req,res);
	});	
	
	app.post('/topics', function(req,res){
		topics.create(req,res);
	})

	app.post('/user/topics/:id', function(req,res){
		users.updateTopic(req,res);
	})

	app.get('/topics', function(req,res){
		topics.index(req,res);
	});

	app.get('/topics/:id', function(req,res){
		topics.show(req,res);
	})

	app.get('/user/:id', function(req,res){
		users.show(req,res);
	})

	app.get('/posts/:id', function(req,res){
		topics.readPosts(req,res);
	})

	app.post('/posts', function(req,res){
		topics.createPost(req,res);
	})

	app.patch('/posts/likes/:id', function(req,res){
		topics.updatePostLikes(req,res);
	})

	app.patch('/posts/dislikes/:id', function(req,res){
		topics.updatePostDislikes(req,res);
	})

	app.patch('/topics/:id', function(req,res){
		topics.updateTopic(req,res);
	})

	app.patch('/posts/comments/:id', function(req,res){
		topics.updatePostComments(req,res);
	})

	app.post('/comments', function(req,res){
		topics.createComment(req,res);
	})

	app.patch('/user/comments/:id', function(req,res){
		users.updateComments(req,res);
		// console.log(req.params.id)
	})
	app.patch('/user/posts/:id', function(req,res){
		users.updatePosts(req,res);
		// console.log(req.params.id)
	})
};