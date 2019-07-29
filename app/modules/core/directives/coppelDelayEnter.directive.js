(function() {
    'use strict';
    
    /**
     * @ngdoc directive
     * @name core.coppelDelayEnter
     * @element attribute
     * @function
     *
     * @description
     * Agrega un delay con el keypress enter para alcanzar actualzar el modelo de datos.
     *
     * @example
       <input type="text" coppel-delay-enter="200" ng-model="datos.parametro">
    */

    angular.module('core').directive('coppelDelayEnter', [
        '$timeout',
        function(
            $timeout
        ) {
            return {
                link: function (scope, element, attrs, ngModelCtrl) {
                    element.bind('keydown keypress', function (event) {
                        if(event.which === 13) {
                            $timeout(attrs.coppelDelayEnter || 500);
                            if(ngModelCtrl.$modelValue !== undefined) {
                                scope.$apply(function () {
                                    scope.$eval(attrs.coppelDelayEnter);
                                });
                            }
                        }
                    });
                },
                require: '^?ngModel',
                restrict: 'A'
            };
        }
    ]);
})();
