'use strict';

angular.module('espaceClasse.course', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/course', {
                templateUrl: 'course/view/course-classroom.html',
                controller: 'CourseController'
            });
    });