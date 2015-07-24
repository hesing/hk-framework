angular.module("myApp")
	.config(function($stateProvider, $urlRouterProvider, $provide){
		$urlRouterProvider.otherwise("/dashboard");

		$stateProvider.state("dashboard", {
			url: "/dashboard",
			template: "<hk-dashboard></hk-dashboard>",
			controller: function($scope, $localStorage){
				$scope.title = "My First Dashboard";

            $scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: false,
                swapping: false
            };

            $scope.widgetDefinitions = [
                {
                    title: 'Temperature',
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<temperature></temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'js/dialogs/selectLocationTemplate.html',
                            controller: 'SelectLocationController'
                        }
                    }
                },
                {
                    title: 'Inventory',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<inventory></inventory>',
                        widgetSettings: {
                            id: 1002,
                            templateUrl: 'js/dialogs/selectLocationTemplate.html',
                            controller: 'SelectLocationController'
                        }
                    }
                },
                {
                    title: 'Employee',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<employee></employee>',
                        widgetSettings: {
                            id: 5000,
                            templateUrl: 'js/dialogs/selectEmployeeTemplate.html',
                            controller: 'SelectEmployeeController'
                        }
                    }
                }
            ];

            $scope.widgets = $localStorage.widgets || [];

            $scope.$watch('widgets', function(){
                $localStorage.widgets = $scope.widgets;
            }, true);

        }
		})
		.state("about", {
			url: "/locations",
			template: "<hk-locations></hk-locations>"
		})
		.state("guides", {
			url: "/guides",
			template: "<hk-guides></hk-guides>"
		});

		$provide.decorator("$exceptionHandler", function($delegate, $injector) {
            return function(exception, cause) {
                $delegate(exception, cause);
                alert(exception.message);
                // var alerting = $injector.get("alerting");
                // alerting.addDanger(exception.message);
            };
        });
	});