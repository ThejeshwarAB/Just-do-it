const todo = document.querySelector('.todo'); 
const form = document.querySelector('.form');
const info = document.querySelector('.info');
const header = document.querySelector('.header');
const filter = document.querySelector('.filter');
const error = document.querySelector('.error');
const tasks = todo.getElementsByTagName('li');
const filtered = todo.getElementsByClassName('filtered');

const checkTasks = () => {
    if (tasks.length > 0) {
        info.classList.add('d-none');
        header.classList.remove('d-none');
        filter.classList.remove('d-none');
    }
    else {
        info.classList.remove('d-none');
        header.classList.add('d-none');
        filter.classList.add('d-none');
    }
}

const filterTasks = (term) => {

    Array.from(todo.children)
        .filter((task) => !task.textContent.includes(term))
        .forEach((task) => task.classList.add('d-none', 'filtered'))
    // .forEach((task)=>task.classList.add('filtered'))

    Array.from(todo.children)
        .filter((task) => task.textContent.includes(term))
        .forEach((task) => task.classList.remove('d-none', 'filtered'))
    // .forEach((task)=>task.classList.remove('filtered'))
}

todo.addEventListener('click', e => {

    if (e.target.classList.contains('fa-trash-can')) {
        e.target.parentNode.parentNode.classList.add('outgoing');
        setTimeout(() => {
            e.target.parentNode.parentNode.remove();
            checkTasks();
        }, 1000);
        // e.target.parentNode.parentNode.remove();
    }

    else if (e.target.classList.contains('fa-circle-check')) {
        e.target.parentNode.parentNode.classList.add('completed');
        e.target.classList.remove('fa-circle-check');
        e.target.classList.add('fa-arrows-rotate');
    }

    else if (e.target.classList.contains('fa-arrows-rotate')) {
        e.target.parentNode.parentNode.classList.remove('completed');
        e.target.classList.remove('fa-arrows-rotate');
        e.target.classList.add('fa-circle-check');
    }
})

form.addEventListener('submit', e => {

    e.preventDefault();

    var templateString = "";

    if (form.task.value != '') {
        templateString = `
        <li class="list-group-item d-flex justify-content-between align-items-center incoming">
                    <div class="task">
                        ${form.task.value.toLowerCase()}
                    </div>
                    <div class="buttons">
                        <i class="fa-sharp fa-solid fa-circle-check"></i>
                        <span>&nbsp;</span>
                        <i class="fa-sharp fa-solid fa-trash-can"></i>
                    </div>
                </li>
        `;
    }

    todo.innerHTML += templateString;
    setTimeout(() => {
        // console.log(todo.children)
        Array.from(tasks)
        .forEach((item)=>{
            // console.log(item)
            item.classList.remove('incoming')})
    }, 1000);
    form.reset();
    checkTasks();
})

filter.addEventListener('keyup', e => {
    // console.log(filter.value.trim())
    const term = filter.value.trim();
    filterTasks(term);
    console.log("filtered",filtered.length)
    console.log("tasks",tasks.length)

    if(filtered.length === tasks.length){
    error.classList.remove('d-none');
    header.classList.add('d-none');
    }
    else{
    error.classList.add('d-none');
    header.classList.remove('d-none');
    }
})