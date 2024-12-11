const btnSignUp = document.getElementById('btnSignUp');
const btnSignIn = document.getElementById('btnSignIn');


btnSignUp.addEventListener('click', () => {
    window.location.href = 'Views/signUp.html'; 
});

btnSignIn.addEventListener('click', () => {
    window.location.href = 'Views/signIn.html'; 
});