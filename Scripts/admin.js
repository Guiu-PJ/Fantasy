import Player from "../Models/Player.js";

const btnAddPlayer = document.getElementById('btnAddPlayer');
const divAddPlayer = document.getElementById('divAddPlayer');
const btnaAnadirJugadorCerrar = document.getElementById('btnaAnadirJugadorCerrar');
const btnResultats = document.getElementById('btnResultats');
const divResultats = document.getElementById('divResultats');
const btnResultatsCerrar = document.getElementById('btnResultatsCerrar');

const formAnadirJugador = document.getElementById('signUpForm');
const formResultats = document.getElementById('formResultats');

const user = JSON.parse(sessionStorage.getItem("currentUser"));

document.addEventListener('DOMContentLoaded', () => {

    btnAddPlayer.addEventListener('click', () => {
        divAddPlayer.style.display = 'block';
    });

    btnResultats.addEventListener('click', () => {
        divResultats.style.display = 'block';
    });
});

btnaAnadirJugadorCerrar.addEventListener('click', () => {
    divAddPlayer.style.display = 'none';
});

btnResultatsCerrar.addEventListener('click', () => {
    divResultats.style.display = 'none';
});


formAnadirJugador.addEventListener('submit', async (event) => {
    // Prevenir el envío por defecto (para que no recargue la página)
    event.preventDefault();



});


formAnadirJugador.addEventListener('submit', async (event) => {
    // Prevenir el envío por defecto (para que no recargue la página)
    event.preventDefault();

    // Capturar los datos del formulario
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const basePrice = document.getElementById('basePrice').value;

    const player = new Player(name, position.toLowerCase(), basePrice);

    try{
        await player.savePlayer();
        divAddPlayer.style.display = 'none';
        alert('Jugador creat');
    } catch (e) {
        alert('error al crear le jugador: ' + e);
    }

});