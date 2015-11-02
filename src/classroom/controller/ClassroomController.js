'use strict';

angular.module('espaceClasse.classroom')

    .controller('ClassroomController', function ($scope, $rootScope, StorageService) {
        $rootScope.pageTitle = 'Classrooms';

        var SEATS_DEFAULT = [];
        for (var row = 0; row < 5; row += 1) {
            SEATS_DEFAULT[row] = [];

            for (var seat = 0; seat < 10; seat += 1) {
                SEATS_DEFAULT[row][seat] = {};
            }
        }

        $scope.classes = StorageService.getItem('classes', []);
        $scope.indexedClasses = {};
        for (var i = 0; i < $scope.classes.length; i += 1) {
            $scope.indexedClasses[$scope.classes[i].id] = $scope.classes[i];
        }

        $scope.classrooms = StorageService.getItem('classrooms', []);
        $scope.$watch('classrooms', function () {
            StorageService.setItem('classrooms', $scope.classrooms);
        }, true);

        $scope.addClassroom = function () {
            $scope.classrooms.push({
                id: $scope.classrooms.length > 0 ? $scope.classrooms[$scope.classrooms.length - 1].id + 1 : 0,
                name: 'New classroom',
                seats: JSON.parse(JSON.stringify(SEATS_DEFAULT))
            });
            $scope.selectClassroom($scope.classrooms.length - 1);
        };

        $scope.currentClassroom = null;
        $scope.indexedStudents = [];
        $scope.$watch('currentClassroom', function () {
            if ($scope.currentClassroom != null) {
                var currentClass = $scope.indexedClasses[$scope.currentClassroom.classeId];
                if (currentClass != null) {
                    for (var i = 0; i < currentClass.students.length; i += 1) {
                        $scope.indexedStudents[currentClass.students[i].id] = currentClass.students[i];
                    }
                }
            }
        });
        $scope.selectClassroom = function (classIndex) {
            $scope.currentClassroom = $scope.classrooms[classIndex];
        };

        $scope.currentClassroomDelete = null;
        $scope.openDeleteCurrentClassroomModal = function () {
            $scope.currentClassroomDelete = $scope.currentClassroom;
        };
        $scope.deleteCurrentClassroom = function () {
            $scope.classrooms.splice($scope.classrooms.map(function (e) {
                return e.id;
            }).indexOf($scope.currentClassroomDelete.id), 1);
            $scope.currentClassroom = null;
            $scope.currentClassroomDelete = null;
        };
        $scope.cancelDeleteCurrentClassroom = function () {
            $scope.currentClassroomDelete = null;
        };
    });