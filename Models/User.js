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
            throw new Error("El ID del equipo no est� definido.");
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

    async saveUser() {
        try {
            //setDoc(doc(firestore,'User', this.id), this.toJSON());
            //console.log("Documento a�adido con ID:", this.id);
            fetch(`${BASE_URL}/api/users/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.toJSON()),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Usuario creado:', data);
                    alert('Usuari creat');
                })
                .catch(error => {
                    console.error('Error al crear usuario:', error);
                    alert("error al crear l'usuari");
                });
        } catch (e) {
            console.error("Error al a�adir el documento: ", e);
        }
    };

    async userExists() {
        try {
            const userCollection = collection(firestore, 'User');

            const q = query(userCollection, where("userName", "==", this.userName));
            const querySnapshot = await getDocs(q);
            console.log("N�mero de documentos encontrados:", querySnapshot.size);
            console.log(querySnapshot);
            return querySnapshot.size > 0;
        } catch (e) {
            console.error("Error verificando la existencia del usuario: ", e);
            throw e;
        }
    }

    async getUserByUsername(username) {
        try {
            const usersCollection = collection(firestore, 'User');
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
        }
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