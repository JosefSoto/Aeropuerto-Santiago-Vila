const $botonesNav = document.querySelectorAll(".btn-navegador")
const $ventanaTabla = document.querySelectorAll(".datos-vuelos")
const $ventanasModales = document.querySelectorAll(".modal")
const $modalNuevoVuelo = document.getElementById("nuevo-vuelo-1")
const $fondoModal = document.querySelector(".fondo-modal")
var tabla = document.querySelectorAll('.tabla')
//-------------------------------cargar datos usuario-----------------------------------
window.onload = async function() {
  try{
    const respost = await fetch('/datosUsuario')
    const res = await respost.json()
    document.querySelector('#header_username').innerText= res[0][0]
    document.querySelector('#dropdown_username').innerText= res[0][0]
    document.querySelector('#dropdown_email').innerText= res[0][1]
    document.querySelector('#dropdown_id').innerText= res[0][3]
    document.querySelector('#dropdown_phone').innerText= res[0][4]
    console.log(res)
     
  }catch(error){
    console.log
  }
};
verVuelos()
//-------------------------------ventana Navegacion-----------------------------------



document.getElementById("nav-vuelos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    $ventanaTabla[0].classList.remove("oculto")
    document.querySelector('.pestanias').classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[0].classList.add('btn-navegador-activo')
    verVuelos()
  }, false);

document.getElementById("nav-aerolineas").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.querySelector('.pestanias').classList.add("oculto")
    $ventanaTabla[2].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[1].classList.add('btn-navegador-activo')
    verAerolineas()
  }, false);

document.getElementById("nav-pilotos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[3].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[2].classList.add('btn-navegador-activo')    
    verPilotos()
  }, false);

document.getElementById("nav-aviones").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[4].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[3].classList.add('btn-navegador-activo')
    verAviones()
  }, false);

  //-------------------------------ventana modales-----------------------------------

$modalNuevoVuelo.addEventListener("click", function( event ) {
  
  $fondoModal.style.visibility = "visible";
  $ventanasModales[1].classList.remove("oculto")
  llenarSelect(document.getElementById("nuevoVueloAerolineas"))
  llenarSelectAvion(document.getElementById("nuevoVueloAviones"))
}, false);

document.getElementById("nuevo-aerolinea")
.addEventListener("click", function( event ) {
  
  $fondoModal.style.visibility = "visible";
  $ventanasModales[3].classList.remove("oculto")
}, false);

document.getElementById("nuevo-pilotos")
.addEventListener("click", function( event ) {
  
  $fondoModal.style.visibility = "visible";
  $ventanasModales[5].classList.remove("oculto")
  llenarSelect(document.getElementById("selectAerolinea"))
}, false);

document.getElementById("nuevo-aviones")
.addEventListener("click", function( event ) {
  
  $fondoModal.style.visibility = "visible";
  $ventanasModales[7].classList.remove("oculto")
  llenarSelect(document.querySelector("#avionSelectAerolinea"))
}, false);

document.querySelectorAll(".btn-equis").forEach(item => {
  item.addEventListener('click', event => {
      for(const $modal of $ventanasModales){
          $modal.classList.add('oculto')            
      } 
      $fondoModal.style.visibility = "hidden";
      document.getElementById("nuevovuelo").reset();
      document.getElementById("nuevAerolinea").reset();
      document.getElementById("nuevoPiloto").reset();
      document.getElementById("nuevoAvion").reset();
  })
})

//-------------------------------Cargar tablas-----------------------------------
async function verVuelos() {
  try{
    const respost = await fetch('http://127.0.0.1:5000/show/vuelo')
    const res = await respost.json()
    let contador = 0
    let newTbody = document.createElement("tbody");
        res.forEach((elemento)=>{
          contador++         
        let vuelo = document.createElement("tr")  

        let check = document.createElement("td")
        let checkInput = document.createElement("input")
        checkInput.setAttribute("type", "checkbox")
        check.appendChild(checkInput)
        vuelo.appendChild(check)

        let codigo = document.createElement("td")
        codigo.setAttribute("data-tabla", "vuelos")
        codigo.appendChild(document.createTextNode(elemento[0]))
        vuelo.appendChild(codigo)

        let aerolinea = document.createElement("td")
        aerolinea.appendChild(document.createTextNode(elemento[1]))
        vuelo.appendChild(aerolinea)

        let origen = document.createElement("td")
        origen.appendChild(document.createTextNode(elemento[3]))
        vuelo.appendChild(origen)

        let dia = document.createElement("td")
        dia.appendChild(document.createTextNode(elemento[4]))
        vuelo.appendChild(dia)

        let hora = document.createElement("td")
        hora.appendChild(document.createTextNode(elemento[5]))
        vuelo.appendChild(hora)

        let avion = document.createElement("td")
        avion.appendChild(document.createTextNode(elemento[6]))
        vuelo.appendChild(avion)

        let estado = document.createElement("td")
        estado.appendChild(document.createTextNode(elemento[7]))
        vuelo.appendChild(estado)

        let sillas = document.createElement("td")
        sillas.appendChild(document.createTextNode(elemento[8]))
        vuelo.appendChild(sillas)

        let funcionllamada = "pruebaDeClick("+contador+")"
        let editador = document.createElement("td")
        let btnEdicion = document.createElement("button")
        let imagen = document.createElement("img")
        imagen.setAttribute("src", "../static/recursos/editarIcono.png")
        btnEdicion.setAttribute("onclick", funcionllamada)
        btnEdicion.setAttribute("id", contador)
        btnEdicion.classList.add("imagenEditar")
        btnEdicion.appendChild(imagen)
        editador.appendChild(btnEdicion)
        vuelo.appendChild(editador)

        let eliminador = document.createElement("td") 
        vuelo.appendChild(eliminador)

        newTbody.appendChild(vuelo)
    })
    const oldTbody = tabla[0].querySelector("tbody")
    tabla[0].replaceChild(newTbody, oldTbody)
  }catch(error){
    console.log
  }
}

async function verAerolineas() {
  try{
    const respost = await fetch('http://127.0.0.1:5000/show/aerolinea')
    const res = await respost.json()
    let newTbody = document.createElement('tbody');
    let contador = 100
    res.forEach((elemento)=>{
      contador++ 
      let listAerolinea = document.createElement('tr')  

      let check = document.createElement("td")
      let checkInput = document.createElement("input")
      checkInput.setAttribute('type', "checkbox")
      check.appendChild(checkInput)
      listAerolinea.appendChild(check)

      let aerolinea = document.createElement("td")
      aerolinea.setAttribute("data-tabla", "aerolineas")
      aerolinea.appendChild(document.createTextNode(elemento[0]))
      listAerolinea.appendChild(aerolinea)

      let codigo = document.createElement("td")
      codigo.appendChild(document.createTextNode(elemento[1]))
      listAerolinea.appendChild(codigo)

      let aviones = document.createElement("td")
      aviones.appendChild(document.createTextNode(elemento[2]))
      listAerolinea.appendChild(aviones)

      let logo = document.createElement("td")
      logo.appendChild(document.createTextNode(elemento[3]))
      listAerolinea.appendChild(logo)

      let funcionllamada = "pruebaDeClickAero("+contador+")"
      let editador = document.createElement("td")
      let btnEdicion = document.createElement("button")
      let imagen = document.createElement("img")
      imagen.setAttribute("src", "../static/recursos/editarIcono.png")
      btnEdicion.setAttribute("onclick", funcionllamada)
      btnEdicion.setAttribute("id", contador)
      btnEdicion.classList.add("imagenEditar")
      btnEdicion.appendChild(imagen)
      editador.appendChild(btnEdicion)
      listAerolinea.appendChild(editador)

      let eliminador = document.createElement("td") 
      listAerolinea.appendChild(eliminador)

      newTbody.appendChild(listAerolinea)
    })
    const oldTbody = tabla[2].querySelector("tbody")
    tabla[2].replaceChild(newTbody, oldTbody)
  }catch(error){
    console.log(error)
  }
}

async function verPilotos() {
  try{
    const respost = await fetch('http://127.0.0.1:5000/show/piloto')
    const res = await respost.json()
    let newTbody = document.createElement('tbody');
    let contador = 200
    res.forEach((elemento)=>{
      contador++ 
      let listaPiloto = document.createElement('tr') 

      let check = document.createElement("td")
      let checkInput = document.createElement("input")
      checkInput.setAttribute('type', "checkbox")
      check.appendChild(checkInput)
      listaPiloto.appendChild(check)

      let documento = document.createElement("td")
      documento.setAttribute("data-tabla", "pilotos")
      documento.appendChild(document.createTextNode(elemento[2]))
      listaPiloto.appendChild(documento)

      let nombre = document.createElement("td")
      nombre.appendChild(document.createTextNode(elemento[0]))
      listaPiloto.appendChild(nombre)

      let apellido = document.createElement("td")
      apellido.appendChild(document.createTextNode(elemento[1]))
      listaPiloto.appendChild(apellido)      

      let aerolinea = document.createElement("td")
      aerolinea.appendChild(document.createTextNode(elemento[3]))
      listaPiloto.appendChild(aerolinea)

      let telefono = document.createElement("td")
      telefono.appendChild(document.createTextNode(elemento[4]))
      listaPiloto.appendChild(telefono)

      let funcionllamada = "pruebaDeClickPiloto("+contador+")"
      let editador = document.createElement("td")
      let btnEdicion = document.createElement("button")
      let imagen = document.createElement("img")
      imagen.setAttribute("src", "../static/recursos/editarIcono.png")
      btnEdicion.setAttribute("onclick", funcionllamada)
      btnEdicion.setAttribute("id", contador)
      btnEdicion.classList.add("imagenEditar")
      btnEdicion.appendChild(imagen)
      editador.appendChild(btnEdicion)
      listaPiloto.appendChild(editador)

      let eliminador = document.createElement("td") 
      listaPiloto.appendChild(eliminador)

      newTbody.appendChild(listaPiloto)
    })
    const oldTbody = tabla[3].querySelector("tbody")
    tabla[3].replaceChild(newTbody, oldTbody)
  }catch(error){
    console.log
  }
}

async function verAviones() {
  try{
    const respost = await fetch('http://127.0.0.1:5000/show/aviones')
    const res = await respost.json()
    let newTbody = document.createElement('tbody');
    let contador = 300
    res.forEach((elemento)=>{
      contador++ 
      let listAviones = document.createElement('tr')  

      let check = document.createElement("td")
      let checkInput = document.createElement("input")
      checkInput.setAttribute('type', "checkbox")
      check.appendChild(checkInput)
      listAviones.appendChild(check)

      let avion = document.createElement("td")
      avion.setAttribute("data-tabla", "aviones")
      avion.appendChild(document.createTextNode(elemento[0]))
      listAviones.appendChild(avion)

      let fabricante = document.createElement("td")
      fabricante.appendChild(document.createTextNode(elemento[2]))
      listAviones.appendChild(fabricante)

      let modelo = document.createElement("td")
      modelo.appendChild(document.createTextNode(elemento[3]))
      listAviones.appendChild(modelo)

      let aerolinea = document.createElement("td")
      aerolinea.appendChild(document.createTextNode(elemento[1]))
      listAviones.appendChild(aerolinea)

      let sillas = document.createElement("td")
      sillas.appendChild(document.createTextNode(elemento[4]))
      listAviones.appendChild(sillas)

      
      let funcionllamada = "pruebaDeClickAvion("+contador+")"
      let editador = document.createElement("td")
      let btnEdicion = document.createElement("button")
      let imagen = document.createElement("img")
      imagen.setAttribute("src", "../static/recursos/editarIcono.png")
      btnEdicion.setAttribute("onclick", funcionllamada)
      btnEdicion.setAttribute("id", contador)
      btnEdicion.classList.add("imagenEditar")
      btnEdicion.appendChild(imagen)
      editador.appendChild(btnEdicion)      
      listAviones.appendChild(editador)
      
      let eliminador = document.createElement("td") 
      listAviones.appendChild(eliminador)

      newTbody.appendChild(listAviones)
    })
    const oldTbody = tabla[4].querySelector("tbody")
    tabla[4].replaceChild(newTbody, oldTbody)
  }catch(error){
    console.log
  }
}

async function llenarSelect($select){
  while ($select.firstChild) {
    $select.removeChild($select.firstChild);
  }
  try{
    const respost = await fetch('http://127.0.0.1:5000/show/selector')
    const res = await respost.json()
    res.forEach((elemento)=>{
      const option = document.createElement('option');
      const valor = elemento[0]
      option.value = valor;
      option.text = valor;
      $select.appendChild(option)
    }) 
  }catch(error){
    console.log(error)
  } 
}

async function llenarSelectAvion($select){
  while ($select.firstChild) {
    $select.removeChild($select.firstChild);
  }
  try{
    const respost = await fetch('http://127.0.0.1:5000/show/selector/avion')
    const res = await respost.json()
    res.forEach((elemento)=>{
      console.log(elemento)
      const option = document.createElement('option');
      const valor = elemento[0]
      option.value = valor;
      option.text = valor;
      $select.appendChild(option) 
    }) 
  }catch(error){
    console.log(error)
  } 
}

  //-------------------------------Nuevos Datos-----------------------------------


const formNewFly = document.querySelector("#nuevovuelo")
formNewFly.onsubmit = async (e)=>{
  e.preventDefault()
  console.log('dentro del evento click del vuelo')
  let responde = await fetch('http://127.0.0.1:5000/new/vuelo',{
    method: 'POST',
    body: new FormData(formNewFly)
  });

  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  document.getElementById("nuevovuelo").reset();
  verVuelos()
}

const formNewAirline = document.querySelector("#nuevAerolinea")
formNewAirline.onsubmit = async (e)=>{
  e.preventDefault()
    let responde = await fetch('http://127.0.0.1:5000/new/aerolinea',{
    method: 'POST',
    body: new FormData(formNewAirline)
  });

  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  document.getElementById("nuevAerolinea").reset();
  verAerolineas()

}

const formNewPilot = document.querySelector("#nuevoPiloto")
formNewPilot.onsubmit = async (e)=>{
  e.preventDefault()
  let responde = await fetch('http://127.0.0.1:5000/new/piloto',{
    method: 'POST',
    body: new FormData(formNewPilot)
  });
  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  document.getElementById("nuevoPiloto").reset();
  verPilotos()  
}

const formNewPlane = document.querySelector("#nuevoAvion")
formNewPlane.onsubmit = async (e)=>{
  e.preventDefault()  
  let responde = await fetch('http://127.0.0.1:5000/new/avion',{
    method: 'POST',
    body: new FormData(formNewPlane)
  });
  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  document.getElementById("nuevoAvion").reset();
  verAviones()
}

//-------------------------------Eliminar celdas-----------------------------------
document.querySelectorAll('.btn_eliminar').forEach(btnEliminar => {
  btnEliminar.addEventListener('click', function(){
    document.querySelectorAll('td>input[type="checkbox"]').forEach(item =>{
      if(item.checked){
      let  keyceld = item.parentElement.nextElementSibling      
      peticionDePrueba(keyceld.dataset.tabla, keyceld.innerText)
      }      
    })
    verAerolineas()
    verVuelos()
    verPilotos()
    verAviones()
  })
})

async function peticionDePrueba(peticionTabla, peticionCodigo ){
  try { 
      var datos = {tabla: peticionTabla, codigo: peticionCodigo };
      var init = {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(datos) 
      }; 
      var response = await fetch('http://127.0.0.1:5000/prueba', init);
      console.log(response)
  } catch (err) {
      console.log("Error al realizar la petición AJAX: " + err.message);
  }
}
 
//-------------------------------Editar tablas-----------------------------------

function pruebaDeClick(contador){
  let fila = document.getElementById(contador).parentNode.parentNode.childNodes
  let ventanaModalEditar = document.querySelector('#editar-vuelo')
  llenarSelect(document.getElementById("editar_vuelo_aerolinea"))
  llenarSelectAvion(document.getElementById("editar_vuelo_avion"))
  
  document.getElementById('editar_vuelo_vuelo').value = fila[1].innerText
  document.getElementById('editar_vuelo_aerolinea').value = fila[2].innerText
  document.getElementById('editar_vuelo_destino').value = fila[3].innerText
  document.getElementById('editar_vuelo_dia').value = fila[4].innerText
  document.getElementById('editar_vuelo_hora').value = fila[5].innerText
  document.getElementById('editar_vuelo_avion').value = fila[6].innerText
  console.log(document.getElementById('editar_vuelo_estado'))
  $fondoModal.style.visibility = "visible";
  $ventanasModales[0].classList.remove("oculto")
  
}

const formUpdateFly = document.querySelector("#editar-vuelo")
formUpdateFly.onsubmit = async (e)=>{
  e.preventDefault()
  let responde = await fetch('http://127.0.0.1:5000/Update/vuelo',{
    method: 'POST',
    body: new FormData(formUpdateFly)
  });

  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  verVuelos()
  
}

function pruebaDeClickAero(contador){
  let fila = document.getElementById(contador).parentNode.parentNode.childNodes
   
  document.getElementById('editar_aerolinea_nombre').value = fila[1].innerText
  document.getElementById('editar_aerolinea_codigo').value = fila[2].innerText
  document.getElementById('editar_aerolinea_aviones').value = fila[3].innerText
  
  $fondoModal.style.visibility = "visible";
  $ventanasModales[2].classList.remove("oculto")
  
}

const formUpdateAirline = document.querySelector("#editar-aerolinea")
formUpdateAirline.onsubmit = async (e)=>{
  e.preventDefault()
  let responde = await fetch('http://127.0.0.1:5000/update/aerolinea',{
    method: 'POST',
    body: new FormData(formUpdateAirline)
  });

  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  verAerolineas()
}

function pruebaDeClickPiloto(contador){
  let fila = document.getElementById(contador).parentNode.parentNode.childNodes
  llenarSelect(document.getElementById("editar_piloto_aerolinea"))
  
  document.getElementById('editar_piloto_nombre').value = fila[2].innerText
  document.getElementById('editar_piloto_apellido').value = fila[3].innerText
  document.getElementById('editar_piloto_documento').value = fila[1].innerText
  document.getElementById('editar_piloto_telefono').value = fila[5].innerText
  document.getElementById('editar_piloto_aerolinea').value = fila[4].innerText
  
  $fondoModal.style.visibility = "visible";
  $ventanasModales[4].classList.remove("oculto")
}

const formUpdatePilot = document.querySelector("#editar-pilotos")
formUpdatePilot.onsubmit = async (e)=>{
  e.preventDefault()
  let responde = await fetch('http://127.0.0.1:5000/update/pilotos',{
    method: 'POST',
    body: new FormData(formUpdatePilot)
  });

  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  verPilotos()
  
}

function pruebaDeClickAvion(contador){
  let fila = document.getElementById(contador).parentNode.parentNode.childNodes
  llenarSelect(document.getElementById("editar_aviones_aerolinea"))
  
  document.getElementById('editar_aviones_codigo').value = fila[1].innerText
  document.getElementById('editar_aviones_aerolinea').value = fila[4].innerText
  document.getElementById('editar_aviones_fabricante').value = fila[2].innerText
  document.getElementById('editar_aviones_modelo').value = fila[3].innerText
  document.getElementById('editar_aviones_silla').value = fila[5].innerText
  
  $fondoModal.style.visibility = "visible";
  $ventanasModales[6].classList.remove("oculto")
  
}

const formUpdateAviones = document.querySelector("#editar-aviones")
formUpdateAviones.onsubmit = async (e)=>{
  e.preventDefault()
  let responde = await fetch('http://127.0.0.1:5000/update/aviones',{
    method: 'POST',
    body: new FormData(formUpdateAviones)
  });

  for(const $modal of $ventanasModales){
    $modal.classList.add('oculto')            
  } 
  $fondoModal.style.visibility = "hidden";
  verAviones()
  
}