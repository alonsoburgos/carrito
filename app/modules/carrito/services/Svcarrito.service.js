(function() {
    'use strict';
    angular.module('carrito').factory('Svcarrito', ['$http','$q','Config', function($http,$q,Config) {
            
            var fun_consultaproductos = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/fun_consultaproductos/',
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

            var fun_consultaproductoscarrito = function(idu_usuario) {
                return $http({
                    method: 'GET',
                    url: Config.api + '/fun_consultaproductoscarrito/'+idu_usuario,
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

            var fun_agregaproductoacarrito = function(parametros) {
                return $http({
                    method: 'POST',
                    url: Config.api + '/fun_agregaproductoacarrito/',
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

            var fun_eliminaproductodelcarrito = function(parametros) {
                return $http({
                    method: 'DELETE',
                    url: Config.api + '/fun_eliminaproductodelcarrito/',
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

            var fun_eliminacarrito = function(parametros) {
                return $http({
                    method: 'DELETE',
                    url: Config.api + '/fun_eliminacarrito/',
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

            var fun_comprar = function(parametros) {
                return $http({
                    method: 'POST',
                    url: Config.api + '/fun_comprar/',
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
                fun_consultaproductos:            fun_consultaproductos,
                fun_consultaproductoscarrito:     fun_consultaproductoscarrito,
                fun_agregaproductoacarrito:       fun_agregaproductoacarrito,
                fun_eliminaproductodelcarrito:    fun_eliminaproductodelcarrito,
                fun_eliminacarrito:               fun_eliminacarrito,
                fun_comprar:                      fun_comprar
            };
        }
    ]);
})();
