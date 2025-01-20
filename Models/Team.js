import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore } from "../BDD/Firebase.js"
const BASE_URL = 'https://fantasybackend-yok6.onrender.com';

class Team {
    constructor(name, idUser, idLeague) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.idUser = idUser;
        this.idLeague = idLeague;
        this.money = 100;
        this.points = 0;
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getFirestoreRef() {
        if (!this.id) {
            throw new Error("El ID del equipo no está definido.");
        }
        return doc(firestore, "Team", this.id);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            idUser: this.idUser,
            idLeague: this.idLeague,
            money: this.money,
            points: this.points,
        };
    }

    async saveTeam() {
            try {
            const response = await fetch(`${BASE_URL}/api/teams/createTeam`, { // Asigna el resultado de fetch
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.toJSON()),
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



            /*setDoc(doc(firestore, 'Team', this.id), this.toJSON());
            console.log("Documento añadido con ID:", this.id);
        } catch (e) {
            console.error("Error al añadir el documento: ", e);
        }*/
    };

    static async getTeamsByUserId(idUser) {
        try {
            /*const teamsRef = collection(firestore, 'Team');

            const q = query(teamsRef, where("idUser", "==", idUser));

            const querySnapshot = await getDocs(q);

            const teams = [];

            querySnapshot.forEach(doc => {
                teams.push({ id: doc.id, ...doc.data() });
            });*/
            let data = [];
            try {
                const response = await fetch(`${BASE_URL}/api/teams/getByUserId?userId=${encodeURIComponent(idUser)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("a1");
                if (!response.ok) {
                    console.log("e1");
                    const errorResponse = await response.json(); // Procesa el error del servidor
                    console.error("Error al recuperar tus equipos:", errorResponse);
                    alert("Error al recuperar els equips: " + errorResponse.message);
                } else {
                    console.log("a2");
                    data = await response.json(); // Procesa la respuesta exitosa
                    console.log('Equips recuperats:', data);
                }
            } catch (e) {
                console.log("e2");
                console.error("Error al obtener el documento: ", e); // Manejo de errores generales
                alert("Error al obtener los equipos");
            }
            console.log(data);
            return data;  
        } catch (e) {
            console.error("Error al obtener los equipos: ", e);
            return [];
        }
    }

    static async getAllLeagueTeams(idLeague) {
        try {
            let data = [];
            try {
                const response = await fetch(`${BASE_URL}/api/teams/getAllLeagueTeams?idLeague=${encodeURIComponent(idLeague)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("a1");
                if (!response.ok) {
                    console.log("e1");
                    const errorResponse = await response.json(); // Procesa el error del servidor
                    console.error("Error al recuperar las classificaciones:", errorResponse);
                    alert("Error al recuperar les classificacions: " + errorResponse.message);
                } else {
                    console.log("a2");
                    data = await response.json(); // Procesa la respuesta exitosa
                    console.log('Classificacions recuperades:', data);
                }
            } catch (e) {
                console.log("e2");
                console.error("Error al obtener el documento: ", e); // Manejo de errores generales
                alert("Error al obtener las classificaciones");
            }
            return data;
        } catch(e) {
            console.error("Error al obtener las classificaciones: ", e);
            return [];
        }
    }
}

export default Team;