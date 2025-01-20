import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore } from "../BDD/Firebase.js"

const BASE_URL = 'https://fantasybackend-yok6.onrender.com';

class Player {
    constructor(name, position, base_price) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.position = position;
        this.base_price = base_price;
        this.points = 0;
        this.partitsSenseGol = 0;
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
            points: this.points,
            partitsSenseGol: this.partitsSenseGol
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
            const response = await fetch(`${BASE_URL}/api/players/createPlayer`, { // Asigna el resultado de fetch
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.toJSON()),
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                console.error("Error al crear el jugador:", errorResponse);
                alert("Error al crear el jugador: " + errorResponse.message);
            } else {
                const data = await response.json(); // Procesa la respuesta exitosa
                console.log('Jugador creat:', data);
                alert('Jugador creat');
            }
        } catch (e) {
            console.error("Error al añadir el documento: ", e); // Manejo de errores generales
            alert("Error al añadir el documento");
        }


        /*try {
            setDoc(doc(firestore, 'Player', this.id), this.toJSON());
            console.log("Documento añadido con ID:", this.id);
        } catch (e) {
            console.error("Error al añadir el documento: ", e);
        }*/
    };

    // no
    /*
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
    }*/

    static async getAllPlayers() {
        try {
            const response = await fetch(`${BASE_URL}/api/players/getAllPlayers`, { // Asigna el resultado de fetch
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                console.error("Error al recuperar todos los jugadores:", errorResponse);
                alert("Error al recuperar todos los jugadores: " + errorResponse.message);
            } else {
                const data = await response.json(); // Procesa la respuesta exitosa
                console.log('Jugadors:', data);
                alert('Jugador recuperats');
                return data;
            }
        } catch (e) {
            console.error("Error al añadir el documento: ", e); // Manejo de errores generales
            alert("Error al añadir el documento");
        }
    }

}

export default Player;