angular.module("hkMenu")
	.directive("hkMenuGroup", function(){
		return{
			require: "^hkMenu",
			transclude: true,
			scope: {
				label: "@",
				icon: "@"			
			},
			templateUrl: "ext-modules/hkMenu/hkMenuGroupTemplate.html",
			link: function(scope, elm, attrs, hkMenuCtrl){
				scope.isOpen = false;

				scope.isVertical = function(){
					return  hkMenuCtrl.isVertical() || elm.parents(".hk-subitem-section").length;
				};
				
				scope.closeMenu = function(){
					scope.isOpen = false;
				};

				scope.setSubmenuPosition = function(){
					var pos = elm.offset();
					$(".hk-subitem-section").css({ 'left': pos.left+20, 'top': 36 });
				};

				scope.clicked = function(){
					scope.isOpen = !scope.isOpen;
					if(!elm.parents(".hk-subitem-section").length){
						scope.setSubmenuPosition();
					}

					hkMenuCtrl.setOpenMenuScope(scope);
				};
			}
		};
	});