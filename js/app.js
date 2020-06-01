//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');





//Listener
cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona "agregar carrito"
    cursos.addEventListener('click', comprarCurso);

}






//Funciones
//Funcion queañade el curso al carrito
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
    console.log(curso);
}