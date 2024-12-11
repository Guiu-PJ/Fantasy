import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore, writeBatch } from "../BDD/Firebase.js"


class Team_Player {
    constructor(idPlayer, name, idUser, idTeam, price, clause, pos, status) {
        this.id = this.generateUniqueId();
        this.idPlayer = idPlayer;
        this.name = name;
        this.idUser = idUser;
        this.idTeam = idTeam;
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

    static async getAllTeamPlayers(teamid) {
        try {
            const teamPlayersRef = collection(firestore, 'Team_Player');

            const q = query(teamPlayersRef, where('idTeam', '==', teamid));

            const querySnapshot = await getDocs(q);

            const teamPlayers = [];
            querySnapshot.forEach((doc) => {
                teamPlayers.push({ id: doc.id, ...doc.data() });
            });

            return teamPlayers;
        } catch (error) {
            console.error("Error al obtener los Team_Player: ", error);
            throw error; 
        }
    }

    static async updatePlayersStatus(playersToUpdate) {
        try {
            const batch = writeBatch(firestore);

            playersToUpdate.forEach(player => {
                const playerRef = doc(firestore, 'Team_Player', player.id);
                batch.update(playerRef, { status: player.status });
            });

            await batch.commit();
            console.log("Estados de los jugadores actualizados correctamente.");
        } catch (error) {
            console.error("Error al actualizar los estados de los jugadores: ", error);
            throw error;
        }
    }

}

export default Team_Player;
