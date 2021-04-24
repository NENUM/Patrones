let contenedorDomicilio = document.querySelector('.contenedor-domicilios'),
    totalCarrito = document.querySelector('#total'),
    vaciarCarrito = document.querySelector('#eliminarCarrito'),
    confirmarCarrito = document.querySelector('#confirmarCarrito');
let productos=[]
let productosCarrito=[]
const getProductos = () => {
    axios.get('http://localhost:18090/api/v1/carritoCompras')
    .then(response => {
        const respuestaProductos = response.data;
        productos = respuestaProductos
        console.log(respuestaProductos)
        render();
        let buttonEliminar = document.getElementById("buttonEliminar")
    })
     .catch(error => console.error(error));
    };
getProductos();
 
function render () {
    productosCarrito = []
    for (let i = 0; i <= 200; i++) {
            if(productos[i]){
            productosCarrito.push(productos[i])}
    }
    const productosRender = productosCarrito.map((producto)=>{
        return `<ul><div class="domicilios">
        <div class="imagenDomicilio">    
            <img src="${producto.imagen}"></img>
        </div>
        <div class="contenidoDomicilio">
            <li class="nombreProducto">${producto.nombre}</li>
            <li class"descripcionProducto">${producto.descripcion}</li>
            <li class="precioProducto">$${producto.precio}</li>
            <li class="cantidadProducto">Cantidad: <button class="bajarCantidad" >-<span class="icon-minus"></span></button><input class="productoCantidad" type="text" value="${producto.cantidad}" disabled><button class="subirCantidad" value="+">+<span class="icon-plus"></span></button></li>
            <button class="btn btn-outline-success" id="buttonEliminar">Eliminar<span class="icon-bin"></span></button>
        <div>
        </div></ul>`
    }).join("")
    contenedorDomicilio.innerHTML = productosRender
    bajarCantidadProducto()
    subirCantidadProducto()
    productosTotal();
    
}

function bajarCantidadProducto() {
    const bajarCantidad = document.querySelectorAll('.bajarCantidad');
    let productoCantidad = document.querySelectorAll('.productoCantidad');
    bajarCantidad.forEach(function(p,i){
        p.addEventListener('click',()=>{
            console.log('click')
            let nodo = productosCarrito[i].cantidad.toString();
            productosCarrito[i].cantidad += -1
            productoCantidad[i].value = nodo
            console.log(productosCarrito[i].cantidad.toString())
            axios({
                method: 'put',
                url: "http://localhost:18090/api/v1/carritoCompras",
                data:{
                    id:productosCarrito[i].idCarritoCompras, 
                    cantidad:productosCarrito[i].cantidad
                }
            })
            location.reload()
        })
    })
    
}

function subirCantidadProducto() {
    const subirCantidad = document.querySelectorAll('.subirCantidad');
    let productoCantidad = document.querySelectorAll('.productoCantidad');
    subirCantidad.forEach(function(p,i){
        p.addEventListener('click',()=>{
            console.log('click')
            let nodo = productosCarrito[i].cantidad.toString();
            productosCarrito[i].cantidad += +1
            productoCantidad[i].value = nodo
            console.log(productosCarrito[i].cantidad.toString())
            axios({
                method: 'put',
                url: "http://localhost:18090/api/v1/carritoCompras",
                data:{
                    id:productosCarrito[i].idCarritoCompras, 
                    cantidad:productosCarrito[i].cantidad
                }
            })
            location.reload()
        })
    })
    
}

function eliminarProducto(){

    if(buttonEliminar[0]){
        for (let i = 0; i < buttonEliminar.length; i++) {
            buttonEliminar[i].addEventListener("click",()=>{
                axios.delete(`http://localhost:18090/api/v1/carritoCompras/${productosCarrito[i].idCarritoCompras}`)
                getProductos()
                location.replace("#")
                location.reload()
            })
        }
    }
    else{
        buttonEliminar.addEventListener("click",()=>{
        for (let i = 0; i < productosCarrito.length; i++) {
                axios.delete(`http://localhost:18090/api/v1/carritoCompras/${productosCarrito[i].idCarritoCompras}`)
                getProductos()
                location.replace("#")
                location.reload()
            }
        })
    }
}
setTimeout(eliminarProducto,1000)

function productosTotal() {
    let total = 0
    for (let i = 0; i < productosCarrito.length; i++) {
        total += (productosCarrito[i].precio * productosCarrito[i].cantidad)
    }
    totalCarrito.innerHTML = `$${total}`
}

function limpiarCarrito() {
        console.log('click')
        if(productosCarrito[0]){
            for (let i = 0; i < buttonEliminar.length; i++) {
                axios.delete(`http://localhost:18090/api/v1/carritoCompras/${productosCarrito[i].idCarritoCompras}`)
                getProductos()
                location.replace("#")
                location.reload()
            }
        }
}
vaciarCarrito.addEventListener("click",limpiarCarrito)

function confirmarDomicilio(){
    if (new Date().getHours()>=22) {
        mostrarAlerta('Lo sentimos, no estamos en horario de atencion, nuestro horario de atencion es de Domingo a Domingo de 8 am a 9 pm', 'error')
    }
    else{
        if(productosCarrito[0]){
            axios.post("http://localhost:18090/api/v1/domicilio")
            .then(res => {
                productosCarrito = []
                getProductos()
                location.replace("#")
                location.reload()
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
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
confirmarCarrito.addEventListener("click",confirmarDomicilio)