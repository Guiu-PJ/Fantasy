import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore } from "../BDD/Firebase.js"


class Team {
    constructor(name, idUser, idLeague) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.idUser = idUser;
        this.idLeague = idLeague;
        this.money = 100;
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
            money: this.money
        };
    }

    async saveTeam() {
        try {
            setDoc(doc(firestore, 'Team', this.id), this.toJSON());
            console.log("Documento añadido con ID:", this.id);
        } catch (e) {
            console.error("Error al añadir el documento: ", e);
        }
    };

    static async getTeamsByUserId(idUser) {
        try {
            const teamsRef = collection(firestore, 'Team');

            const q = query(teamsRef, where("idUser", "==", idUser));

            const querySnapshot = await getDocs(q);

            const teams = [];

            querySnapshot.forEach(doc => {
                teams.push({ id: doc.id, ...doc.data() });
            });

            return teams;  
        } catch (e) {
            console.error("Error al obtener los equipos: ", e);
            return [];
        }
    }
}

export default Team;