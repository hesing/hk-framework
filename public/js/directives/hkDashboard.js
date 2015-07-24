angular.module("myApp")
	.directive("hkDashboard", function($timeout){
		return{
			// transclude: true,
			// scope: {
			// 	label: "@"
			// },
			// controller: "hkMenuController",
			templateUrl: "views/hk-dashboard.html"
		};
	});