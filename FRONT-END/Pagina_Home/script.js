document.addEventListener('DOMContentLoaded', function() {
  
    getTeachers();
    getCourses();

    }
);
async function getTeachers(){
    const url = 'http://localhost:8080/teacher';
    const container = document.querySelector('.teachers-grid');
    container.innerHTML = ''; 
    let data = [];
    let index;
    await fetch(url)
        .then((res) => res.json())
        .then((resp) => data = resp)
        .catch((err) => console.error(err));
    index = data.length > 3 ? 3 :data.length;

    for (let i = 0; i < index; i++) {
        container.innerHTML += `
             <a  onclick="redirectToTeacher(${data[i].id})" class="teacher-card">
              <div class="teacher-image">
                <img
                 src="../IMAGENS/professor.png"
                  alt="${data[i].name}"    
                />
              </div>
              <h3>${data[i].name}</h3>
              <p>${data[i].areaTeaching}</p>
              <span class="teacher-link">Ver perfil</span>
            </a>
        
        
        `
       
    }
}
const getCourses = async () => {
    const url = "http://localhost:8080/courses/all";
    const container = document.querySelector(".courses-grid");
    container.innerHTML = ""; 
    let data = [];
    let index;

    await fetch(url)
        .then((res) => res.json())
        .then((resp) => data = resp)
        .catch((err) => console.error(err));
    index = data.length > 3 ? 3 :data.length;
    for(let i = 0; i < index; i++) {
        container.innerHTML += `
             <a class="course-card" onClick="redirectToCourse(${data[i].id})">
              <div class="course-image">
                <img
                  src="../IMAGENS/curso.png"
                  alt="${data[i].name}"
                />
              </div>
              <div class="course-content">
                <h3>${data[i].name}</h3>
                <p>${data[i].description}</p>
                <div class="course-meta">
                  <span class="course-lessons">${data[i].classrooms.length} Aulas</span>
                  <span class="course-details">Ver detalhes</span>
                </div>
              </div>
            </a>
        `
    }
}
const redirectToCourse = (courseId) => {
    sessionStorage.removeItem("courseId");
    sessionStorage.setItem("courseId", courseId);
    window.location.href = "../Modulos_Curso/modulos.html";
}
const redirectToTeacher = (id) =>{
    window.location.href = `../Pagina_Perfil_Professor/perfilProfessor.html?id=${id}`;
}
const redirectUser = () =>{
    const role = sessionStorage.getItem('role');
    if(role === 'STUDENT'){
        window.location.href = '../Pagina_Perfil_Aluno/perfilAluno.html';
    }
    if(role === 'TEACHER'){
        window.location.href = '../Pagina_Perfil_Professor/perfilProfessor.html';
    }
}
function redirectToAreaUser(){
    const role = sessionStorage.getItem('role');
    const id = sessionStorage.getItem('id');
    if(!role ) return(alert('Você não está logado!'));
    if(role === 'STUDENT'){
        window.location.href = `../Pagina_Perfil_Aluno/perfilAluno.html?id=${id}`;
    }
    else if(role === 'TEACHER'){
        window.location.href = `../Pagina_Perfil_Professor/perfilProfessor.html?id=${id}`;
    }
}
function verifyLogin() {
    const token = sessionStorage.getItem('token');
    if(token){
        
        document.querySelector("#btn-login").style.display = "none";
        document.querySelector("#btn-cadastro").style.display = "none";
        document.querySelector("#btn-sair").style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", verifyLogin());