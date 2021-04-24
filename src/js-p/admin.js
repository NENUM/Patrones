//Formularios
function formularioAñadir (){
    document.querySelector('.boton-Añadir').addEventListener('click', function(){
        document.querySelector('.popup').style.display = "flex";
        document.querySelector('#añadirProducto').style.display="flex";
        document.querySelector('#editarProducto').style.display="none";        limpiar();
        });
    document.querySelector('.close').addEventListener('click', function(){
            document.querySelector('.popup').style.display = "none";
           });
}
formularioAñadir();
//Mensaje de carga
window.addEventListener('load', ()=>{
    mostrarInfo('Recuerda actualizar los productos','aprobado')
})

//Variables globales
let nombreProducto = document.querySelector('#nombreProducto'),
        precioProducto = document.querySelector('#precioProducto'),
        descripcionProducto =document.querySelector('#descripcionProducto'),
        imagenProducto = document.querySelector('#imagenProducto'),
        cantidadProducto = document.querySelector('#cantidadProducto'),
        categoriaProducto = document.querySelector('#categoriaProducto'),
        unidadProducto = document.querySelector('#unidadProducto'),
        bañadirProducto = document.querySelector('#añadirProducto'),
        beditarProducto = document.querySelector('#editarProducto'),
        idProducto = document.querySelector('#idProducto');

//Mostrar productos
let productosContainer = document.querySelector('#productos');

let productos = []


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
            <div class="imagenProducto"><img src="https://image.freepik.com/vector-gratis/cartel-fondo-composicion-bayas-frutas_1284-20046.jpg"></div>
            <li class="nombreProducto"><span>Nombre: </span>${producto.nombre}</li>
            <li class"descripcionProducto"><span>Descripcion: </span><br>${producto.descripcion}</li>
            <li class="precioProducto"><span>Precio: </span>$${producto.precio}</li>
            <div class='botonesEditar'>
            <a href="#" class="buttonEditar" id="btEditar">Editar</a>
            <a href="#" class="buttonEliminar" id="btEliminar">Eliminar</a>
            </div>
        <div>
        </div></ul>`
    }).join("")
    productosContainer.innerHTML = productosRender
    botones();
}
//->Fin mostrar productos
function botones(){
    const botonEditar = document.querySelectorAll('.buttonEditar');
    const botonEliminar = document.querySelectorAll('.buttonEliminar');
    botonEditar.forEach(function(p){  
        p.addEventListener('click', function(){
            document.querySelector('.popup').style.display = "flex";
            document.querySelector('#añadirProducto').style.display="none";
            document.querySelector('#editarProducto').style.display="flex";
            fillForm();
            }
            );
      });
      for (let i = 0; i < botonEliminar.length; i++) {
        botonEliminar[i].addEventListener("click",()=>{
            console.log(`diste click en el boton ${productos[i].id}`)
            axios.delete(`http://localhost:18090/api/v1/producto/${productos[i].id}`)
            location.reload()
        })
    }
    document.querySelector('.close').addEventListener('click', function(){
            document.querySelector('.popup').style.display = "none";
           });
}

function fillForm(){
    const botonEditar = document.querySelectorAll('.buttonEditar')
    for (let i = 0; i < botonEditar.length; i++) {
        botonEditar[i].addEventListener("click",()=>{
            idProducto.value = productos[i].id
            nombreProducto.value = productos[i].nombre
            precioProducto.value = productos[i].precio
            descripcionProducto.value = productos[i].descripcion
            imagenProducto.value = productos[i].imagen
            cantidadProducto.value = productos[i].cantidad
            categoriaProducto.value = productos[i].agrupacion.agrupacion
            unidadProducto.value = productos[i].unidad.unidad
            console.log(productos[i].agrupacion.agrupacion.value)
            console.log(productos[i].unidad.unidad)
        })
    }
}


function añadirProducto(e) {
    
    e.preventDefault();
    if (nombreProducto.value==='' || precioProducto.value==='' || cantidadProducto.value==='' || descripcionProducto.value==='' || imagenProducto.value==='' || unidadProducto.value==='Seleccionar:' || categoriaProducto==='Seleccionar:') {
        mostrarAlerta('Diligencie todos los campos', 'error');
    }else{
        axios({
            method: 'post',
            url: 'http://localhost:18090/api/v1/producto',
            data: {
                nombre:nombreProducto.value,
                precio:precioProducto.value,
                cantidad:cantidadProducto.value,
                descripcion:descripcionProducto.value,
                imagen:imagenProducto.value,
                unidad:{"id":getUnidad(unidadProducto.value),"unidad":unidadProducto.value},
                agrupacion:{"id":getCategoria(categoriaProducto.value),"agrupacion":categoriaProducto.value}
            }
          });
          limpiar();
        mostrarMensaje('Producto añadido', 'aprobado');
        
    }
    location.reload();
}
bañadirProducto.onclick = añadirProducto

function editarProducto(e){
    e.preventDefault();
    if (nombreProducto.value==='' || precioProducto.value==='' || cantidadProducto.value==='' || descripcionProducto.value==='' || imagenProducto.value==='' || unidadProducto.value==='Seleccionar:' || categoriaProducto==='Seleccionar:') {
        mostrarAlerta('Diligencie todos los campos', 'error');
    }else{
        axios({
            method: 'put',
            url: 'http://localhost:18090/api/v1/producto',
            data: {
                id: idProducto.value, 
                nombre:nombreProducto.value,
                precio:precioProducto.value,
                cantidad:cantidadProducto.value,
                descripcion:descripcionProducto.value,
                imagen:imagenProducto.value,
                unidad:{"id":getUnidad(unidadProducto.value),"unidad":unidadProducto.value},
                agrupacion:{"id":getCategoria(categoriaProducto.value),"agrupacion":categoriaProducto.value}
            }
          });
          limpiar();
        mostrarMensaje('Producto editado', 'aprobado');
        location.reload();
    }
}
beditarProducto.onclick = editarProducto

function elminarProducto(){
    console.log(butt)
}

function validarNombre(){
    nombreProducto.addEventListener('input', e=>{
        const txtNombre = e.target.value.trim();
        if (txtNombre ==='' || txtNombre.length>30) {
            mostrarAlerta('El nombre ingresado no es valido', 'error');
            nombreProducto.value="";
        }else{
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
        }
    })
}
validarNombre();

function validarPrecio(){
    precioProducto.addEventListener('input', e=>{
        const txtPrecio = e.target.value;
        if (txtPrecio ==='' || txtPrecio.value<1) {
            mostrarAlerta('valor ingresado no valido', 'error');
            precioProducto.value="";
        }else{
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
        }
    })
}
validarPrecio();

function validarDescripcion(){
    descripcionProducto.addEventListener('input', e=>{
        const txtDescripcion = e.target.value.trim();
        if (txtDescripcion==='' || txtDescripcion.value>100) {
            mostrarAlerta('Descripcion ingresada no valida', 'error')
            descripcionProducto.value='';
        }else{
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
        }
    })
}
validarDescripcion();

function validarCantidad(){
    cantidadProducto.addEventListener('input', e=>{
        const txtCantidad = e.target.value;
        if (txtCantidad ==='' || txtCantidad.value<1) {
            mostrarAlerta('valor ingresado no valido', 'error');
            cantidadProducto.value="";
        }else{
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
        }
    })
}
validarCantidad();

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
    const formulario = document.querySelector('.pop-formulario');
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

    const formulario = document.querySelector('.pop-formulario');
    formulario.appendChild(mensajeAprobado);
    
    //Eliminiar la alerta
    setTimeout(()=>{
         mensajeAprobado.remove();
    },3000);
}

function mostrarInfo (mensaje, aprobado){
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

    const formulario = document.querySelector('.alerta-producto');
    formulario.appendChild(mensajeAprobado);
    
    //Eliminiar la alerta
    setTimeout(()=>{
         mensajeAprobado.remove();
    },3000);
}

function limpiar(){
    idProducto.value="";
    nombreProducto.value="";
    precioProducto.value="";
    cantidadProducto.value="";
    descripcionProducto.value="";
    imagenProducto.value="";
    categoriaProducto.value ="Seleccionar:";
    unidadProducto.value ="Seleccionar:";
}

// Obtner la unidad de un producto
function getUnidad(unidadProducto) {
    let value
    if(unidadProducto === "unidad"){
        value = 1
    }
    else {
        value = 2
    }
    return value
}

// Obtener la categoria de un produtco
function getCategoria(categoriaProducto) {
    let value
    if(categoriaProducto === "frutas"){
        value = 1
    }
    else if(categoriaProducto === "verduras"){
        value = 2
    }
    else if(categoriaProducto === "carnes"){
        value = 3
    }
    else if(categoriaProducto === "aseo"){
        value = 4
    }
    else if(categoriaProducto === "snacks"){
        value = 5
    }
    return value
}