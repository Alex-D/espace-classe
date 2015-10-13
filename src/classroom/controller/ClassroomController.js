'use strict';

angular.module('espaceClasse.classroom')

    .controller('ClassroomController', function ($scope, $rootScope) {
        $rootScope.pageTitle = 'Classroom';

        // Classroom student/place list
        $scope.classroom = [];
        let seats = [];
        let student = {
            firstname: "Jean-Michel",
            lastname: "Deschamps"
        };
        for (let i = 0; i < 10; i += 1) {
            let newStudent = angular.copy(student);
            newStudent.participations = i * 2;
            newStudent.photo = 'https://randomuser.me/api/portraits/med/' + (i % 2 === 0 ? 'men' : 'women') + '/' + i + '.jpg';
            if (i % 4 < 2) {
                newStudent.note = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, temporibus autem. Saepe eligendi magni, voluptate quas consectetur nesciunt! Tempore cupiditate labore, odio laudantium ea. Aspernatur expedita eaque voluptate perspiciatis commodi!";
            }
            newStudent.warning = Math.round(i / 2);
            seats.push(i !== 1 && i !== 4 && i !== 7 ? newStudent : {});
        }
        for (let i = 0; i < 4; i += 1) {
            $scope.classroom.push(seats);
        }

        // Show student note
        $scope.studentNotePopin = null;
        $scope.showNote = function (student) {
            $scope.studentNotePopin = student;
        };
        $scope.hideNote = function () {
            $scope.studentNotePopin = null;
        };

        // TODO: Modify student participations

        // TODO: Modify warnings
    });