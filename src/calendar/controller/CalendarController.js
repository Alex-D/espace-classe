'use strict';

angular.module('espaceClasse.calendar')

    .controller('CalendarController', function ($scope, $rootScope, StorageService) {
        $rootScope.pageTitle = 'Calendar';

        $scope.events = StorageService.getItem('events', [[]]);
        $scope.$watch('events', function () {
            StorageService.setItem('events', $scope.events);
        }, true);

        $scope.classrooms = StorageService.getItem('classrooms', []);
        $scope.indexedClassrooms = {};
        for (var i = 0; i < $scope.classrooms.length; i += 1) {
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

            $scope.events[0].push({
                title: $scope.indexedClassrooms[$scope.formCreateCourse.classroomId].name,
                start: +start,
                end: +end
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
        $scope.eventClickHandler = function (date, event, view) {
            console.log('EVENT', date, event, view);
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