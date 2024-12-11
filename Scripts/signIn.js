import User from "../Models/User.js";

const form = document.getElementById('signInForm');


form.addEventListener('submit', async (event) => {
    // Prevenir el env�o por defecto (para que no recargue la p�gina)
    event.preventDefault();

    // Capturar los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;

    const user = new User(nombre, password, 'user');

    const exists = await user.getUserByUsername(user.userName);

    if (exists != null) {
        user.signIn(exists);
    } else {
        alert("Aquest usuari no existeix");
    }

});




