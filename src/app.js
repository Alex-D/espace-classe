'use strict';

angular.module('espaceClasse', [
    'ngRoute',

    'ui.calendar',

    'espaceClasse.common',
    'espaceClasse.main',
    'espaceClasse.classroom',
    'espaceClasse.calendar'
])

    .config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function () {

    });