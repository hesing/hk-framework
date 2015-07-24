angular.module("hkMenu")
	.directive("hkMenu", function($timeout){
		return{
			transclude: true,
			scope: {
				label: "@"
			},
			controller: "hkMenuController",
			templateUrl: "ext-modules/hkMenu/hkMenuTemplate.html",
			link: function(scope, elm, attrs){
				var $item = elm.find(".hk-selectable-item:first");
				$timeout(function(){
					$item.trigger("click");
				}, 0)
			}
		};
	});