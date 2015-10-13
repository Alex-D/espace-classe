'use strict';

angular.module('espaceClasse.classroom', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/classroom', {
                templateUrl: 'classroom/view/classroom.html',
                controller: 'ClassroomController'
            })
    });