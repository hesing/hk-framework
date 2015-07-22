angular.module("myApp")
	.config(function($stateProvider, $urlRouterProvider, $provide){
		$urlRouterProvider.otherwise("/");

		$stateProvider.state("home", {
			url: "/",
			templateUrl: "views/home.html"
		})
		.state("about", {
			url: "/about",
			templateUrl: "views/about.html"
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