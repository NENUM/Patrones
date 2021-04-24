let productosContainer = document.querySelector('#productos');
let buscarInput = document.querySelector('#buscarInput');
let buscarButton = document.getElementById("buscarButton");

let productos = []
let carritoProductos = []


const getProductos = () => {
    axios.get('http://localhost:18090/api/v1/producto')
    .then(response => {
        const respuestaProductos = response.data;
        console.log(`GET respuestaProductos`, respuestaProductos);
        productos = respuestaProductos
        render();
    })
     .catch(error => console.error(error));
    };
getProductos();

function render () {
    const productosRender = productos.map((producto)=>{
        return `<ul><div class="productosContainer">
        <div class="contenido-producto">
            <div class="imagenProducto"><img src="${producto.imagen}"></div>
            <li class="nombreProducto"><span>Nombre: </span>${producto.nombre}</li>
            <li class"descripcionProducto"><span>Descripcion: </span><br>${producto.descripcion}</li>
            <li class="precioProducto"><span>Precio: </span>$${producto.precio}</li>
            <button class="agregarCarro" id="buttonCarrito">Agregar <span class="icon-cart"></span></button>
        <div>
        </div></ul>`
    }).join("")
    productosContainer.innerHTML = productosRender
    agregarCarrito()
}

let contadorCarrito = 0;
function agregarCarrito() {
    const botonAgregar = document.querySelectorAll('.agregarCarro');
    botonAgregar.forEach(function(p, i){
        p.addEventListener('click', ()=>{
            console.log(productos[i])
            if (new Date().getHours()>=22) {
                mostrarAlerta('Lo sentimos, no estamos en horario de atencion, nuestro horario de atencion es de Domingo a Domingo de 8 am a 9 pm', 'error')
            }else{
                axios({
                    method: 'post',
                    url: 'http://localhost:18090/api/v1/carritoCompras',
                    data:{
                        producto:{
                        id:productos[i].id, 
                        nombre:productos[i].nombre,
                        precio:productos[i].precio,
                        descripcion:productos[i].descripcion,
                        imagen:productos[i].imagen,
                        unidad:{
                            id:productos[i].unidad.id,
                            unidad:productos[i].unidad.unidad
                        },
                        agrupacion:{
                            id:productos[i].unidad.id,
                            agrupacion:productos[i].agrupacion.agrupacion
                        }                   
                        },
                        cantidad:1
                    }
                })
                mostrarMensaje('Producto añadido al carrito','aprobado')
            }
        })
    })
}

function mostrarAlerta (mensaje, tipo){

    //Mostrar solo una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        return;
    }
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta')

    if (tipo==='error') {
        alerta.classList.add('error');
    }

    //Inyectar en el html
    const formulario = document.querySelector('.contenedor-alerta');
    formulario.appendChild(alerta);

    //Eliminiar la alerta
    setTimeout(()=>{
         alerta.remove();
    },3000);
}

function mostrarMensaje (mensaje, aprobado){
    const mensajePrevio = document.querySelector('.mensaje');
    if (mensajePrevio) {
        return;
    }
    const mensajeAprobado = document.createElement('DIV');
    mensajeAprobado.textContent=mensaje;
    mensajeAprobado.classList.add('mensaje')

    if (aprobado==='aprobado') {
        mensajeAprobado.classList.add('aprobado')
    }

    const formulario = document.querySelector('.contenedor-alerta');
    formulario.appendChild(mensajeAprobado);
    
    //Eliminiar la alerta
    setTimeout(()=>{
         mensajeAprobado.remove();
    },3000);
}

function buscarCoincidencia(){
    buscarButton.setAttribute("href",`buscar.html?palabra=${buscarInput.value}`)
}

buscarButton.onclick = buscarCoincidencia