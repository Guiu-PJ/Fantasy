import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore } from "../BDD/Firebase.js"

const BASE_URL = 'https://fantasybackend-yok6.onrender.com';

class User {
    constructor(userName, password, role) {
        this.id = this.generateUniqueId();
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getFirestoreRef() {
        if (!this.id) {
            throw new Error("El ID del equipo no está definido.");
        }
        return doc(firestore, "User", this.id);
    }

    toJSON() {
        return {
            id: this.id,
            userName: this.userName,
            password: this.password,
            role: this.role
        };
    }

    async saveUser(force) {
        try {
            const response = await fetch(`${BASE_URL}/api/users/createUser/${force}`, { // Asigna el resultado de fetch
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.toJSON()),
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                console.error("Error al crear l'usuari:", errorResponse);
                alert("Error al crear l'usuari: " + errorResponse.message);
            } else {
                const data = await response.json(); // Procesa la respuesta exitosa
                console.log('Usuari creat:', data);
                alert('Usuari creat');
            }
        } catch (e) {
            console.error("Error al añadir el documento: ", e); // Manejo de errores generales
            alert("Error al añadir el documento");
        }
    }

    async userExists() {
        try {
            const userCollection = collection(firestore, 'User');

            const q = query(userCollection, where("userName", "==", this.userName));
            const querySnapshot = await getDocs(q);
            console.log("Número de documentos encontrados:", querySnapshot.size);
            console.log(querySnapshot);
            return querySnapshot.size > 0;
        } catch (e) {
            console.error("Error verificando la existencia del usuario: ", e);
            throw e;
        }
    }

    async getUserByUsername(username) {
        try {
            const response = await fetch(`${BASE_URL}/api/users/getUser/${username}`, { // Asigna el resultado de fetch
                method: 'GET',
            });

            const user = await response.json();
            return user;

        } catch (e) {
            console.error("Error al buscar el jugador: ", e); // Manejo de errores generales
            alert("Error al buscar el jugador");
        }

            /*const usersCollection = collection(firestore, 'User');
            const q = query(usersCollection, where('userName', '==', username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size > 0) {
                const userDoc = querySnapshot.docs[0];
                return { id: userDoc.id, ...userDoc.data() };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error buscando el usuario:", error);
            throw error;
        }*/
    }

    signIn(user) {
        if (user.password == this.password) {
            this.id = user.id;
            this.user = user.user;

            sessionStorage.setItem("currentUser", JSON.stringify(this.toJSON()));
            window.location.href = '/Views/home.html';
        }
        else
            alert("Contrasenya incorrecte");
    }


}

export default User;