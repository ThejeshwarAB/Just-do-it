const list = document.querySelector('.todo');

list.addEventListener('click', e => {
    console.log(e.target.classList.contains('fa-trash-can'))
    if(e.target.classList.contains('fa-trash-can')){
        e.target.parentNode.parentNode.remove();
    }
})