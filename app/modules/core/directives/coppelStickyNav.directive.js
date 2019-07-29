'use strict';
angular.module('core').directive('coppelStickyNav', [
    '$window',
    function (
        $window
    ) {
        return {
            link: function(scope, element) {
                var w = angular.element($window);
                var size = element[0].clientHeight;
                var top = 0;
                var toggleStickyNav = function () {
                  
                    if (!element.hasClass('display') && $window.pageYOffset > top + size) {
                        element.addClass('display');
                    } else if (element.hasClass('display') && $window.pageYOffset <= top + size) {
                        element.removeClass('display');
                    }
                };
              
                w.bind('scroll', toggleStickyNav);
            },
            restrict: 'A',
            scope: {}
            
        };
    }
]);
