import User from "../Models/User.js";

const form = document.getElementById('signUpForm');

const loadingIndicator = document.getElementById('loading');

form.addEventListener('submit', async (event) => {
    // Prevenir el env�o por defecto (para que no recargue la p�gina)
    event.preventDefault();

    try {
        // Capturar los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const password = document.getElementById('password').value;
        loadingIndicator.style.display = 'block';
        const newUser = new User(nombre, password, 'user');

        const exists = await newUser.userExists();
        if (!exists) {
            await newUser.saveUser();

        } else {
            alert("Ja existeix un usuari amb aquest nom");
        }
    }catch(error) {
        console.error("Error durante el registro del usuario:", error);
        alert("Ocurri� un error al procesar el formulario. Int�ntalo de nuevo.");
    }finally {
        loadingIndicator.style.display = 'none';
    }

});




