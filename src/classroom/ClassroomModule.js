'use strict';

angular.module('espaceClasse.classroom', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/classrooms', {
                templateUrl: 'classroom/view/index.html',
                controller: 'ClassroomController'
            });
    });