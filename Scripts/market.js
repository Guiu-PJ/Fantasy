import PlayerForSale from "../Models/PlayerForSale.js";

const divPlayersForSale = document.getElementById('divPlayersForSale');

const user = JSON.parse(sessionStorage.getItem("currentUser"));
const currentTeam = JSON.parse(sessionStorage.getItem("currentTeam"));


document.addEventListener('DOMContentLoaded', async () => {

    await displayPlayersForSale(currentTeam.idLeague);

});


async function displayPlayersForSale(leagueId) {
    // Obtener la lista de jugadores en venta
    const playersForSale = await PlayerForSale.getPlayersForSale(leagueId);

    // Vaciar el contenedor en caso de actualizaciones
    divPlayersForSale.innerHTML = '';

    // Iterar sobre los jugadores y crear elementos para mostrarlos
    playersForSale.forEach(player => {
        // Crear un contenedor para cada jugador
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-card';

        // Agregar información del jugador
        playerDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${player.name}</p>
            <p><strong>Posición:</strong> ${player.position}</p>
            <p><strong>Precio:</strong> ${player.price} €</p>
            <input type="number" id="bid_${player.id}" placeholder="Cantidad a pujar" />
            <button onclick="placeBid('${player.id}')">Pujar</button>
        `;

        // Agregar el contenedor del jugador al contenedor principal
        divPlayersForSale.appendChild(playerDiv);
    });
}

// Función para manejar la puja
function placeBid(playerId) {
    const bidInput = document.getElementById(`bid_${playerId}`);
    const bidAmount = bidInput.value;

}

