angular.module("myApp")
	.controller("AppCtrl", function(User){
		var vm = this;

		vm.state = 'unauthorized';

		vm.signIn = function () {
			vm.state = 'authorized';
		};
	});