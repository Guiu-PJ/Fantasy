import League from "../Models/League.js";
import Team from "../Models/Team.js";
import Player from "../Models/Player.js";
import Team_Player from "../Models/Team_Player.js";
import { firestore, writeBatch } from "../BDD/Firebase.js";

const benvingut = document.getElementById('benvingut');
const btnCrearLiga = document.getElementById('btnCrearLiga');
const btnUnirseLiga = document.getElementById('btnUnirseLiga');
const btnTancarSessio = document.getElementById('btnTancarSessio');
const divCrearLiga = document.getElementById('divCrearLiga');
const divUnirseLiga = document.getElementById('divUnirseLiga');
const btnCrearLigaCerrar = document.getElementById('btnCrearLigaCerrar');
const btnCrearLigaConfirmar = document.getElementById('btnCrearLigaConfirmar');
const btnUnirseLigaConfirmar = document.getElementById('btnUnirseLigaConfirmar');
const btnAdmin = document.getElementById('btnAdmin');
const divTeams = document.getElementById('divteams');

const user = JSON.parse(sessionStorage.getItem("currentUser"));

document.addEventListener('DOMContentLoaded', () => {

    if (user && user.userName) {
        console.log(user.userName);
        benvingut.textContent = `Benvingut, ${user.userName}!`;
        btnCrearLiga.addEventListener('click', () => {
            divCrearLiga.style.display = 'block';
        });

        btnUnirseLiga.addEventListener('click', () => {
            divUnirseLiga.style.display = 'block';
        });

        btnCrearLigaCerrar.addEventListener('click', () => {
            divCrearLiga.style.display = 'none';
        });

        btnUnirseLigaCerrar.addEventListener('click', () => {
            divUnirseLiga.style.display = 'none';
        });

        btnAdmin.addEventListener('click', () => {
            window.location.href = '/Views/admin.html';
        });

        btnCrearLigaConfirmar.addEventListener('click', async () => {
            const nombre = document.getElementById('nombre').value;
            const password = document.getElementById('password').value;
            const teamName = document.getElementById('teamName').value;

           // const batch = writeBatch(firestore);

            try {
                const league = new League(nombre, password, user.userName);
                await league.saveLeague();

                const team = new Team(teamName, user.id, league.id);
                await team.saveTeam();

                await Team_Player.random3players(team.id, user.id, league.id);

                /*
                // Guardar liga
                const leagueRef = league.getFirestoreRef();
                batch.set(leagueRef, league.toJSON());

                // Crear equipo y guardarlo
                const team = new Team(teamName, user.id, league.id);
                const teamRef = team.getFirestoreRef();
                batch.set(teamRef, team.toJSON());

                // Obtener jugadores aleatorios
                const randomPlayers = await Player.getRandomPlayers();

                // Guardar jugadores en el batch
                randomPlayers.forEach(player => {
                    const teamPlayer = new Team_Player(player.id, player.name, user.id, team.id, league.id, player.base_price, player.base_price, player.position, "b");
                    const teamPlayerRef = teamPlayer.getFirestoreRef();
                    batch.set(teamPlayerRef, teamPlayer.toJSON());
                });

                // Ejecutar batch
                await batch.commit();

                divCrearLiga.style.display = 'none';
                alert('Lliga creada');*/
            } catch (error) {
                console.error('Error al guardar la liga:', error);
                alert('Error al crear la lliga');
            }
        });

        btnUnirseLigaConfirmar.addEventListener('click', async () => {
            const leagueIdUnirse = document.getElementById('leagueIdUnirse').value;
            const password = document.getElementById('passwordUnirse').value;
            const teamName = document.getElementById('teamNameUnirse').value;

            try {
                const league = await League.getById(leagueIdUnirse);
                console.log(league.password);
                console.log(password);
                if (league != null && league.password == password) {
                    const team = new Team(teamName, user.id, league.id);
                    await team.saveTeam();

                    await Team_Player.random3players(team.id, user.id, league.id);

                    divUnirseLiga.style.display = 'block';
                } else {
                    alert('Id de la lliga o contrasenya incorrectes');
                }

            } catch (error) {
                console.error('Error al unir-se a la liga:', error);
                alert('Error al unir-se a la lliga');
            }

        });

        btnTancarSessio.addEventListener('click', () => {
            window.location.href = '/index.html';
            sessionStorage.clear();
        });

        
        showUserteams();


    } else {
        console.error("No se encontr� ning�n usuario en sessionStorage.");
        benvingut.textContent = "Benvingut, visitant!";
    }

});


async function showUserteams() {
    try {
        const userTeams = await Team.getTeamsByUserId(user.id);
        console.log(userTeams);

        divTeams.innerHTML = '';

        if (userTeams.length > 0) {
            userTeams.forEach(teamData => {

                const team = new Team(teamData.name, teamData.idUser, teamData.idLeague);
                team.id = teamData.id;
                team.money = teamData.money;

                const teamDiv = document.createElement('div');
                teamDiv.classList.add('divTeam'); 

                teamDiv.innerHTML = `
                    <h3>${team.name}</h3>
                    <p>Diners: ${team.money}</p>
                    <p>Id lliga: ${team.idLeague}</p>
                `;

                divTeams.appendChild(teamDiv);

                teamDiv.addEventListener('click', () => {
                    handleTeamClick(team);
                });
            });
        } else {
            divTeams.innerHTML = '<p>no tens equips.</p>';
        }
    } catch (error) {
        console.error("Error al obtener los equipos:", error);
        divTeams.innerHTML = '<p>Error al mostrar le equips.</p>';
    }
}

function handleTeamClick(team) {
    sessionStorage.setItem("currentTeam", JSON.stringify(team.toJSON()));
    window.location.href = '/Views/team.html';
}


