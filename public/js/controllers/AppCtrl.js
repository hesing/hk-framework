angular.module("myApp")
	.controller("AppCtrl", function(User){
		var vm = this;

		vm.users = User;
	});