import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore } from "../BDD/Firebase.js"

const BASE_URL = 'https://fantasybackend-yok6.onrender.com';

class League {
    constructor(name, password, admin) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.password = password;
        this.admin = admin;
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getFirestoreRef() {
        if (!this.id) {
            throw new Error("El ID del equipo no está definido.");
        }
        return doc(firestore, "League", this.id);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            admin: this.admin
        };
    }

    async saveLeague() {
        try {
            const response = await fetch(`${BASE_URL}/api/leagues/createLeague`, { // Asigna el resultado de fetch
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.toJSON()),
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                console.error("Error al crear la lliga:", errorResponse);
                alert("Error al crear la lliga: " + errorResponse.message);
            } else {
                const data = await response.json(); // Procesa la respuesta exitosa
                console.log('Lliga creada:', data);
                alert('Lliga creada');
            }
        } catch (e) {
            console.error("Error al añadir el documento: ", e); // Manejo de errores generales
            alert("Error al añadir el documento");
        }

            /*setDoc(doc(firestore,'League', this.id), this.toJSON());
            console.log("Documento añadido con ID:", this.id);
        } catch (e) {
            console.error("Error al añadir el documento: ", e);
        }*/
    };

    static async getById(leagueId) {
        try {
            let data = [];
            try {
                const response = await fetch(`${BASE_URL}/api/leagues/getById?leagueId=${encodeURIComponent(leagueId)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorResponse = await response.json(); // Procesa el error del servidor
                    console.error("Error al recuperar la liga:", errorResponse);
                    alert("Error al recuperar la lliga: " + errorResponse.message);
                } else {
                    data = await response.json(); // Procesa la respuesta exitosa
                    console.log('lliga recuperada:', data);
                }
            } catch (e) {
                console.error("Error al obtener el documento: ", e); // Manejo de errores generales
                alert("Error al obtener la liga");
            }
            return data;
        } catch(e) {
            console.error("Error al obtener la liga: ", e);
            return null;
        }
    }


}

export default League;