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