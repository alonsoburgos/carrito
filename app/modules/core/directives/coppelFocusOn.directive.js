(function() {
    'use strict';
    angular.module('core').directive('coppelFocusOn', function() {
        return function(scope, elem, attr) {
            scope.$on('coppelFocusOn', function(e, name) {
                if (name === attr.coppelFocusOn) {
                    elem[0].focus();
                    if (attr.type === 'text') {
                        elem[0].select();
                    }
                }
            });
        };
    });
})();
