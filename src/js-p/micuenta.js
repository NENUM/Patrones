




const nombre = document.querySelector("#nombre")
const correo = document.querySelector("#correo")
const direccion = document.querySelector("#direccion")
const barrio = document.querySelector("#barrio")
const celular = document.querySelector("#celular")
const contraseña = document.querySelector("#contraseña")
const usuario = document.querySelector("#usuario")
const usuario_login = document.querySelector("#usuario_login")
const usuario_contraseña = document.querySelector("#usuario_contraseña")
const modificar = document.querySelector("#btn2__modificar")





function modificarUsuario(e) {
    
    e.preventDefault();
    
    
       
        axios({
            method: 'put',
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
          
        mostrarMensaje('Usuario', 'modificado');
        
    }


modificar.onclick = modificarUsuario
function limpiar(){
    nombre.value="";
    usuario.value="";
    correo.value="";
    direccion.value="";
    barrio.value="";
    celular.value="";
    contraseña.value ="";
    
}