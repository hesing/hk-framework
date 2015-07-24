"use strict";

angular.module('myApp').directive('employee', function (dataService) {
        return {
            templateUrl: 'js/widgets/employee/employeeTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                    .then(function (data) {
                        scope.selectedEmployee = data;
                    });
            }
        };
    });