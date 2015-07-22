angular.module("myApp")
	.factory("User", function($http){
		return [
			{name: "hemant", age: 30},
			{name: "varun", age: 20},
			{name: "vinay", age: 11}
		];
	})