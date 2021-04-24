function verDetalle(){
    let acc = document.getElementsByClassName('accordion')
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function(){
        console.log('click')
        this.classList.toggle('active');
        //var panel = this.nextElementSibling;
        let panel = document.querySelectorAll('.panel')
        if (panel[i].style.display==="block") {
            panel[i].style.display="none"
        }else{
            panel[i].style.display = "block"
        }
    })
    
}
}

function verDetalleEnviado(){
    let acc = document.getElementsByClassName('accordionEnviado')
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function(){
        console.log('click')
        this.classList.toggle('active');
        //var panel = this.nextElementSibling;
        let panel = document.querySelectorAll('.panelEnviado')
        if (panel[i].style.display==="block") {
            panel[i].style.display="none"
        }else{
            panel[i].style.display = "block"
        }
    })
    
}
}

let contenedorDomicilios = document.querySelector('.listado-domicilios'),
    contenedorDomiciliosEnviado = document.querySelector('.listado-domiciliosEnviados'),
    panelDetalle = document.querySelector('.panel');

let domicilios=[]
let domiciliosEnviados=[]
let detalleDomicilio =[]





const getDomiciliosRecibido = () => {
    axios.get('http://localhost:18090/api/v1/domicilio/pendiente')
    .then(response => {
        const respuestaDomiciliosRecibidos = response.data;
        console.log(`GET respuestaDomiciliosRecibidos`, respuestaDomiciliosRecibidos);
        domicilios = respuestaDomiciliosRecibidos
        render();
        verDetalle();
        getDetalleRecibido();
    })
     .catch(error => console.error(error));
    };
    getDomiciliosRecibido();

function render () {
    const domiciliosRender = domicilios.map((domicilio)=>{
        return `
        <div class="domiciliosContainer">
        <button>
        <div class="contentDomicilio accordion">
        <p class="fechaDomicilio">Fecha: ${domicilio.fecha}</p>
        <p class="precioDomicilio">Precio: $${domicilio.valor}</p>
        </div>
        </button>
        <div class="panel">
            <p>Aqui va la informacion</p>
            <button class="btn btn-outline-success" id="actualizarEstado">Actualizar <span class=""></span></button>
        </div>
        </div>`
    }).join("")
    contenedorDomicilios.innerHTML = domiciliosRender
}
////////////////////////Obtener Detalle
const getDetalleRecibido = () => {
    console.log('ver')
    axios.get(`http://localhost:18090/api/v1/domicilio/detalle/1`)
    .then(response => {
        const respuestaDomicilio = response.data;
        console.log(respuestaDomicilio)


            listaProductosRender = respuestaDomicilio.map((producto)=>{
                return `<tr>
                <td>${producto.fecha}</td>
                </tr>`
            }).join("")

        
        panelDetalle.innerHTML = listaProductosRender
    })
    .catch(error => console.error(error));
    }
////////////////////////Fin Obtener Detalle
const getDomiciliosEnviado = () => {
    axios.get('http://localhost:18090/api/v1/domicilio/enviado')
    .then(response => {
        const respuestaDomiciliosEnviados = response.data;
        console.log(`GET respuestaDomiciliosEnviados`, respuestaDomiciliosEnviados);
        domiciliosEnviados = respuestaDomiciliosEnviados
        renderEnviados();
        verDetalleEnviado();
    })
     .catch(error => console.error(error));
    };
    getDomiciliosEnviado();

function renderEnviados () {
    const domiciliosEnviadosRender = domiciliosEnviados.map((domicilio)=>{
        return `
        <div class="domiciliosContainer">
        <button>
        <div class="contentDomicilio accordionEnviado">
        <p class="fechaDomicilio">Fecha: ${domicilio.fecha}</p>
        <p class="precioDomicilio">Precio: $${domicilio.valor}</p>
        </div>
        </button>
        <div class="panelEnviado">
            <p>Aqui va la informacion</p>
            <button class="btn btn-outline-success" id="actualizarEstado">Actualizar <span class=""></span></button>
        </div>
        </div>`
    }).join("")
    contenedorDomiciliosEnviado.innerHTML = domiciliosEnviadosRender

}
