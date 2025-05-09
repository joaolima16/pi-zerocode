function verifyLogin() {
    const token = localStorage.getItem('token');
    if(token){
        
        document.querySelector("#btn-login").style.display = "none";
        document.querySelector("#btn-cadastro").style.display = "none";
    }
}
document.addEventListener("DOMContentLoaded", verifyLogin());