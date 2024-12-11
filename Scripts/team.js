/*import Team_Player from "../Models/Team_Player.js";

const divCurrentTeam = document.getElementById('divCurrentTeam');

const user = JSON.parse(sessionStorage.getItem("currentUser"));
const team = JSON.parse(sessionStorage.getItem("currentTeam"));

document.addEventListener('DOMContentLoaded', async () => {

    const players = await Team_Player.getAllTeamPlayers(team.id);

    console.log(players);

});*/

import Team_Player from "../Models/Team_Player.js";

const divPlayersTeam = document.getElementById('divPlayersTeam');
const playerJ1 = document.getElementById('playerJ1');
const playerJ2 = document.getElementById('playerJ2');
const playerP = document.getElementById('playerP');
const saveChangesButton = document.getElementById('saveChangesButton'); // Botón para guardar cambios

const user = JSON.parse(sessionStorage.getItem("currentUser"));
const team = JSON.parse(sessionStorage.getItem("currentTeam"));

// Almacenar la lista de jugadores
let playersStatusB = [];
let activePlayers = {
    j1: null,
    j2: null,
    p: null
};

// Renderizar la lista de jugadores
const renderPlayersList = () => {
    divPlayersTeam.innerHTML = ''; // Limpiar la lista
    playersStatusB.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.textContent = `${player.name} - Pos: ${player.pos}`;
        playerDiv.dataset.id = player.id;
        playerDiv.addEventListener('click', () => activatePlayer(player)); // Agregar evento para activar
        divPlayersTeam.appendChild(playerDiv);
    });
};

// Renderizar jugadores en las posiciones activas
const renderActivePlayers = () => {
    // Actualizar jugador en J1
    playerJ1.textContent = activePlayers.j1 ? activePlayers.j1.name : '';
    // Actualizar jugador en J2
    playerJ2.textContent = activePlayers.j2 ? activePlayers.j2.name : '';
    // Actualizar jugador en P
    playerP.textContent = activePlayers.p ? activePlayers.p.name : '';
};

// Activar un jugador
const activatePlayer = (player) => {
    if (player.pos === 'j') {
        if (!activePlayers.j1) {
            activePlayers.j1 = player;
        } else if (!activePlayers.j2) {
            activePlayers.j2 = player;
        } else {
            alert('Ya hay dos jugadores activos en la posición J');
            return;
        }
    } else if (player.pos === 'p') {
        if (!activePlayers.p) {
            activePlayers.p = player;
        } else {
            alert('Ya hay un jugador activo en la posición P');
            return;
        }
    }

    // Actualizar estado
    player.status = 'p';
    playersStatusB = playersStatusB.filter(p => p.id !== player.id); // Eliminar de la lista
    renderPlayersList();
    renderActivePlayers();
};

// Desactivar un jugador
const deactivatePlayer = (pos) => {
    const player = activePlayers[pos];
    if (player) {
        player.status = 'b'; // Cambiar estado
        playersStatusB.push(player); // Añadir de nuevo a la lista
        activePlayers[pos] = null; // Eliminar de la posición activa
        renderPlayersList();
        renderActivePlayers();
    }
};

// Configurar eventos para desactivar jugadores
playerJ1.addEventListener('click', () => deactivatePlayer('j1'));
playerJ2.addEventListener('click', () => deactivatePlayer('j2'));
playerP.addEventListener('click', () => deactivatePlayer('p'));

// Guardar cambios en la base de datos
const saveChanges = async () => {
    try {
        const activePlayersList = Object.values(activePlayers).filter(player => player);
        const playersToUpdate = [
            ...activePlayersList.map(player => ({ id: player.id, status: 'p' })),
            ...playersStatusB.map(player => ({ id: player.id, status: 'b' }))
        ];

        await Team_Player.updatePlayersStatus(playersToUpdate);
        alert('Los cambios han sido guardados correctamente.');
    } catch (error) {
        console.error("Error al guardar los cambios:", error);
        alert('Hubo un problema al guardar los cambios.');
    }
};

// Asociar el evento al botón de guardar
saveChangesButton.addEventListener('click', saveChanges);

// Cargar jugadores al inicio
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const players = await Team_Player.getAllTeamPlayers(team.id);

        // Filtrar jugadores por status
        playersStatusB = players.filter(player => player.status === 'b');
        const active = players.filter(player => player.status === 'p');

        // Asignar jugadores activos a sus posiciones
        active.forEach(player => {
            if (player.pos === 'j' && !activePlayers.j1) {
                activePlayers.j1 = player;
            } else if (player.pos === 'j' && !activePlayers.j2) {
                activePlayers.j2 = player;
            } else if (player.pos === 'p') {
                activePlayers.p = player;
            }
        });

        renderPlayersList();
        renderActivePlayers();
    } catch (error) {
        console.error("Error loading players:", error);
    }
});