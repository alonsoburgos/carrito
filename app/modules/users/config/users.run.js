(function() {
    'use strict';
    angular.module('users').run([
        '$rootScope',
        '$state',
        '$timeout',
        'Authentication',
        'growlMessages',
        function(
            $rootScope,
            $state,
            $timeout,
            Authentication,
            growlMessages
        ) {
            var stateChangeSuccessIgnored = '';
            var stateChangeStartIgnored = '';

            stateChangeStartIgnored = $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
                if(!Authentication.isAuth() && toState.name !== 'login') {
                    $rootScope.returnToState = toState.name;
                    $rootScope.returnToStateParams = toParams;
                    Authentication.logout();
                    event.preventDefault();
                }
                if(toState.name === 'login' && Authentication.isAuth() === true) {
                    $state.go('app.carrito');
                    event.preventDefault();
                }
            });
           
            stateChangeSuccessIgnored = $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                $timeout(function() {
                    if(Authentication.isAuth()) {
                        $rootScope.$broadcast('autoLogIn');
                    }
                    $rootScope.$broadcast('menuRefresh', {state: toState});
                });
                growlMessages.destroyAllMessages();
                event.preventDefault();
            });
            
            return false;
        }
    ]);
})();
