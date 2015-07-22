angular.module("hkMenu")
	.directive("hkMenu", function(){
		return{
			transclude: true,
			scope: {
				label: "@"
			},
			controller: "hkMenuController",
			templateUrl: "ext-modules/hkMenu/hkMenuTemplate.html"
		};
	});