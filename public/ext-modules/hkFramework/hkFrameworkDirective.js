angular.module("hkFramework")
	.directive("hkFramework", function(){
		return{
			transclude: true,
			controller: "hkFrameworkController",
			scope: {
				title: "@",
				subtitle: "@",
				iconFile: "@"
			},
			templateUrl: "ext-modules/hkFramework/hkFrameworkTemplate.html"
		};
	});