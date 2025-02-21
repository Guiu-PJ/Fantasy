import Player from "../Models/Player.js";
import PlayerForSale from "../Models/PlayerForSale.js";

const btnAddPlayer = document.getElementById('btnAddPlayer');
const divAddPlayer = document.getElementById('divAddPlayer');
const btnaAnadirJugadorCerrar = document.getElementById('btnaAnadirJugadorCerrar');
const btnResultats = document.getElementById('btnResultats');
const divResultats = document.getElementById('divResultats');
const btnResultatsCerrar = document.getElementById('btnResultatsCerrar');
const btnMarket = document.getElementById('btnMarket');
const btnAdminPoints = document.getElementById('btnAdminPoints');

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

btnAdminPoints.addEventListener('click', () => {
    window.location.href = '/Views/adminPoints.html';
});

/*
formResultats.addEventListener('submit', async (event) => {
    // Prevenir el env�o por defecto (para que no recargue la p�gina)
    event.preventDefault();



});
*/


formAnadirJugador.addEventListener('submit', async (event) => {
    // Prevenir el env�o por defecto (para que no recargue la p�gina)
    event.preventDefault();

    // Capturar los datos del formulario
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const basePrice = document.getElementById('basePrice').value;

    const player = new Player(name, position.toLowerCase(), basePrice);

    try{
        await player.savePlayer();
        divAddPlayer.style.display = 'none';
    } catch (e) {
        alert('error al crear le jugador: ' + e);
    }

});

btnMarket.addEventListener('click', async (event) => {

    await PlayerForSale.updateRandomPlayersForSale();
    
});

