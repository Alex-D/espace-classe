'use strict';

angular.module('espaceClasse.classes')

    .controller('ClassesController', function ($scope, $rootScope) {
        $rootScope.pageTitle = 'Classes';

        $scope.classes = [
            {id: 1, name: '4ème B', students: [{firstname: 'Marcel', lastname: 'Dupuis'}]},
            {id: 2, name: '6ème A', students: []},
            {id: 3, name: '4ème Noisette', students: []},
            {id: 4, name: '3ème E', students: []}
        ];

        $scope.addClass = function () {
            $scope.classes.push({
                id: $scope.classes.length > 0 ? $scope.classes[$scope.classes.length - 1].id + 1 : 0,
                name: 'New class',
                students: []
            });
            $scope.selectClass($scope.classes.length - 1);
        };

        $scope.currentClass = null;
        $scope.selectClass = function (classIndex) {
            $scope.currentClass = $scope.classes[classIndex];
        };

        $scope.currentClassDelete = null;
        $scope.openDeleteCurrentClassModal = function () {
            $scope.currentClassDelete = $scope.currentClass;
        };
        $scope.deleteCurrentClass = function () {
            $scope.classes.splice($scope.classes.map(function (e) {
                return e.id;
            }).indexOf($scope.currentClassDelete.id), 1);
            $scope.currentClass = null;
            $scope.currentClassDelete = null;
        };
        $scope.cancelDeleteCurrentClass = function () {
            $scope.currentClassDelete = null;
        };


        $scope.addStudent = function () {
            $scope.currentClass.students.push({
                id: $scope.currentClass.students.length > 0 ? $scope.currentClass.students[$scope.currentClass.students.length - 1].id + 1 : 0,
                firstname: '',
                lastname: ''
            });
        };

        $scope.currentStudentDelete = null;
        $scope.openDeleteStudentModal = function (student) {
            $scope.currentStudentDelete = student;
        };
        $scope.deleteStudent = function () {
            $scope.currentClass.students.splice($scope.currentClass.students.map(function (e) {
                return e.id;
            }).indexOf($scope.currentStudentDelete.id), 1);
            $scope.currentStudentDelete = null;
        };
        $scope.cancelDeleteStudent = function () {
            $scope.currentStudentDelete = null;
        };
    });