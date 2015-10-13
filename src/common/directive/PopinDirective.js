'use strict';

angular.module('espaceClasse.common')

    .directive('popin', function () {
        return {
            scope: {
                popin: '=',
                popinIsOpen: '=',
                popinTitle: '=',
                popinClose: '=',
                popinSubmitLabel: '=',
                popinCancelLabel: '='
            },
            templateUrl: '/common/view/popin.html',
            transclude: true
        };
    });