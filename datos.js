document.addEventListener('DOMContentLoaded', () => {
            const baseDeDatos = [
                {
                    id: 1,
                    nombre: 'ARGOM ARG-AC-0343BK MANOS LIBRES BLUETOOTH PARA CARRO USB-C USB-A',
                    precio: 151.00,
                    imagen: './img/CARBTH-ARG-343N.jpg'
                },
                {
                    id: 2,
                    nombre: 'ARGOM AC-0112BK CARGADOR USB DE 2 PUERTOS PARA CARRO 1A/2.4A',
                    precio: 44.00,
                    imagen: './img/CARUSC-ARG-112.jpg'
                },
                {
                    id: 3,
                    nombre: 'ARGOM AC-0118BK CARGADOR USB-A Y USB-C PARA CARRO 36W 2A/1.5A',
                    precio: 57.00,
                    imagen: './img/CARUSC-ARG-118.jpg'
                },
                {
                    id: 4,
                    nombre: 'MANHATTAN 101721 CARGADOR USB DE 2 PUERTOS PARA CARRO 1A/2.1A',
                    precio: 68.00,
                    imagen: './img/CARUSC-MH-1721.jpg'
                },
                {
                    id: 5,
                    nombre: 'MANHATTAN 102414 CARGADOR USB 2 PUERTOS USB-C USB-A PARA CARRO 25W',
                    precio:156.00,
                    imagen:'./img/CARGUSC-MH-2414.jpg'
                },
                {
                    id:6,
                    nombre:'MANHATTAN 102063 CARGADOR USB DE 2 PUERTOS QC 42 W TOTAL PARA CARRO',
                    precio:182.00,
                    imagen:'./img/CARUSC-MH-2063.jpg'
                },
                {
                    id:7,
                    nombre:'ARGOM SOPORTE PARA CELULAR DE CARRO PARA REJILLA ARG-AC-0327BK NEGRO',
                    precio:26,
                    imagen:'./img/SOPCL-ARG-327N.jpg'
                },
                {
                    id:8,
                    nombre:'ARGOM SOPORTE PARA CELULAR DE CARRO PARA REJILLA ARG-AC-0328BK NEGRO',
                    precio:36,
                    imagen:'./img/SOPCL-ARG-328N.jpg',
                }

            ];
            let carrito = [];
            const Moneda = ' Q';
            const Productos = document.querySelector('#items');
            const Carrito = document.querySelector('#carrito');
            const Total = document.querySelector('#total');
            const Vaciar = document.querySelector('#boton-vaciar');
            const Productos2 = document.querySelector('#productos');
            const LocalS = window.localStorage;
            function CargarProductos() {
                baseDeDatos.forEach((info) => {
                    const ListaProdctos = document.createElement('div');
                    ListaProdctos.classList.add('card', 'col-sm-4');
                    const ListaProdctosTarjeta = document.createElement('div');
                    ListaProdctosTarjeta.classList.add('card-body');
                    const ListaProdctosTitulo = document.createElement('h5');
                    ListaProdctosTitulo.classList.add('card-title');
                    ListaProdctosTitulo.textContent = info.nombre;
                    const ListaProdctosImagen = document.createElement('img');
                    ListaProdctosImagen.classList.add('img-fluid');
                    ListaProdctosImagen.setAttribute('src', info.imagen);
                    const ListaProdctosPrecio = document.createElement('p');
                    ListaProdctosPrecio.classList.add('card-text');
                    ListaProdctosPrecio.textContent = `${info.precio}${Moneda}`;
                    const ListaProdctosBoton = document.createElement('button');
                    ListaProdctosBoton.classList.add('btn', 'btn-outline-success');
                    ListaProdctosBoton.textContent = 'Agregar';
                    ListaProdctosBoton.setAttribute('marcador', info.id);
                    ListaProdctosBoton.addEventListener('click', anyadirProductoAlCarrito);
                    ListaProdctosTarjeta.appendChild(ListaProdctosImagen);
                    ListaProdctosTarjeta.appendChild(ListaProdctosTitulo);
                    ListaProdctosTarjeta.appendChild(ListaProdctosPrecio);
                    ListaProdctosTarjeta.appendChild(ListaProdctosBoton);
                    ListaProdctos.appendChild(ListaProdctosTarjeta);
                    Productos.appendChild(ListaProdctos);
                });
            }

            function anyadirProductoAlCarrito(evento) {
                carrito.push(evento.target.getAttribute('marcador'))
                EjecutarCarrito();
                guardarCarritoEnLocalStorage();
            }

            function EjecutarCarrito() {
                Carrito.textContent = '';
                const carritoSinDuplicados = [...new Set(carrito)];
                carritoSinDuplicados.forEach((item) => {
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        return itemBaseDatos.id === parseInt(item);
                    });
                    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    const ListaProdctos = document.createElement('li');
                    ListaProdctos.classList.add('list-group-item', 'text-right', 'mx-2');
                    const miImagen = document.createElement('img');
                    miImagen.setAttribute('src', miItem[0].imagen);
                    ListaProdctos.textContent = ` ${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${Moneda}`;
                    const miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-outline-success', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.dataset.item = item;
                    miBoton.addEventListener('click', borrarItemCarrito);
                    ListaProdctos.appendChild(miBoton);
                    Carrito.appendChild(ListaProdctos);
                });
                Total.textContent = calcularTotal();
            }
            function borrarItemCarrito(evento) {
                const id = evento.target.dataset.item;
                carrito = carrito.filter((carritoId) => {
                    return carritoId !== id;
                });
                EjecutarCarrito();
                guardarCarritoEnLocalStorage();

            }
            function calcularTotal() {
                return carrito.reduce((total, item) => {
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        return itemBaseDatos.id === parseInt(item);
                    });
                    return total + miItem[0].precio;
                }, 0).toFixed(2);
            }
            function vaciarCarrito() {
                carrito = [];
                EjecutarCarrito();
                localStorage.clear();
            }

            function guardarCarritoEnLocalStorage () {
                LocalS.setItem('carrito', JSON.stringify(carrito));
            }
            function CargarCarritoDeLocalStorage () {
                if (LocalS.getItem('carrito') !== null) {
                    carrito = JSON.parse(LocalS.getItem('carrito'));
                }
            }
            Vaciar.addEventListener('click', vaciarCarrito);
            CargarCarritoDeLocalStorage();
            CargarProductos();
            EjecutarCarrito();

        });