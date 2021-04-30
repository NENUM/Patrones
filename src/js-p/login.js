document.getElementById("btn__registrarse").addEventListener("click", register);
document.getElementById("btn__iniciar_sesion").addEventListener("click", iniciarSesion);
window.addEventListener("resize", anchoPagina);


//Declaración de variables

const contenedor_login_register = document.querySelector(".contenedor__login-register");
const formulario_login = document.querySelector(".formulario__login");
const formulario_register = document.querySelector(".formulario___register");
const caja_trasera_login = document.querySelector(".caja__trasera-login");
const caja_trasera_register = document.querySelector(".caja__trasera-register");
const nombre = document.querySelector("#nombre")
const correo = document.querySelector("#correo")
const direccion = document.querySelector("#direccion")
const barrio = document.querySelector("#barrio")
const celular = document.querySelector("#celular")
const contraseña = document.querySelector("#contraseña")
const usuario = document.querySelector("#usuario")
const usuario_login = document.querySelector("#usuario_login")
const usuario_contraseña = document.querySelector("#usuario_contraseña")
const registrarse = document.querySelector("#btn2__registrarse")
const entrar = document.querySelector("#btn_login")


function registrarUsuario(e) {
    
     e.preventDefault();
     
     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
     if (nombre.value==='' || correo.value==='' || direccion.value==='' || barrio.value==='' || celular.value==='' || contraseña.value==='') {
         mostrarAlerta('Diligencie todos los campos', 'error');
     }
     else if(isNaN(celular.value)){
          mostrarAlerta("Por favor ingrese un número entero como numero.", "error")
      }
      else if(celular.value.length != 10) {
          mostrarAlerta("El número de celular debe tener 10 dígitos", "error")
      }
      else if(direccion.value.length > 30) {
          mostrarAlerta("No se permiten direcciones con mas de 30 caracteres.", "error")
      }
      else if(contraseña.value.length < 8) {
          mostrarAlerta("No se permiten contraseñas con menos de 8 caracteres.", "error")
      }
      else if(usuario.value.length > 60) {
          mostrarAlerta("No se permiten nombres con mas de 60 caracteres.", "error")
      }
      else if(barrio.value.length > 25) {
          mostrarAlerta("No se permiten nombres de barrios con mas de 25 caracteres.", "error")
      }
      if (!emailRegex.test(correo.value)) {
     
          mostrarAlerta("El correo no es válido.", "error")
      }
     else{
        
         axios({
             method: 'post',
             url: 'http://localhost:18090/api/v1/usuario',
             data: {
                 nombre:nombre.value,
                 usuario:usuario.value,
                 correo:correo.value,
                 direccion:direccion.value,
                 barrio:barrio.value,
                 telefono:celular.value,
                 password:contraseña.value,
                 
             }
           });
           
         mostrarMensaje('Usuario', 'aprobado');
         
     }
    
 }
 registrarse.onclick = registrarUsuario
 function limpiar(){
     nombre.value="";
     usuario.value="";
     correo.value="";
     direccion.value="";
     barrio.value="";
     celular.value="";
     contraseña.value ="";
     
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
 
     const formulario = document.querySelector('.contenedor__login-register');
     formulario.appendChild(mensajeAprobado);
     
     //Eliminiar la alerta
     setTimeout(()=>{
          mensajeAprobado.remove();
     },3000);
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
     formulario_register.appendChild(alerta);
 
     //Eliminiar la alerta
     setTimeout(()=>{
          alerta.remove();
     },3000);
 }
 function mostrar (mensaje, tipo){

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
     formulario_login.appendChild(alerta);
 
     //Eliminiar la alerta
     setTimeout(()=>{
          alerta.remove();
     },3000);
 }
 function obtenerUsuario(){
     return usuario = location.search.replace("?","").split("=")[1]
 }
 
 const getUsuarios = (e) => {
     e.preventDefault();
     axios.post('http://localhost:18090/api/v1/usuario/login', 
        params={
            usuario:usuario_login.value,
            password:usuario_contraseña.value
          
       
        })
         
         
         

     
     .then(response => {
         const respuestaUsuario = response.data;
         console.log(`GET respuestaUsuario`, respuestaUsuario);
        // validar(respuestaUsuario)
         if(!respuestaUsuario){
             console.log("el usuario")

         }else{
             validar(respuestaUsuario.rol)
         }
         
     })
      .catch(error => console.error(error));
      

     };

 entrar.onclick = getUsuarios

 function validar(rol){
       if(rol==="USUARIO"){
           location.href="../../productos.html"
       }else{
           location.href="../../adm_productos.html"
       }
 }


function anchoPagina(){
     if(window.innerWidth > 850){
          caja_trasera_login.style.display = "block";
          caja_trasera_register.style.display = "block";
     }else{
          caja_trasera_register.style.display = "block";
          caja_trasera_register.style.opacity = "1";
          caja_trasera_login.style.display = "none";
          formulario_login.style.display = "block";
          formulario_register.style.display = "none";
          contenedor_login_register.style.left = "0px";          
     }
}

anchoPagina();

function iniciarSesion(){
     if(window.innerWidth > 850){
          formulario_register.style.display = "none";
          contenedor_login_register.style.left = "10px";
          formulario_login.style.display = "block";
          caja_trasera_register.style.opacity = "1";
          caja_trasera_login.style.opacity = "0";   
     }else{
          formulario_register.style.display = "none";
          contenedor_login_register.style.left = "0px";
          formulario_login.style.display = "block";
          caja_trasera_register.style.display = "block";
          caja_trasera_login.style.display = "none";

     }
     
}
function register(){
     if(window.innerWidth > 850){
     formulario_register.style.display = "block";
     contenedor_login_register.style.left = "410px";
     formulario_login.style.display = "none";
     caja_trasera_register.style.opacity = "0";
     caja_trasera_login.style.opacity = "1";
     }else{
     formulario_register.style.display = "block";
     contenedor_login_register.style.left = "0px";
     formulario_login.style.display = "none";
     caja_trasera_register.style.display = "none";
     caja_trasera_login.style.display = "block";
     caja_trasera_login.style.opacity = "1";
     }
}
 