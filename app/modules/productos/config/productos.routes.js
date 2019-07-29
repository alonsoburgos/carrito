(function() {
    'use strict';
    //Setting up route
    angular.module('productos').config([
        '$stateProvider',
        function($stateProvider) {
            // Conciliacion state routing
            $stateProvider.state('app.productos', {
                ncyBreadcrumb: {
                    label: 'Productos'
                },
                url: '/productos',
                views: {
                    'content@app': {
                        controller: 'Productos',
                        controllerAs: 'vmProductos',
                        templateUrl: '/app/modules/productos/views/productos.view.html'
                    }
                }
            });
        }
    ]);
})();
