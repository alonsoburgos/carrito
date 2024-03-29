(function() {
    'use strict';
    angular.module('core').directive('coppelHasFeedback', function() {
        return {
            
            link: function(scope, element, attrs, form) {
                var ngModelCtrl = form[attrs.coppelHasFeedback];
                var success = element.hasClass('form-control-feedback') ? 'glyphicon glyphicon-ok' : 'has-feedback has-success';
                var err = element.hasClass('form-control-feedback') ? 'glyphicon glyphicon-remove' : 'has-feedback has-error';
                
                scope.$watch(function() {
                    element.removeClass(success).removeClass(err);
                    if (ngModelCtrl.$invalid && ngModelCtrl.$dirty) {
                        element.removeClass(success).addClass(err);
                    } else if (ngModelCtrl.$valid && ngModelCtrl.$dirty && ngModelCtrl.$modelValue) {
                        element.removeClass(err).addClass(success);
                    }
                });
            },
            require: '^form',
            restrict: 'A',
            scope: true
        };
    });
})();
