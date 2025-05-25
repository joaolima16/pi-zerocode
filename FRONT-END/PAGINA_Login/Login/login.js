function loginUser() {
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

            if (data.token) {
                alert("Logado com sucesso!");
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('role', data.role);
                window.location.href = "../../Pagina_Home/index.html";
            }
        })
        .catch(error => {
            alert("Erro ao logar")
            console.error('Error:', error);
        });
}
