(function() {'use strict'; angular.module('carrito').controller('Carrito', ['Svcarrito', '$scope', 'Authentication', function(Svcarrito, $scope, Authentication) {
            var vmCarrito = this;
            vmCarrito.productos = [];
            vmCarrito.productoscarrito = [];
            vmCarrito.totalcarrito = 0;
            vmCarrito.usuario = Authentication.currentUser();
            vmCarrito.sn_actualizandoproductos = false;
            vmCarrito.sn_actualizandocarrito = false;
            
            vmCarrito.fun_consultaproductos = function(){
                vmCarrito.sn_actualizandoproductos = true;
                Svcarrito.fun_consultaproductos().then(function(response){
                    vmCarrito.sn_actualizandoproductos = false;
                    vmCarrito.productos = response.data.response;
                }, function(response){
                    vmCarrito.sn_actualizandoproductos = false;
                    swal('Ooops!',response['data']['data']['userMessage'],'error');
                });
            }

            vmCarrito.fun_consultaproductoscarrito = function(){
                vmCarrito.sn_actualizandocarrito = true;
                Svcarrito.fun_consultaproductoscarrito(vmCarrito.usuario.idu_usuario).then(function(response){
                    vmCarrito.sn_actualizandocarrito = false;
                    vmCarrito.productoscarrito = response.data.response;
                    vmCarrito.totalcarrito = 0;
                    vmCarrito.productoscarrito.forEach(function(element) {
                        vmCarrito.totalcarrito =  vmCarrito.totalcarrito + parseInt(element.imp_totalproducto);
                    }, this);
                }, function(response){
                    vmCarrito.sn_actualizandocarrito = false;
                    swal('Ooops!',response['data']['data']['userMessage'],'error');
                });
            }

            vmCarrito.fun_agregaproductoacarrito = function(opc_agregaproducto, producto){
                if(opc_agregaproducto == 1){
                    var sn_existeencarrito = false;
                    for (var i = 0; i < vmCarrito.productoscarrito.length; i++) {
                        if (vmCarrito.productoscarrito[i].idu_producto == producto.idu_producto){
                            producto.num_cantidad = vmCarrito.productoscarrito[i].num_cantidad + 1
                            sn_existeencarrito = true;
                            break;
                        }
                    }
                    if(!sn_existeencarrito){
                        producto.num_cantidad = 1;
                    }
                }
                if(producto.num_cantidad == 0){
                    producto.num_cantidad = 1;
                }
                if(producto.num_cantidad != null){
                    var obj = {'idu_usuario': vmCarrito.usuario.idu_usuario, 'idu_producto': producto.idu_producto, 'num_cantidad': producto.num_cantidad}
                    Svcarrito.fun_agregaproductoacarrito(obj).then(function(response){
                        var sn_existe = response.data.response;
                        if(!sn_existe){
                            swal({
                                title: 'Advertencia',
                                type: 'info',
                                text: 'No existen suficientes '+producto.nom_producto+' en inventario.',
                                showCloseButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#428bca',
                                allowEnterKey: true
                            });
                        }
                        vmCarrito.fun_consultaproductoscarrito();
                    }, function(response){
                        swal('Ooops!',response['data']['data']['userMessage'],'error');
                    });
                }
            }

            vmCarrito.fun_eliminaproductodelcarrito = function(idu_usuario, idu_producto){
                var obj = {'idu_usuario': idu_usuario, 'idu_producto': idu_producto}
                Svcarrito.fun_eliminaproductodelcarrito(obj).then(function(response){
                    vmCarrito.fun_consultaproductoscarrito();
                }, function(response){
                    swal('Ooops!',response['data']['data']['userMessage'],'error');
                });
            }

            vmCarrito.fun_eliminacarrito = function(){
                swal({
                    title: "¿Seguro que desea cancelar la compra?",
                    text: "Se eliminarán los productos del carrito.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DF0101",
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: false,
                },
                function(isConfirm){
                    if(isConfirm)
                    {
                        var obj = {'idu_usuario': vmCarrito.usuario.idu_usuario}
                        Svcarrito.fun_eliminacarrito(obj).then(function(response){
                            vmCarrito.fun_consultaproductoscarrito();
                        });
                    }
                });
            }

            vmCarrito.fun_comprar = function(){
                swal({
                    title: "¿Seguro que desea comprar los productos añadidos al carrito?",
                    text: "",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#87b87f",
                    confirmButtonText: "Comprar",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: false,
                },
                function(isConfirm){
                    if(isConfirm)
                    {
                        Svcarrito.fun_comprar(vmCarrito.productoscarrito).then(function(response){
                            if(response.data.response){
                                swal({ title: 'Genial!', text: 'Su compra se realizó con exito', type: 'success', showCloseButton: false, showCancelButton: false, confirmButtonText: 'Aceptar', confirmButtonColor: '#428bca', allowEnterKey:true });
                                vmCarrito.fun_consultaproductos();
                                vmCarrito.fun_consultaproductoscarrito();
                            }
                            else if(!response.data.response){
                                vmCarrito.fun_consultaproductos();
                                swal({ title: 'Aviso!', text: 'Uno o mas productos ya no tiene la cantidad en existencia', type: 'info', showCloseButton: false, showCancelButton: false, confirmButtonText: 'Aceptar', confirmButtonColor: '#428bca', allowEnterKey:true });
                            }
                        }, function(response){
                            swal('Ooops!',response['data']['data']['userMessage'],'error');
                        });
                    }
                });
            }

            angular.element(document).ready(function () {
                vmCarrito.fun_consultaproductos();
                vmCarrito.fun_consultaproductoscarrito();
            });
        }
    ]);
})();