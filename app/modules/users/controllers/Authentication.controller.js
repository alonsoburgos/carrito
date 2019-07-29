(function() {
    'use strict';
    angular.module('users').controller('Authentication', [
        '$scope',
        'Authentication',
        'Config',
        function(
          $scope,
          Authentication,
          Config
        ) {
            var vm = this;
            vm.amb = Config['ambiente'];
            vm.user = {};
            vm.alerts = [];
            
            vm.addAlert = function(msg) {
                vm.alerts.push(
                    {
                        msg: msg,
                        type: 'danger'
                    }
              );
            };

            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };

            vm.login = function() {
                Authentication.login(vm.user);
            };
        }
    ]);
})();
