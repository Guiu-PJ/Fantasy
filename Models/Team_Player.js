import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore, writeBatch } from "../BDD/Firebase.js"
const BASE_URL = 'https://fantasybackend-yok6.onrender.com';


class Team_Player {
    constructor(idPlayer, name, idUser, idTeam, idLeague, price, clause, pos, status) {
        this.id = this.generateUniqueId();
        this.idPlayer = idPlayer;
        this.name = name;
        this.idUser = idUser;
        this.idTeam = idTeam;
        this.idLeague = idLeague;
        this.price = price;
        this.clause = clause;
        this.pos = pos;
        this.status = status;
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getFirestoreRef() {
        if (!this.id) {
            throw new Error("El ID del equipo no está definido.");
        }
        return doc(firestore, "Team_Player", this.id);
    }

    toJSON() {
        return {
            id: this.id,
            idPlayer: this.idPlayer,
            name: this.name,
            idUser: this.idUser,
            idTeam: this.idTeam,
            price: this.price,
            clause: this.clause,
            pos: this.pos,
            status: this.status,
        };
    }

    async saveTeam_Player() {
        try {
            setDoc(doc(firestore, 'Team_Player', this.id), this.toJSON());
            console.log("Documento añadido con ID:", this.id);
        } catch (e) {
            console.error("Error al añadir el documento: ", e);
        }
    };

    static async random3players(teamId, userId, leagueId) {
        try {
            const response = await fetch(`${BASE_URL}/api/team_Players/random3Players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teamId, userId, leagueId }),
            });
            
            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                console.error("Error al crear l'equip:", errorResponse);
                alert("Error al crear l'equip: " + errorResponse.message);
            } else {
                const data = await response.json(); // Procesa la respuesta exitosa
                console.log('Equip creat:', data);
                alert('Equip creat');
            }
        } catch (e) {
            console.error("Error al añadir el documento: ", e); // Manejo de errores generales
            alert("Error al añadir el documento");
        }
        
    }

    static async getAllTeamPlayers(teamId) {
        try {

            let data = [];
            try {
                const response = await fetch(`${BASE_URL}/api/team_Players/getByIdTeam?teamId=${encodeURIComponent(teamId)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("a1");
                if (!response.ok) {
                    console.log("e1");
                    const errorResponse = await response.json(); // Procesa el error del servidor
                    console.error("Error al recuperar tus jugadores:", errorResponse);
                    alert("Error al recuperar els jugadors: " + errorResponse.message);
                } else {
                    console.log("a2");
                    data = await response.json(); // Procesa la respuesta exitosa
                    console.log('Jugadors recuperats:', data);
                }
            } catch (e) {
                console.log("e2");
                console.error("Error al obtener el documento: ", e); // Manejo de errores generales
                alert("Error al obtener los jugadores");
            }
            return data;
        } catch (e) {
            console.error("Error al obtener los jugadores: ", e);
            return [];
        }
    }

    static async updatePlayersStatus(playersToUpdate) {
        try {
            const response = await fetch(`${BASE_URL}/api/team_Players/updatePlayerStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playersToUpdate),
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                if (response.status === 403) {
                    console.warn("Restricción de tiempo:", errorResponse);
                    alert("No se permite actualizar entre el viernes a las 20:00 y el lunes a las 08:00.");
                } else {
                    // Manejo general de otros errores
                    console.error("Error al actualitzar l'equip:", errorResponse);
                    alert("Error al actualitzar l'equip: " + errorResponse.message);
                }
            } else {
                const data = await response.json(); // Procesa la respuesta exitosa
                console.log('Equip actualitzat:', data);
                alert('Equip actualitzat');
            }
        } catch (e) {
            console.error("Error al añadir el documento: ", e); // Manejo de errores generales
            alert("Error al añadir el documento");
        }
    }


}

export default Team_Player;
