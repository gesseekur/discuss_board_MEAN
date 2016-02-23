var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		create: function(req,res){
			console.log("requesting a username", req.body.name)
			User.findOne({name: req.body.name }, function(err,user){
				if(!user){
					var newUser = new User(req.body);
					newUser.save(function(err){
						if(err) {
							console.log(err);
							res.json({err:err, user: null});
						}
						else{
						res.json({err:null, user: newUser});
						}
					})
				}
				else {
					res.json({err:null, user:user});
				}
			});			
		},


		show: function(req,res){
			User.findOne({_id:req.params.id}, function(err,data){
				if(err){
					res.json(err);
				}
				else{
					res.json(data)
				}
			})
		},


		updateComments: function(req,res){
			console.log(req.body);
			User.findByIdAndUpdate(req.params.id,{
				$push:{comments:req.body}
			}, 
			{new:true},
			function(err,data){
					if(err){
						console.log(err);
					}
					else {
						console.log(data);
						res.json(data);
					}
				}
			)
		},

		updatePosts: function(req,res){
			console.log(req.body);
			User.findByIdAndUpdate(req.params.id,{
				$push:{posts:req.body}
			}, 
			{new:true},
			function(err,data){
					if(err){
						console.log(err);
					}
					else {
						console.log(data);
						res.json(data);
					}
				}
			)
		},

		updateTopic: function(req,res){
			// console.log(req.body.topics);
			User.findByIdAndUpdate(req.params.id,{
				$push: {topics:req.body.topics}
				},
				{new:true},
				function(err,data){
					if(err){
						console.log(err);
					}
					else {
						console.log(data);
						res.json(data);
					}
				}
			)
		}
	}
})();  