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