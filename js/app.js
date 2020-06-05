//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.getElementById('vaciar-carrito');




//Listener
cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona "agregar carrito"
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Al vaciar el carrito
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, mostrar Local Storage 
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}






//Funciones
//Funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso paratomar sus datos
        leerDatosCurso(curso);

    }
}
//Lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el Carrito
function insertarCarrito(curso) {
        const row = document.createElement('tr');
        row.innerHTML =` 
            <td>
                <img src = "${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>

            <td>
            <a href ="#" class ="borrar-curso" data-id ="${curso.id}">X</a>
            </td>
            `; 
            listaCursos.appendChild(row);
            guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito del DOM
function eliminarCurso(e){
        e.preventDefault();

        let curso;
        if(e.target.classList.contains('borrar-curso')){
            e.target.parentElement.parentElement.remove();
        }
}

//Elimina los cursos del carrito del DOM
function vaciarCarrito(){
    //forma lenta
    //listaCursos.innerHTML = '';
    //forma rapida (recomendada)
    while (listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;

}

//Almacena cursos en el carrito a Local Storage
function guardarCursoLocalStorage(curso){
        let cursos;
        //Toma el valor de un arreglo con datos de Local Storage o vacio
        cursos = obtenerCursosLocalStorage();
        //El curso seleccionado se agrega al carrito
        cursos.push(curso);

        localStorage.setItem('cursos', JSON.stringify(cursos));
}


//Comprueba elementos en LocalStorage
function obtenerCursosLocalStorage(){
        let cursosLS;

        //Comprobamos si hay algo en LocalStorage
        if(localStorage.getItem('cursos') === null){
            cursosLS = [];
        }
        else{
            cursosLS = JSON.parse(localStorage.getItem('cursos'));
        }

        return cursosLS;
}

//Imprime los cursos de LocalStorage en el carrito 

function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML =` 
            <td>
                <img src = "${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>

            <td>
            <a href ="#" class ="borrar-curso" data-id ="${curso.id}">X</a>
            </td>
            `; 
            listaCursos.appendChild(row);
    })
}