angular.module("hkMenu")
	.controller("hkMenuController", function($scope, $rootScope){
		$scope.showMenu = true;
		
		this.setActiveItem = function(elm){
			$scope.activeElement = elm;
		};

		this.getActiveItem = function(){
			return $scope.activeElement;
		};

		this.setRoute = function(route){
			$rootScope.$broadcast('hkMenuSelectedEvent', {route: route});
		};

		$scope.$on("hkMenuShow", function(evt, data){
			$scope.showMenu = data.show;
		});
	});