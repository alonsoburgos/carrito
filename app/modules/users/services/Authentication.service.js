(function() {
    'use strict';
    angular.module('users').service('Authentication', [
        '$http',
        '$q',
        '$rootScope',
        '$state',
        'Config',
        'growl',
        'localStorageService',
        'requestHuella',
        function(
            $http,
            $q,
            $rootScope,
            $state,
            Config,
            growl,
            localStorageService,
            requestHuella
        ) {
            var _this = this;
            var setAuthenticationData = function (user, tokenId) {
                _this.user = user;
                _this.accessToken = tokenId;

                localStorageService.set('user', user);
                localStorageService.set('access_token', tokenId);
               
                if($rootScope.returnToState){
                    $state.go($rootScope.returnToState);
                }else{
                   $state.go('app.carrito');
                }
                
                $rootScope.$broadcast('autoLogIn');
            };
            var unsetAuthenticationData = function() {
                _this.user = null;
                _this.accessToken = null;
                localStorageService.remove('user', 'access_token');
                $state.go('login');
            };

            _this.user = localStorageService.get('user');
            _this.accessToken = localStorageService.get('access_token');

            this.login = function(_credentials) {
                $rootScope.opc_logeando = false;
                _credentials.token = Math.floor(Math.random() * 1000);
                $rootScope.txt_proceso  = 'Validando datos ingresados';
                $http({
                        method: 'POST',
                        url: Config.api + '/fun_login',
                        data: _credentials
                }).then(
                    function(_response) {
                        if(_response.data.data.response[0].idu_usuario != 0){
                            $rootScope.opc_logeando = false;
                            _credentials.idu_usuario = _response.data.data.response[0].idu_usuario;
                            _credentials.nom_usuario = _response.data.data.response[0].nom_usuario;
                            setAuthenticationData(_credentials, _credentials.token);
                        }
                        else{
                            swal('Algo Salió Mal!', 'Favor de verificar su email o contraseña.', "error");
                        }
                    },
                    function(_er) {                              
                        unsetAuthenticationData();
                        $rootScope.opc_logeando = false;
                        swal('Algo Salió Mal!', 'Favor de contactar al administrador.', "error");
                    }
                );
            };
            
            

            this.logout = function() {
                unsetAuthenticationData();
            };

            this.isAuth = function() {
                if (localStorageService.get('access_token')) {
                    return true;
                } else {
                    return false;
                }
            };
            this.currentUser = function() {
                return localStorageService.get('user');
            };
        }
    ]);
})();
