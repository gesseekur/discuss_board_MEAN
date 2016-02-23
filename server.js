var express = require('express');
var app = express();
var server = app.listen(1337)
var path = require('path');

//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Session
var session = require('express-session')
app.use(session({
	secret:'keyboard cat',
	resave: false,
	saveUninitialized: true 
}))

app.use(express.static(path.join(__dirname,'./client')));

//Mongoose
require('./server/config/mongoose.js');

//HTTP Routes
require('./server/config/routes.js')(app);



// app.listen(8000, function(){
// 	console.log('8000');
// })
