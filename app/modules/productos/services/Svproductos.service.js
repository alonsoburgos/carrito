(function() {
    'use strict';
    angular.module('productos').factory('Svproductos', ['$http','$q','Config', function($http,$q,Config) {
            
            var fun_consultaproductos = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/fun_consultaproductosabc/',
                    //data:parametros,
                }).then(
                    function(response) {
                        return response.data;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var fun_agregaproducto = function(parametros) {
                return $http({
                    method: 'POST',
                    url: Config.api + '/fun_agregaproducto/',
                    data:parametros,
                }).then(
                    function(response) {
                        return response.data;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var fun_editarproducto = function(parametros) {
                return $http({
                    method: 'POST',
                    url: Config.api + '/fun_editarproducto/',
                    data:parametros,
                }).then(
                    function(response) {
                        return response.data;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            // Public API
            return {
                fun_consultaproductos:      fun_consultaproductos,
                fun_agregaproducto:         fun_agregaproducto,
                fun_editarproducto:         fun_editarproducto
            };
        }
    ]);
})();
