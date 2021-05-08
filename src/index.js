"use strict";
import './index.html';
import './css/normalize.css';
import './css/skeleton.css';
import './css/custom.css';

//variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    document.addEventListener('DOMContentLoaded', _ => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHtml();
    });

    listaCursos.addEventListener('click', agregarCurso);//ojo que flipas

    //eliminar curso
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarrito.addEventListener('click', _ => {
        articulosCarrito = [];
        limpiarHtml();
    });
}

//funciones 
function agregarCurso(e){
    e.preventDefault();
    const id = e.target.dataset.id;
    if(id){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso, id);
    }
}

//elimina un curo del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const id = e.target.dataset.id;
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== id);//retorna todos menos uno
        carritoHtml();
    }
}

//lee el contenido del html al que le dimos click
function leerDatosCurso(curso, id){

    //crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombreCurso: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: id,
        cantidad: 1
    }

    // agrega elementos al arreglo de carrito
    // articulosCarrito = [...articulosCarrito,  infoCurso]//otra forma de agragar elementos al arreglo

    //comprobar si el elemento ya existe
    const existe = articulosCarrito.some(curso => curso.id === id);

    if(existe){
        //actualizamos la cantidad
        for(curso of articulosCarrito){
            if(curso.id === id){
                curso.cantidad++;
                break;
            }
        }

    }else{
        articulosCarrito.push(infoCurso);
    }

    carritoHtml();
}

//Genera el carrito en el html
function carritoHtml(){

    limpiarHtml();

    //recorre el carrito
    articulosCarrito.forEach(elemento => {
        
        const {imagen, nombreCurso, precio, cantidad, id} = elemento;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100px">
            </td>
            <td>${nombreCurso}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });  
    
    sincronizarStorage();

}

//limpia el html
function limpiarHtml(){

    //forma lenta
    // contenedorCarrito.innerHTML = '';

    //forma rapida (performance)
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//guardar en localStorage
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}