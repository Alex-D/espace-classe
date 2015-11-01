'use strict';

angular.module('espaceClasse.classes', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/classes', {
                templateUrl: 'classes/view/index.html',
                controller: 'ClassesController'
            });
    });