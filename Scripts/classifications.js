import Team from "../Models/Team.js";

const divClassifications = document.getElementById('divClassifications');

const user = JSON.parse(sessionStorage.getItem("currentUser"));
const team = JSON.parse(sessionStorage.getItem("currentTeam"));


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const teams = await Team.getAllLeagueTeams(team.idLeague);
        teams.sort((a, b) => b.points - a.points);

        let pos = 1;
        teams.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.classList.add('teamClassifications');
            teamDiv.textContent = `${pos} - ${team.name} - Points: ${team.points}`;
            divClassifications.appendChild(teamDiv);
            pos++;
        });

    } catch (error) {
        console.error("Error loading teams:", error);
    }
});

