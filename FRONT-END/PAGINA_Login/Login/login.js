

function loginUser(){
    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;
    var data = {
        email: email,
        password: senha
    }
    fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.token){
            alert("Logado com sucesso!");
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.id);
            window.location.href = "../../Pagina_Home/index.html";
        }
    })
    .catch(error => {
        alert("Erro ao logar")
    });
}