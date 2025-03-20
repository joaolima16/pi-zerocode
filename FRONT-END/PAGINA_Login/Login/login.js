document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
   
    
    // Form submission
    const studentForm = document.getElementById('student-login-form');
    const teacherForm = document.getElementById('teacher-login-form');
    
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send the form data to your server
            alert('Login de aluno enviado! Em um ambiente real, você seria redirecionado para sua área de aluno.');
            // Redirect to modules page
            // window.location.href = 'modules.html';
        });
    }
    
    if (teacherForm) {
        teacherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send the form data to your server
            alert('Login de professor enviado! Em um ambiente real, você seria redirecionado para sua área de professor.');
            // Redirect to teacher dashboard
            // window.location.href = 'teacher-dashboard.html';
        });
    }
});