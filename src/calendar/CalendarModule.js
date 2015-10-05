'use strict';

angular.module('espaceClasse.calendar', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'calendar/view/index.html',
                controller: 'CalendarController'
            })
    });