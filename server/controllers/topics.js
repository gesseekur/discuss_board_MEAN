var mongoose= require('mongoose');
var Topic = mongoose.model('Topics');
var Post = mongoose.model('Posts');
var Comment = mongoose.model('Comments');


module.exports = (function(){
	return {
		create:function(req,res){
			var newTopic= new Topic(req.body)
			newTopic.save(function(err){
				if(err){
					res.json({err:err})
				}
				else {
					res.json(true);
				}
			})
		},

		index: function(req,res){
			Topic.find({}).populate('user_id post').exec(function(err,topics){
				console.log(topics);
				res.json(topics);
			})
		},

		show: function(req,res){
			Topic.findOne({_id:req.params.id}, function(err,data){
				if(err){
					res.json(err);
				}
				else{
					res.json(data)
				}
			})
		},

		readPosts: function(req,res){
			Post.find({topic_id: req.params.id}).populate('comment').exec(function(err,data){
				if(err){
					res.json(err);
				}
				else {
					res.json(data);
				}
			})
		},

		createPost:function(req,res){
			var post = new Post(req.body);
			post.save(function(err,data){
				if(err){
					res.json(err);
				}
				else {
					res.json(data);
				}
			})
		},

		updatePostLikes: function(req,res){
			Post.findByIdAndUpdate(req.params.id, 					{$inc:{like:+1}}, function(err,data){
					if(err){
						res.json(err)
					}
					else {
						res.json(data)
					}
				}
			)
		},

		createComment: function(req,res){
			var comment = new Comment(req.body)
			comment.save(function(err,data){
				if(err){
					res.json(err);
				}
				else {
					res.json(data);
				}
			})
		},

		updatePostDislikes: function(req,res){
			Post.findByIdAndUpdate(req.params.id, 					{$inc:{dislike:+1}}, function(err,data){
					if(err){
						res.json(err)
					}
					else {
						res.json(data)
					}
				}
			)
		},

		updatePostComments: function(req,res){
			Post.findByIdAndUpdate(req.params.id,
				{$push:{comments:req.body.comments}},
				{new:true},
				function(err,data){
					if(err){
						res.json(err);
					}
					else {
						Post.find({topic_id: data.topic_id }, function(err, data) {
							if(err)
								console.log("post 36", err)
							else
								res.json(data);
						})
					}
				})
		},

		updateTopic:function(req,res){
			Topic.findByIdAndUpdate(req.params.id,
				{$push: {posts:req.body.posts}},
				{new:true},
				function(err,data){
					if(err){
						res.json(err)
					}
					else {
						res.json(data)
					}
				})
		
			}
	}
})();
