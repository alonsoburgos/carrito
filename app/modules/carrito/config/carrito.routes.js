(function() {
    'use strict';
    //Setting up route
    angular.module('carrito').config([
        '$stateProvider',
        function($stateProvider) {
            // Conciliacion state routing
            $stateProvider.state('app.carrito', {
                ncyBreadcrumb: {
                    label: 'Carrito'
                },
                url: '/carrito',
                views: {
                    'content@app': {
                        controller: 'Carrito',
                        controllerAs: 'vmCarrito',
                        templateUrl: '/app/modules/carrito/views/carrito.view.html'
                    }
                }
            });
        }
    ]);
})();
