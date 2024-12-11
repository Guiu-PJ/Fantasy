import User from "../Models/User.js";

const form = document.getElementById('signUpForm');


form.addEventListener('submit', async (event) => {
    // Prevenir el envío por defecto (para que no recargue la página)
    event.preventDefault();

    // Capturar los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;

    const newUser = new User(nombre, password, 'user');

    const exists = await newUser.userExists();
    if (!exists) {
        await newUser.saveUser();
    } else {
        alert("Ja existeix un usuari amb aquest nom");
    }

});




