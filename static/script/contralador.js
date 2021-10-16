document.querySelectorAll('.conmutador').forEach(item=> {
    item.addEventListener('click', event => {
        document.querySelector('.bienvenida').classList.toggle('derecha')
        document.querySelector('.bienvenida').classList.toggle('izquierda')
    })

})