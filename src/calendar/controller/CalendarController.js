'use strict';

angular.module('espaceClasse.calendar')

    .controller('CalendarController', function ($scope, $rootScope, $location, StorageService) {
        $rootScope.pageTitle = 'Calendar';

        // Get courses
        $scope.courses = StorageService.getItem('courses', []);

        $scope.$watch('courses', function () {
            StorageService.setItem('courses', $scope.courses);
        }, true);

        // Get events
        $scope.events = StorageService.getItem('events', [[]]);
        $scope.$watch('events', function () {
            StorageService.setItem('events', $scope.events);
        }, true);

        $scope.classrooms = StorageService.getItem('classrooms', []);
        $scope.indexedClassrooms = {};
        for (let i = 0; i < $scope.classrooms.length; i += 1) {
            $scope.indexedClassrooms[$scope.classrooms[i].id] = $scope.classrooms[i];
        }

        $scope.formCreateCourse = null;
        $scope.cancelCreateCourse = function () {
            $scope.formCreateCourse = null;
        };
        $scope.createCourse = function () {
            if ($scope.formCreateCourse.classroomId == null) {
                return;
            }

            let start = new Date($scope.formCreateCourse.date);
            start.setMinutes($scope.formCreateCourse.minutes);
            start.setHours($scope.formCreateCourse.hours + parseInt($scope.formCreateCourse.amOrPm) + 1);

            let end = new Date(start);
            end.setHours(start.getHours() + 1);

            let courseId = $scope.courses.length > 0 ? $scope.courses[$scope.courses.length - 1].id + 1 : 0;

            $scope.events[0].push({
                courseId,
                classroomId: parseInt($scope.formCreateCourse.classroomId),
                title: $scope.indexedClassrooms[$scope.formCreateCourse.classroomId].name,
                start: +start,
                end: +end
            });
            $scope.courses.push({
                id: courseId
            });
            $scope.formCreateCourse = null;
        };
        $scope.dayClickHandler = function (date) {
            $scope.formCreateCourse = {
                date: date,
                hours: date.hours() > 12 ? date.hours() - 12 : date.hours(),
                amOrPm: date.hours() > 12 ? '12' : '0',
                minutes: 0
            };
        };
        $scope.eventClickHandler = function (date) {
            $location.path('/course/' + date.classroomId + '/' + date.courseId);
        };
        $scope.uiConfig = {
            calendar: {
                height: 650,
                editable: true,
                firstDay: 1,
                dow: [1, 2, 3, 4, 5],
                header: {
                    left: 'agendaWeek,agendaDay,month',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.dayClickHandler,
                eventClick: $scope.eventClickHandler
            }
        };
    });