
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const token = localStorage.getItem('token');
    var loginButton = document.querySelector('#btn-login'); 
    var registerButton = document.querySelector('#btn-register');
    var logoutButton = document.querySelector('#btn-logout');
    if (loginButton && token) { // Garante que o botão existe antes de tentar acessá-lo
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'block';
    }
    
    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            .main-nav.active {
                display: block;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                padding: 1rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 50;
            }
            
            .main-nav.active ul {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});
function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    alert("Deslogado com sucesso!");
    window.location.href = "../PAGINA_Login/Login/login.html";
}