'use strict';

angular.module('espaceClasse.common')

    .directive('upload', function () {
        return {
            scope: {
                ngModel: '='
            },
            templateUrl: '/common/view/upload.html',
            link: function (scope, element) {
                scope.imageBase64 = '';

                let input = element.find('input')[0];

                input.onchange = function (event) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        let image = new Image(),
                            canvas = document.createElement('canvas');

                        image.src = e.target.result;

                        canvas.width = 150;
                        canvas.height = 150;

                        let context = canvas.getContext('2d');
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);

                        scope.ngModel = canvas.toDataURL('image/png');

                        scope.$apply();
                    };

                    try {
                        reader.readAsDataURL(event.target.files[0]);
                    } catch (e) {}
                };
            }
        };
    });