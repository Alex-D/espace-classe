'use strict';

angular.module('espaceClasse.calendar')

    .controller('CalendarController', function ($scope, $rootScope) {
        $rootScope.pageTitle = 'Calendar';

        $scope.dayClickHandler = function (date, event, view) {
            console.log('DAY', date, event, view);
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
        $scope.events = [[
            {title: 'Mon super cours', start: new Date()}
        ]];
    });