'use strict';

angular.module('espaceClasse', [
    'ngRoute',

    'ui.calendar',

    'espaceClasse.common',
    'espaceClasse.main',
    'espaceClasse.course',
    'espaceClasse.calendar',
    'espaceClasse.classroom',
    'espaceClasse.classes'
])

    .config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });