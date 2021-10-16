const $botonesNav = document.querySelectorAll(".btn-navegador")
const $ventanaTabla = document.querySelectorAll(".datos-vuelos")
const $ventanasModales = document.querySelectorAll(".modal")
const $modalNuevoVuelo = document.getElementById("nuevo-vuelo-1")
const $fondoModal = document.querySelector(".fondo-modal")

document.getElementById("nav-vuelos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    $ventanaTabla[0].classList.remove("oculto")
    document.querySelector('.pestanias').classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[0].classList.add('btn-navegador-activo')
  }, false);

  document.getElementById("nav-aerolineas").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.querySelector('.pestanias').classList.add("oculto")
    $ventanaTabla[2].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[1].classList.add('btn-navegador-activo')
  }, false);

  document.getElementById("nav-pilotos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[3].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[2].classList.add('btn-navegador-activo')
  }, false);

  document.getElementById("nav-aviones").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[4].classList.remove("oculto")
    $botonesNav.forEach($boton=>$boton.classList.remove('btn-navegador-activo'))
    $botonesNav[3].classList.add('btn-navegador-activo')
  }, false);

  //-------------------------------ventana modales-----------------------------------

  $modalNuevoVuelo.addEventListener("click", function( event ) {
    $fondoModal.style.visibility = "visible";
    $ventanasModales[1].classList.remove("oculto")
    console.log($ventanasModales[1])
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
  }, false);

  document.getElementById("nuevo-aviones")
  .addEventListener("click", function( event ) {
    $fondoModal.style.visibility = "visible";
    $ventanasModales[7].classList.remove("oculto")
  }, false);

  document.querySelectorAll(".btn-equis").forEach(item => {
    item.addEventListener('click', event => {
        for(const $modal of $ventanasModales){
            $modal.classList.add('oculto')            
        } 
        $fondoModal.style.visibility = "hidden";
    })
  })

  async function reciveJson() {
    try{
      const respost = await fetch('http://127.0.0.1:5000/vuelos')
      const res = await respost.json()
      console.log(res)
    }catch(error){
      console.log
    }
  }
  reciveJson()

  