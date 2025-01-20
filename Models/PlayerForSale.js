
const BASE_URL = 'https://fantasybackend-yok6.onrender.com';

class PlayerForSale {
    constructor(name, position, price, idPlayer, idLeague, idTeam) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.position = position;
        this.price = price;
        this.idPlayer = idPlayer;
        this.idLeague = idLeague;
        this.idTeam = idTeam;
        this.offers = 0;
        this.date = null;

    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            position: this.position,
            price: this.price,
            idPlayer: this.idPlayer,
            idLeague: this.idLeague,
            idTeam: this.idTeam,
            offers: this.offers,
            date: this.date,
        };
    }

    static async updateRandomPlayersForSale() {
        try {
            const response = await fetch(`${BASE_URL}/api/market/getRandomPlayersForSale`, { // Asigna el resultado de fetch
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                console.error("Error al actualitzar els playerForSale:", errorResponse);
                alert("Error al actualitzar els playerForSale: " + errorResponse.message);
            } else {
                console.log('Actualitzat els playerForSale:');
                alert('Actualitzat els playerForSale');
            }

        } catch (error) {
            console.error("Error actualizando PlayersForSale:", error);
            throw error;
        }

    }

    static async getPlayersForSale(idLeague) {
        let data = [];
        try {
            const response = await fetch(`${BASE_URL}/api/market/getPlayersForSale?leagueId=${encodeURIComponent(idLeague)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorResponse = await response.json(); // Procesa el error del servidor
                console.error("Error al recuperar els jugadors a la venta:", errorResponse);
                alert("Error al recuperar els jugadors a la venta: " + errorResponse.message);
            } else {
                data = await response.json(); // Procesa la respuesta exitosa
                console.log('jugadors recuperats');
            }
        } catch (e) {
            console.error("Error al obtener el documento: ", e); // Manejo de errores generales
            alert("Error al recuperar els jugadors a la venta");
        }
        console.log(data);
        return data;
    } catch(e) {
        console.error("Error al recuperar els jugadors a la venta2: ", e);
        return [];
    }

}

export default PlayerForSale;
