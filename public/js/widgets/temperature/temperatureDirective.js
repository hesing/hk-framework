"use strict";

angular.module('myApp').directive('temperature', function (dataService) {
        return {
            templateUrl: 'js/widgets/temperature/temperatureTemplate.html',
            link: function (scope, el, attrs) {
            	scope.selectedLocation = null;
            	scope.isLoaded = false;
                scope.hasError = false;

                scope.loadLocation = function(){
                    scope.hasError = false;
                    dataService.getLocation(scope.item.widgetSettings.id)
                        .then(function (data) {
                            scope.selectedLocation = data;
                            scope.isLoaded = true;
                            scope.hasError = false;
                        }, function(){
                            scope.hasError = true;
                        });

                }

                scope.loadLocation();
            }
        };
});