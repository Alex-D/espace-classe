'use strict';

angular.module('espaceClasse.course')

    .controller('CourseController', function ($scope, $rootScope, $location, $routeParams, StorageService) {
        // Get courses
        $scope.courses = StorageService.getItem('courses', []);
        $scope.indexedCourses = {};
        for (let i = 0; i < $scope.courses.length; i += 1) {
            $scope.indexedCourses[$scope.courses[i].id] = $scope.courses[i];
        }

        try {
            // Get classroom
            $scope.classrooms = StorageService.getItem('classrooms', []);
            $scope.indexedClassrooms = {};
            for (let i = 0; i < $scope.classrooms.length; i += 1) {
                $scope.indexedClassrooms[$scope.classrooms[i].id] = $scope.classrooms[i];
            }
            let classroom = $scope.classrooms[$routeParams.classroomId];
            $rootScope.pageTitle = classroom.name;

            // Get class
            $scope.classes = StorageService.getItem('classes', []);
            $scope.indexedClasses = {};
            for (let i = 0; i < $scope.classes.length; i += 1) {
                $scope.indexedClasses[$scope.classes[i].id] = $scope.classes[i];
            }

            // Get stendents
            $scope.indexedStudents = [];
            let currentClass = $scope.indexedClasses[classroom.classeId];
            for (let i = 0; i < currentClass.students.length; i += 1) {
                $scope.indexedStudents[currentClass.students[i].id] = currentClass.students[i];
            }

            $scope.$watch('courses', function () {
                StorageService.setItem('courses', $scope.courses);
            }, true);

            if ($scope.indexedCourses[$routeParams.courseId] && $scope.indexedCourses[$routeParams.courseId].seats) {
                $scope.classroom = $scope.indexedCourses[$routeParams.courseId].seats;
            } else {
                // Classroom student/place list
                $scope.course = $scope.indexedCourses[$routeParams.courseId];
                $scope.classroom = [];

                for (let row = 0; row < classroom.seats.length; row += 1) {
                    $scope.classroom[row] = [];

                    for (let seat = 0; seat < classroom.seats[row].length; seat += 1) {
                        if (classroom.seats[row][seat].studentId) {
                            $scope.classroom[row].push({
                                studentId: classroom.seats[row][seat].studentId,
                                participationEditIsVisible: false,
                                warningEditIsVisible: false,
                                participations: 0,
                                warning: 0,
                                note: ''
                            });
                        } else {
                            $scope.classroom[row].push({});
                        }
                    }
                }

                $scope.course.seats = $scope.classroom;
            }
        } catch (e) {
            $location.path('/');
        }

        // Show student note
        $scope.studentNotePopin = null;
        $scope.showNote = function (student) {
            $scope.studentNotePopin = student;
        };
        $scope.hideNote = function () {
            $scope.studentNotePopin = null;
        };

        // Modify student participations
        $scope.toggleEditParticipations = function (student) {
            student.participationEditIsVisible = !student.participationEditIsVisible;
        };
        $scope.editParticipations = function (student, delta) {
            student.participations += delta;
            student.participationEditIsVisible = false;
        };

        // Modify warnings
        $scope.toggleEditWarning = function (student) {
            student.warningEditIsVisible = !student.warningEditIsVisible;
        };
        $scope.setWarning = function (student, warningLevel) {
            student.warning = warningLevel;
            student.warningEditIsVisible = false;
        };
    });