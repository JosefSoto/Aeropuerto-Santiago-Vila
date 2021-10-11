const $ventanaTabla = document.querySelectorAll(".datos-vuelos")
const $ventanasModales = document.querySelectorAll(".modal")
const $modalNuevoVuelo = document.getElementById("nuevo-vuelo-1")
const $fondoModal = document.querySelector(".fondo-modal")

document.getElementById("nav-vuelos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    $ventanaTabla[0].classList.remove("oculto")
  }, false);

  document.getElementById("nav-aerolineas").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[2].classList.remove("oculto")
  }, false);

  document.getElementById("nav-pilotos").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[3].classList.remove("oculto")
  }, false);

  document.getElementById("nav-aviones").addEventListener("click", function( event ) {
    $ventanaTabla.forEach(tabla=>tabla.classList.add("oculto"))
    document.getElementsByClassName('pestanias')[0].classList.add("oculto")
    $ventanaTabla[4].classList.remove("oculto")
  }, false);

  //-------------------------------ventana modales-----------------------------------

  $modalNuevoVuelo.addEventListener("click", function( event ) {
    $fondoModal.style.visibility = "visible";
    $ventanasModales[1].classList.remove("oculto")
    console.log($ventanasModales[1])
  }, false);

  document.getElementById("nuevo-aerolinea").addEventListener("click", function( event ) {
    $fondoModal.style.visibility = "visible";
    $ventanasModales[3].classList.remove("oculto")
  }, false);

  document.getElementById("nuevo-pilotos").addEventListener("click", function( event ) {
    $fondoModal.style.visibility = "visible";
    $ventanasModales[5].classList.remove("oculto")
  }, false);

  document.getElementById("nuevo-aviones").addEventListener("click", function( event ) {
    $fondoModal.style.visibility = "visible";
    $ventanasModales[7].classList.remove("oculto")
  }, false);

  document.querySelectorAll(".btn-equis").forEach(item => {
    item.addEventListener('click', event => {
        console.log('dentro del evento click')
        for(const $modal of $ventanasModales){
            $modal.classList.add('oculto')            
            console.log($modal)
        }
        $fondoModal.style.visibility = "hidden";
    })
  })

  