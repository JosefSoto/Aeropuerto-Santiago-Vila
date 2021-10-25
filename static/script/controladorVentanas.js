const $botonesNav = document.querySelectorAll(".btn-navegador")
const $ventanaTabla = document.querySelectorAll(".datos-vuelos")
const $ventanasModales = document.querySelectorAll(".modal")
const $modalNuevoVuelo = document.getElementById("nuevo-vuelo-1")
const $fondoModal = document.querySelector(".fondo-modal")
var tabla = document.querySelectorAll('.tabla tbody')
verVuelos()

document.getElementById("nav-vuelos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    $ventanaTabla[0].classList.remove("oculto")
    document.querySelector('.pestanias').classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[0].classList.add('btn-navegador-activo')
    while (tabla[0].firstChild) {
      tabla[0].removeChild(tabla[0].firstChild);
  }
    verVuelos()
  }, false);

  document.getElementById("nav-aerolineas").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.querySelector('.pestanias').classList.add("oculto")
    $ventanaTabla[2].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[1].classList.add('btn-navegador-activo')
    while (tabla[2].firstChild) {
      console.log(tabla[2].removeChild(tabla[2].firstChild));
    }
    verAerolineas()
  }, false);

  document.getElementById("nav-pilotos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[3].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[2].classList.add('btn-navegador-activo')
    while (tabla[3].firstChild) {
      //The list is LIVE so it will re-index each call
      console.log(tabla[3].removeChild(tabla[3].firstChild));
    }
    verPilotos()
  }, false);

  document.getElementById("nav-aviones").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[4].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[3].classList.add('btn-navegador-activo')
    while (tabla[4].firstChild) {
      //The list is LIVE so it will re-index each call
      console.log(tabla[4].removeChild(tabla[4].firstChild));
    }
    verAviones()
  }, false);

  /* document.querySelectorAll(".btn_eliminar").forEach(item => {
    item.addEventListener('click', event => {
        for(const $check of $document.getElementsByClassName(btn_eliminar).c){
            $modal.classList.add('oculto')            
        } 
        $fondoModal.style.visibility = "hidden";
    })
  }) */

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
         res.forEach((elemento)=>{         
          let vuelo = document.createElement('tr')  

          console.log(elemento)

          let check = document.createElement("td")
          let checkInput = document.createElement("input")
          checkInput.setAttribute('type', "checkbox")
          check.appendChild(checkInput)
          vuelo.appendChild(check)

          let codigo = document.createElement("td")
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
          
          let editador = document.createElement("td")
          vuelo.appendChild(editador)
          let eliminador = document.createElement("td") 
          vuelo.appendChild(eliminador)

          tabla[0].appendChild(vuelo)
      })  
    }catch(error){
      console.log
    }
  }
  
  async function verAerolineas() {
    try{
      const respost = await fetch('http://127.0.0.1:5000/show/aerolinea')
      const res = await respost.json()
      console.log('documento devuelto')
      console.log(res)

      res.forEach((elemento)=>{ 
        let listAerolinea = document.createElement('tr')  

        let check = document.createElement("td")
        let checkInput = document.createElement("input")
        checkInput.setAttribute('type', "checkbox")
        check.appendChild(checkInput)
        listAerolinea.appendChild(check)

        let aerolinea = document.createElement("td")
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

        let editador = document.createElement("td")
        listAerolinea.appendChild(editador)
        let eliminador = document.createElement("td") 
        listAerolinea.appendChild(eliminador)

        tabla[2].appendChild(listAerolinea)
      })
    }catch(error){
      console.log(error)
    }
  }
  
  async function verPilotos() {
    try{
      const respost = await fetch('http://127.0.0.1:5000/show/piloto')
      const res = await respost.json()
      res.forEach((elemento)=>{ 
        let listaPiloto = document.createElement('tr')
        console.log(elemento)  

        let check = document.createElement("td")
        let checkInput = document.createElement("input")
        checkInput.setAttribute('type', "checkbox")
        check.appendChild(checkInput)
        listaPiloto.appendChild(check)

        let foto = document.createElement("td")
        listaPiloto.appendChild(foto)

        let nombre = document.createElement("td")
        nombre.appendChild(document.createTextNode(elemento[0]+" "+elemento[1]))
        listaPiloto.appendChild(nombre)

        let documento = document.createElement("td")
        documento.appendChild(document.createTextNode(elemento[2]))
        listaPiloto.appendChild(documento)

        let aerolinea = document.createElement("td")
        aerolinea.appendChild(document.createTextNode(elemento[3]))
        listaPiloto.appendChild(aerolinea)

        let telefono = document.createElement("td")
        telefono.appendChild(document.createTextNode(elemento[4]))
        listaPiloto.appendChild(telefono)

        let editador = document.createElement("td")
        listaPiloto.appendChild(editador)
        let eliminador = document.createElement("td") 
        listaPiloto.appendChild(eliminador)

        tabla[3].appendChild(listaPiloto)
      })
    }catch(error){
      console.log
    }
  }
  
  async function verAviones() {
    try{
      const respost = await fetch('http://127.0.0.1:5000/show/aviones')
      const res = await respost.json()
      res.forEach((elemento)=>{ 
        let listAviones = document.createElement('tr')  
        console.log(elemento)

        let check = document.createElement("td")
        let checkInput = document.createElement("input")
        checkInput.setAttribute('type', "checkbox")
        check.appendChild(checkInput)
        listAviones.appendChild(check)

        let avion = document.createElement("td")
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

        let editador = document.createElement("td")
        listAviones.appendChild(editador)
        let eliminador = document.createElement("td") 
        listAviones.appendChild(eliminador)

        tabla[4].appendChild(listAviones)
      })
    }catch(error){
      console.log
    }
  }

  async function llenarSelect($select){
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
        console.log($select)
      }) 
    }catch(error){
      console.log(error)
    } 
  }

  //-------------------------------Nuevos Datos-----------------------------------

/*   const $formNewFly = document.querySelector('#nuevovuelo')
  $formNewFly.addEventListener('submit',(event)=>{
    event.preventDefault()
    const formData = new FormData($formNewFly)
    console.log(formData)
  })
 */
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
}