"use strict";

angular.module('myApp').directive('inventory', function (dataService) {
        return {
            templateUrl: 'js/widgets/inventory/inventoryTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getLocation(scope.item.widgetSettings.id)
                    .then(function (data) {
                        scope.selectedLocation = data;
                    });
            }
        };
    });