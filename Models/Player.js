import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore } from "../BDD/Firebase.js"


class Player {
    constructor(name, position, base_price) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.position = position;
        this.base_price = base_price;
        this.points = 0;
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            position: this.position,
            base_price: this.base_price,
            points: this.points
        };
    }

    getFirestoreRef() {
        if (!this.id) {
            throw new Error("El ID del equipo no está definido.");
        }
        return doc(firestore, "Player", this.id);
    }

    async savePlayer() {
        try {
            setDoc(doc(firestore, 'Player', this.id), this.toJSON());
            console.log("Documento añadido con ID:", this.id);
        } catch (e) {
            console.error("Error al añadir el documento: ", e);
        }
    };

    static async getRandomPlayers() {
        try {
            const playersSnapshot = await getDocs(collection(firestore, 'Player'));
            const players = playersSnapshot.docs.map(doc => doc.data());

            const playersJ = players.filter(player => player.position === 'j');
            const playersP = players.filter(player => player.position === 'p');

            if (playersJ.length < 2 || playersP.length < 1) {
                throw new Error("No hay suficientes jugadores en las posiciones requeridas.");
            }

            const randomJ = [];
            while (randomJ.length < 2) {
                const index = Math.floor(Math.random() * playersJ.length);
                if (!randomJ.includes(playersJ[index])) {
                    randomJ.push(playersJ[index]);
                }
            }

            const randomP = playersP[Math.floor(Math.random() * playersP.length)];

            return [...randomJ, randomP];
        } catch (error) {
            console.error("Error obteniendo jugadores aleatorios:", error);
            throw error;
        }
    }

}

export default Player;