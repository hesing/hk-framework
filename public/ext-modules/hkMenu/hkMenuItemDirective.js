angular.module("hkMenu")
	.directive("hkMenuItem", function(){
		return{
			require: "^hkMenu",
			scope: {
				label: "@",
				icon: "@", 
				route: "@"
			},
			replace: true,
			templateUrl: "ext-modules/hkMenu/hkMenuItemTemplate.html",
			link: function(scope, elm, attrs, hkMenuCtrl){
				scope.isActive = function(){
					return elm === hkMenuCtrl.getActiveItem();
				};

				elm.on("click", function(evt){
					evt.stopPropagation();
					evt.preventDefault();

					scope.$apply(function(){
						hkMenuCtrl.setActiveItem(elm);
						hkMenuCtrl.setRoute(scope.route);
					});
				})
			}
		};
	});