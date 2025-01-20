import Player from "../Models/Player.js";
const BASE_URL = 'https://fantasybackend-yok6.onrender.com';

const divAdminPoints = document.getElementById('divAdminPoints');

// Obtener todos los jugadores
const players = await Player.getAllPlayers();

// Crear un contenedor global para almacenar los datos de los jugadores
const playerData = [];

// Generar el formulario dinámico para cada jugador
players.forEach(player => {
    // Crear un div para cada jugador
    const playerDiv = document.createElement('div');
    playerDiv.className = 'divPlayerPoints';

    // Nombre del jugador
    const playerNameDiv = document.createElement('div');
    playerNameDiv.className = 'playerName';
    playerNameDiv.textContent = `${player.name}`;
    playerDiv.appendChild(playerNameDiv);

    // Crear un contenedor para los inputs
    const statsDiv = document.createElement('div');
    statsDiv.className = 'statsContainer';

    // Campos dinámicos
    const fields = [
        { label: 'Gols (N):', type: 'number', defaultValue: 0, key: 'golsN' },
        { label: 'Gols (D/P):', type: 'number', defaultValue: 0, key: 'golsDP' },
        { label: 'Prov. blava:', type: 'number', defaultValue: 0, key: 'provBlava' },
        { label: 'Prov. vermella:', type: 'number', defaultValue: 0, key: 'provVermella' },
        { label: 'Prov. penalti:', type: 'number', defaultValue: 0, key: 'provPenalti' },
        { label: 'Prov. directe:', type: 'number', defaultValue: 0, key: 'provDirecte' },
        { label: 'Parar penalti:', type: 'number', defaultValue: 0, key: 'pararPenalti' },
        { label: 'Parar directe:', type: 'number', defaultValue: 0, key: 'pararDirecte' },
        { label: 'Porteria 0:', type: 'checkbox', defaultValue: false, key: 'porteriaZero' },
        { label: 'Porter menys gols:', type: 'checkbox', defaultValue: false, key: 'porterMenysGols' },
        { label: 'Gol en propia:', type: 'number', defaultValue: 0, key: 'golPropia' },
        { label: 'Fer penalti:', type: 'number', defaultValue: 0, key: 'ferPenalti' },
        { label: 'Fer directe:', type: 'number', defaultValue: 0, key: 'ferDirecte' },
        { label: 'Fer blava:', type: 'number', defaultValue: 0, key: 'ferBlava' },
        { label: 'Fer vermella:', type: 'number', defaultValue: 0, key: 'ferVermella' },
        { label: 'Gol al porter:', type: 'number', defaultValue: 0, key: 'golPorter' }
    ];

    // Guardar inputs para su acceso posterior
    const playerInputs = {};

    fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'fieldGroup';

        const fieldLabel = document.createElement('label');
        fieldLabel.textContent = field.label;
        fieldDiv.appendChild(fieldLabel);

        const fieldInput = document.createElement('input');
        fieldInput.type = field.type;
        if (field.type === 'number') {
            fieldInput.defaultValue = field.defaultValue;
        } else if (field.type === 'checkbox') {
            fieldInput.defaultChecked = field.defaultValue;
        }
        fieldDiv.appendChild(fieldInput);

        // Asociar el input con su clave
        playerInputs[field.key] = fieldInput;

        statsDiv.appendChild(fieldDiv);
    });

    playerDiv.appendChild(statsDiv);

    // Guardar datos del jugador
    playerData.push({ idPlayer: player.id, playerName: player.name, partitsSenseGol: player.partitsSenseGol, pos: player.position, inputs: playerInputs });

    // Agregar el div del jugador al contenedor principal
    divAdminPoints.appendChild(playerDiv);
});
// Crear y agregar el botón para guardar datos
const saveButton = document.createElement('button');
saveButton.textContent = 'Guardar Datos';
saveButton.addEventListener('click', async () => {
    try {
        const playersToSave = playerData.map(player => {
            const playerInfo = {
                idPlayer: player.idPlayer,
                playerName: player.playerName,
                partitsSenseGol: player.partitsSenseGol,
                pos: player.pos,
            };

            // Agregar inputs dinámicos
            for (const [key, input] of Object.entries(player.inputs)) {
                playerInfo[key] = input.type === 'checkbox' ? input.checked : Number(input.value);
            }

            return playerInfo;
        });

        // Enviar datos al servidor como un array
        const response = await fetch(`${BASE_URL}/api/points/savePoints`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playersToSave),
        });

        if (!response.ok) {
            const errorResponse = await response.json().catch(() => ({ message: 'Error desconocido' }));
            console.error("Error al guardar datos:", errorResponse);
            alert(`Error al guardar datos: ${errorResponse.message}`);
            return;
        }

        alert('Todos los datos se han guardado correctamente.');
    } catch (error) {
        console.error('Error general al guardar datos:', error);
        alert('Hubo un error general al guardar los datos. Revisa la consola para más detalles.');
    }
});

divAdminPoints.appendChild(saveButton);
