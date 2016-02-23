var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		// controller: 'HomeController'
		templateUrl: '/partials/login.html'
	})
	.when('/main', {
		controller:'mainController',
		controllerAs:'mainCtrl',
		templateUrl:'/partials/main.html'
	})
	.when('/user/:id',{
		templateUrl:'/partials/user.html'
	})
	.when('/topic/:id',{
		templateUrl:'/partials/topic.html'
	})
	.otherwise('/')
})