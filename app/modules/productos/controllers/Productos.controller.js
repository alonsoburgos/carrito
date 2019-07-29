(function() {'use strict'; angular.module('productos').controller('Productos', ['Svproductos', '$scope', '$sce', function(Svproductos, $scope, $sce) {
            var vmProductos = this;
            vmProductos.productos = [];
            vmProductos.productoporagregar = {'nom_producto': '', 'imp_precio': '', 'num_existencia': ''};
            vmProductos.productoporeditar = {'idu_producto': '', 'nom_producto': '', 'imp_precio': '', 'num_existencia': ''};
            
            vmProductos.fun_consultaproductos = function(){
                vmProductos.sn_actualizandoproductos = true;
                Svproductos.fun_consultaproductos().then(function(response){
                    vmProductos.sn_actualizandoproductos = false;
                    vmProductos.productos = response.data.response;
                }, function(response){
                    vmProductos.sn_actualizandoproductos = false;
                    swal('Ooops!',response['data']['data']['userMessage'],'error');
                });
            }

            vmProductos.fun_agregaproducto = function(){
                Svproductos.fun_agregaproducto(vmProductos.productoporagregar).then(function(response){
                    vmProductos.fun_consultaproductos();
                    swal({ title: 'Genial!', text: 'El producto se guardo correctamente', type: 'success', showCloseButton: false, showCancelButton: false, confirmButtonText: 'Aceptar', confirmButtonColor: '#428bca', allowEnterKey:true });
                }, function(response){
                    swal('Ooops!',response['data']['data']['userMessage'],'error');
                });
            }

            vmProductos.fun_consultaeditarproducto = function(producto){
                vmProductos.productoporeditar.idu_producto = producto.idu_producto;
                vmProductos.productoporeditar.nom_producto = producto.nom_producto;
                vmProductos.productoporeditar.imp_precio = producto.imp_precio;
                vmProductos.productoporeditar.num_existencia = producto.num_existencia;
            }

            vmProductos.fun_actualizarproducto = function(){
                Svproductos.fun_editarproducto(vmProductos.productoporeditar).then(function(response){
                    vmProductos.fun_consultaproductos();
                    swal({ title: 'Genial!', text: 'El producto se guardo correctamente', type: 'success', showCloseButton: false, showCancelButton: false, confirmButtonText: 'Aceptar', confirmButtonColor: '#428bca', allowEnterKey:true });
                }, function(response){
                    swal('Ooops!',response['data']['data']['userMessage'],'error');
                });
            }

            angular.element(document).ready(function () {
                vmProductos.fun_consultaproductos();
            });
        }
    ]);
})();