'use strict';

angular.module('espaceClasse.course', [
    'ngRoute'
])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/course/:classroomId/:courseId', {
                templateUrl: 'course/view/index.html',
                controller: 'CourseController'
            });
    });