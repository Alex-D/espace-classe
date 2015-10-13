'use strict';

angular.module('espaceClasse.main', [])

    .controller('MainController', function ($scope, $rootScope) {
        $scope.isMenuVisible = false;
        $scope.showMenu = function () {
            $scope.isMenuVisible = true;
        };
        $scope.hideMenu = function () {
            $scope.isMenuVisible = false;
        };

        $rootScope.pageTitle = 'Espace Classe';
    });