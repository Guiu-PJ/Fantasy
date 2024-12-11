const btnSignUp = document.getElementById('btnSignUp');
const btnSignIn = document.getElementById('btnSignIn');

const BASE_URL = 'https://fantasybackend-yok6.onrender.com';


fetch(`${BASE_URL}/api/saludo`)
    .then(response => response.json())
    .then(data => {
        console.log(data.mensaje); // Muestra "Hola desde el backend!"
    })
    .catch(error => console.error('Error:', error));

btnSignUp.addEventListener('click', () => {
    window.location.href = 'Views/signUp.html'; 
});

btnSignIn.addEventListener('click', () => {
    window.location.href = 'Views/signIn.html'; 
});