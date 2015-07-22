angular.module("hkFramework")
	.controller("hkFrameworkController", function($scope, $window, $timeout, $rootScope){
		$scope.isMenuVisible = true;
		$scope.isMenuButtonVisible = true;

		$scope.$on("hkMenuSelectedEvent", function(e, data){
			$scope.routeString = data.route;
			checkWidth();
			broadcastMenuState();
		});

		var checkWidth = function(){
			var width = Math.max($($window).width(), $($window).innerWidth());
			$scope.isMenuVisible = (width > 768);
			$scope.isMenuButtonVisible = !$scope.isMenuVisible;
		};

		$timeout(function(){
			checkWidth();
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
				show: $scope.isMenuVisible
			});
		};

		$scope.menuButtonClicked = function(){
			$scope.isMenuVisible = !$scope.isMenuVisible;
			broadcastMenuState();
			//$scope.$apply();
		}
	});