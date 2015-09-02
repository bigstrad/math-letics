angular.module('app')
    // allows adding url to non-anchor elements
    .directive('mathHref', ['$location', function ($location) {
        return{
            restrict: 'A',
            link: function (scope, element, attr) {
                element.attr('style', 'cursor:pointer');
                element.on('click', function () {
                    $location.path(attr.mathHref)
                    scope.$apply();
                });
            }
        }
    }]);
