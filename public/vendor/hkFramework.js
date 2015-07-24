angular.module("hkFramework", ["hkMenu", "hkDashboard"]);



angular.module('hkFramework').directive('hkUserProfileSmall', function () {
    return {
        templateUrl: 'ext-modules/hkFramework/hkUserProfile/hkUserProfileSmallTemplate.html'
    };
});


angular.module('hkFramework').directive('hkUserProfile', function () {
    return {
        templateUrl: 'ext-modules/hkFramework/hkUserProfile/hkUserProfileTemplate.html'
    };
});
angular.module("hkMenu", []);
angular.module("hkMenu").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/hkMenu/hkMenuGroupTemplate.html","<li class=\"hk-selectable-item\" ng-class=\"{\'active\': isActive(), \'hk-item-horizontal\': !isVertical() }\" ng-click=\"clicked()\">\r\n	<i class=\"fa {{icon}} hk-menu-icon\"></i> {{ label }}\r\n	<i class=\"fa fa-arrow-right pull-right hk-arrow\" ng-class=\"{\'fa-rotate-90\': isOpen}\"></i>\r\n</li>\r\n<div ng-show=\"isOpen\" class=\"hk-subitem-section hk-fade-in-animation\" ng-class=\"{\'hk-popup-menu\': !isVertical()}\"> \r\n	<ul ng-transclude></ul>\r\n</div>\r\n");
$templateCache.put("ext-modules/hkMenu/hkMenuItemTemplate.html","<li class=\"hk-selectable-item\" ng-class=\"{\'active\': isActive(), \'hk-item-horizontal\': !isVertical() }\">\r\n	<i class=\"fa {{icon}} hk-menu-icon\"></i> {{ label }}\r\n</li>");
$templateCache.put("ext-modules/hkMenu/hkMenuTemplate.html","<div>\r\n	<ul class=\"hk-menu hk-noselect\" ng-transclude></ul>\r\n	<a class=\"btn hk-menu-layout-btn\" ng-click=\"toggleMenuOrientation()\" ng-class=\"{\'hk-layout-btn-horizontal\': !isVertical}\" ng-show=\"allowHorizontalToggle\">\r\n		<i class=\"fa\" ng-class=\"{\'fa-chevron-up\': isVertical, \'fa-chevron-left\': !isVertical}\"></i>\r\n	</a>\r\n</div>");}]);
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

				scope.isVertical = function(){
					return  hkMenuCtrl.isVertical() || elm.parents(".hk-subitem-section").length;
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
angular.module("hkMenu")
	.controller("hkMenuController", function($scope, $rootScope){
		$scope.showMenu = true;
		$scope.isVertical = true;
		$scope.openMenuScope = null;
		$scope.allowHorizontalToggle = true;
		
		this.setActiveItem = function(elm){
			$scope.activeElement = elm;
		};

		this.getActiveItem = function(){
			return $scope.activeElement;
		};

		this.isVertical = function(){
			return $scope.isVertical;
		};

		this.setRoute = function(route){
			$rootScope.$broadcast('hkMenuSelectedEvent', {route: route});
		};

		$scope.$on("hkMenuShow", function(evt, data){
			$scope.showMenu = data.show;
			$scope.isVertical = data.isVertical;
			$scope.allowHorizontalToggle = data.allowHorizontalToggle;
		});

		this.setOpenMenuScope = function(scope){ 
			$scope.openMenuScope = scope;
		};

		$scope.toggleMenuOrientation = function(){
			if($scope.openMenuScope){
				$scope.openMenuScope.closeMenu();
			}

			$scope.isVertical = !$scope.isVertical;
			$rootScope.$broadcast('hkMenuOrientationChangeEvent', { isMenuVertical: $scope.isVertical });
		};

		angular.element(document).on("click", function(e){
			if($scope.openMenuScope && !$scope.isVertical){
				if($(e.target).hasClass("hk-selectable-item"))
				return;

				$scope.$apply(function(){
					$scope.openMenuScope.closeMenu();
				});
				e.preventDefault();
				e.stopPropagation();
			}
		});
	});
angular.module("hkDashboard", ['gridster']);

angular.module("hkDashboard").run(["$templateCache", function($templateCache) {$templateCache.put("public/ext-modules/hkDashboard/hkDashboardTemplate.html","<div class=\"hk-dashboard-header\">\r\n	{{ title }}\r\n\r\n    <div class=\"hk-dashboard-controls\">\r\n\r\n    <div class=\"btn-group\" dropdown is-open=\"status.isopen\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm dropdown-toggle\" dropdown-toggle ng-disabled=\"disabled\">\r\n		<i class=\"fa fa-plus\"></i>\r\n        Add Widget\r\n        <span class=\"caret\"></span>\r\n      </button>\r\n      <ul class=\"dropdown-menu\" role=\"menu\">\r\n        <li ng-repeat=\"widget in widgetDefinitions\">\r\n            <a role=\"menuitem\" ng-click=\"addNewWidget(widget)\">{{widget.title}}</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    </div>\r\n</div>\r\n<div gridster=\"gridsterOpts\">\r\n	<ul>\r\n		<li gridster-item=\"item\" ng-repeat=\"item in widgets\">\r\n<!-- 			<div class=\"hk-widget-header\" ng-if=\"item.title\">\r\n				<span>{{ item.title }}</span>\r\n				<div class=\"hk-widget-eader-buttons\">\r\n					<button class=\"btn btn-default pull-right\">\r\n						<i class=\"fa fa-remove\"></i>\r\n					</button>\r\n					<button class=\"btn btn-default pull-right\">\r\n						<i class=\"fa fa-gear\"></i>\r\n					</button>\r\n				</div>\r\n			</div> -->\r\n			<hk-widget-body></hk-widget-body>\r\n		</li>\r\n	</ul>\r\n</div>");
$templateCache.put("public/ext-modules/hkDashboard/hkWidgetBodyTemplate.html","<div class=\"hk-widget-body\">\r\n    <div class=\"hk-widget-menu-area btn-group\" dropdown>\r\n        <a class=\"dropdown-toggle\" dropdown-toggle>\r\n            <i class=\"fa fa-bars\" ng-click=\"iconClicked()\" />\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu\" role=\"menu\">\r\n            <li ng-click=\"close()\"><i class=\"fa fa-2x fa-close\" ng-click=\"iconClicked()\" /></li>\r\n            <li ng-click=\"settings()\"><i class=\"fa fa-2x fa-gear\" ng-click=\"iconClicked()\" /></li>\r\n        </ul>\r\n    </div>\r\n</div>");}]);


angular.module('hkDashboard').directive('hkWidgetBody', function ($compile, $modal) {
        return {
            templateUrl: 'ext-modules/hkDashboard/hkWidgetBodyTemplate.html',
            link: function (scope, element, attrs) {
                var newElement = angular.element(scope.item.template);
                element.append(newElement);
                $compile(newElement)(scope);

                scope.close = function () {
                    scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                };

                scope.settings = function () {
                    var options = {
                        templateUrl: scope.item.widgetSettings.templateUrl,
                        controller: scope.item.widgetSettings.controller,
                        scope: scope
                    };
                    $modal.open(options);
                };

                scope.iconClicked = function () {
                    // empty body.
                    // this function is used by ng-click in the template
                    // so that icon clicks aren't intercepted by widgets
                };
            }
        };
    });
angular.module("hkDashboard")
	.directive("hkDashboard", function(){
		return{
			templateUrl: "ext-modules/hkDashboard/hkDashboardTemplate.html",
			link: function (scope, element, attrs) {
	            scope.addNewWidget = function (widget) {
	                var newWidget = angular.copy(widget.settings);
	                scope.widgets.push(newWidget);
	            }
	        }
		};
	});
angular.module("hkFramework").run(["$templateCache", function($templateCache) {$templateCache.put("public/ext-modules/hkFramework/hkFrameworkTemplate.html","<div class=\"hk-title-bar\">\r\n	<div class=\"row\">\r\n		<div class=\"hk-logo-area col-sm-6\">\r\n			<img ng-src=\"{{ iconFile }}\" alt=\"logo\">\r\n			<div class=\"hk-title-area\">\r\n				<div class=\"hk-logo-title\">{{ title }}</div>\r\n				<div class=\"hk-logo-subtitle\">{{ subtitle }}</div>\r\n			</div>\r\n\r\n			<div ng-if=\"isMenuButtonVisible\" ng-click=\"menuButtonClicked()\" class=\"hk-collapsed-menu pull-right\">\r\n				<button class=\"btn hk-nav-button\"> \r\n					<i class=\"fa fa-bars\"></i>\r\n				</button>\r\n			</div>\r\n		</div>\r\n		<div class=\"hk-right-side-controls col-sm-6\">\r\n			<hk-user-profile-small></hk-user-profile-small>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class=\"hk-menu-area\" ng-show=\"isMenuVisible\" ng-class=\"{\'hk-menu-area-vertical\': isMenuVertical, \'hk-menu-area-horizontal\': !isMenuVertical}\">\r\n	<hk-user-profile></hk-user-profile>\r\n	<ng-transclude />\r\n</div>\r\n<div ui-view class=\"hk-view\" ng-class=\"{\'hk-view-full-width\': !isMenuVertical || !isMenuVisible}\"></div>\r\n\r\n");
$templateCache.put("public/ext-modules/hkFramework/hkUserProfile/hkUserProfileSmallTemplate.html","\r\n<div class=\"hk-user-profile-small pull-right\">\r\n    <img src=\"images/me.png\" alt=\"user image\" />\r\n    <span>Hemant Singh</span>\r\n    <button class=\"btn btn-default btn-sm\">\r\n        <i class=\"fa fa-chevron-down\"></i>\r\n    </button>\r\n</div>\r\n");
$templateCache.put("public/ext-modules/hkFramework/hkUserProfile/hkUserProfileTemplate.html","\r\n<div class=\"hk-user-profile\" ng-if=\"isMenuVertical && !isMenuButtonVisible\">\r\n    <img src=\"images/me.png\" alt=\"user image\"/>\r\n    <div>\r\n        <p>Hemant</p>\r\n        <p>Singh</p>\r\n        <button class=\"btn btn-default btn-sm\">\r\n            <i class=\"fa fa-chevron-down\"></i>\r\n        </button>\r\n    </div>\r\n</div>\r\n");}]);
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
angular.module("hkFramework")
	.controller("hkFrameworkController", function($scope, $window, $timeout, $rootScope, $location){
		$scope.isMenuVisible = true;
		$scope.isMenuButtonVisible = true;
		$scope.isMenuVertical = true;

		$scope.$on("hkMenuSelectedEvent", function(e, data){
			//$scope.routeString = data.route;
			$location.path(data.route);
			checkWidth();
			broadcastMenuState();
		});

		$scope.$on("hkMenuOrientationChangeEvent", function(e, data){
			$scope.isMenuVertical = data.isMenuVertical;

			// $timeout(function(){
			// 	$($window).trigger("resize.hkFramework");
			// }, 0);
		});

		var checkWidth = function(){
			var width = Math.max($($window).width(), $($window).innerWidth());
			$scope.isMenuVisible = (width > 768);
			$scope.isMenuButtonVisible = !$scope.isMenuVisible;
		};

		$timeout(function(){
			checkWidth();
			broadcastMenuState();
		}, 0);

		$($window).on('resize.hkFramework', function(){
			$scope.$apply(function(){
				checkWidth();
				broadcastMenuState();
			});
		});

		$scope.$on("$destroy", function(){
			$($window).off("resize.hkFramework");
		});	

		var broadcastMenuState = function(){
			$rootScope.$broadcast('hkMenuShow', {
				show: $scope.isMenuVisible, 
				isVertical: $scope.isMenuVertical,
				allowHorizontalToggle: !$scope.isMenuButtonVisible
			});
		};

		$scope.menuButtonClicked = function(){
			$scope.isMenuVisible = !$scope.isMenuVisible;
			broadcastMenuState();
			//$scope.$apply();
		}
	});