document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Form validation
    const studentForm = document.getElementById('student-register-form');
    const teacherForm = document.getElementById('teacher-register-form');
    
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('student-password').value;
            const confirmPassword = document.getElementById('student-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            
            // Here you would normally send the form data to your server
            alert('Cadastro de aluno enviado! Em um ambiente real, você receberia um email de confirmação.');
            // Redirect to login page
            // window.location.href = 'login.html';
        });
    }
    
    if (teacherForm) {
        teacherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('teacher-password').value;
            const confirmPassword = document.getElementById('teacher-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            
            // Here you would normally send the form data to your server
            alert('Cadastro de professor enviado! Em um ambiente real, você receberia um email de confirmação e passaria por um processo de verificação.');
            // Redirect to login page
            // window.location.href = 'login.html';
        });
    }
});