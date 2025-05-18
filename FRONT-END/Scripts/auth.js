function verifyLogin() {
    const token = sessionStorage.getItem('token');
    if(token){
        
        document.querySelector("#btn-login").style.display = "none";
        document.querySelector("#btn-cadastro").style.display = "none";
        document.querySelector("#btn-sair").style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", verifyLogin());

function logout() {
    alert("Você foi desconectado com sucesso!");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    window.location.href = "../Pagina_Login/Login/login.html";
}