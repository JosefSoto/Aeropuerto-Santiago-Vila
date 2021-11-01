const $ventanasModales = document.querySelectorAll('.modal')
document.querySelectorAll('.conmutador').forEach(item=> {
    item.addEventListener('click', event => {
        document.querySelector('.bienvenida').classList.toggle('derecha')
    })
})

const formNewRegister = document.querySelector("#registro")
formNewRegister.onsubmit = async (e)=>{
  e.preventDefault()
  console.log('dentro del evento click del vuelo')
  let responde = await fetch('/new/registro',{
    method: 'POST',
    body: new FormData(formNewRegister)
  });
  mostrarModales()
  setTimeout(ocultarModales,5000)
  document.querySelector('.bienvenida').classList.toggle('derecha')
  
}

document.querySelector("#btn_aceptarModal").addEventListener('click', event=>{
  console.log('se hizo click en el boton aceptar')
  ocultarModales()
})

document.querySelectorAll(".btn-equis").forEach(item => {
  item.addEventListener('click', event => {
    ocultarModales()
  })
})

function ocultarModales(){
  document.querySelector("#noGuardados").classList.add('oculto')              
  document.querySelector(".fondo_modal").style.visibility = "hidden";
  document.getElementById("registro").reset();
}

function mostrarModales(){
  document.querySelector(".fondo_modal").style.visibility = "visible";
  document.getElementById("noGuardados").classList.remove('oculto')
}