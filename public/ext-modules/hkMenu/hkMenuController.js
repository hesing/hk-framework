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