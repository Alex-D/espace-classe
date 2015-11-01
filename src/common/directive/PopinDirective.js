'use strict';

angular.module('espaceClasse.common')

    .directive('popin', function () {
        return {
            scope: {
                popin: '=',
                popinIsOpen: '=',
                popinTitle: '=',
                popinSubmit: '=',
                popinCancel: '=',
                popinSubmitLabel: '=',
                popinCancelLabel: '='
            },
            templateUrl: '/common/view/popin.html',
            transclude: true
        };
    });