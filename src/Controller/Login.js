document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();// reload wena eka nawathnna use kranwa

    const username = document.getElementById('username').value
    const passswrod = document.getElementById('password').value

    if (username === "admin" && passswrod === "1234"){

        window.location.href = '../index.html';

    }else {

        alert("Login Fail 😢❌")

    }



})
