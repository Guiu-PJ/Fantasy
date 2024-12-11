import { setDoc, getDoc, doc, collection, query, where, getDocs, firestore } from "../BDD/Firebase.js"


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
            setDoc(doc(firestore,'League', this.id), this.toJSON());
            console.log("Documento añadido con ID:", this.id);
        } catch (e) {
            console.error("Error al añadir el documento: ", e);
        }
    };

    async getAllByUser() {
        try {
            const usersCollection = collection(firestore, 'League');
            const q = query(usersCollection, where('userName', '==', username));
            const querySnapshot = await getDocs(q);
        } catch (e) {

        }
    }


}

export default League;