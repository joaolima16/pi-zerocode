document.addEventListener("DOMContentLoaded", () => {
    renderCourses();
});

const getCouses = async () => {
    const url = "http://localhost:8080/courses/all";
    let dataCourses = [];
    await fetch(url)
        .then((response) => response.json())
        .then((data) => dataCourses = data)
        .catch((err) => console.error(err));
    return dataCourses;
}

const renderCourses = async () => {
    const courses = await getCouses();
    const coursesContainer = document.querySelector(".courses-grid");
    coursesContainer.innerHTML = "";
    for(let i= 0; i <3;i++){
        if(courses.length > 0){
            coursesContainer.innerHTML += `
              <a class="course-card" onClick="redirectToCourse(${courses[i].id})">
                    <div class="course-image">
                        <img
                            src="../IMAGENS/curso.png"
                            alt="Matemática Avançada"
                        />
                        </div>
                        <div class="course-content">
                            <h3>${courses[i].name}</h3>
                            <p>${courses[i].description}</p>
                            <div class="course-meta">
                                  <span class="course-lessons">${courses[i].classrooms.length} Aulas</span>
                                  <span class="course-details"> Ver detalhes</span>
                            </div>
                    </div>
                </a>
        `
        }
    }
  
}
const renderAllCourses = async () => {
    const courses = await getCouses();
    const coursesContainer = document.querySelector(".courses-grid");
    document.querySelector("#btn-details").style.display = "none";
    coursesContainer.innerHTML = "";

  courses.forEach((courses) => {
    
        return coursesContainer.innerHTML += `
              <a class="course-card" onClick="redirectToCourse(${courses.id})">
                    <div class="course-image">
                        <img
                            src="../IMAGENS/curso.png"
                            alt="Matemática Avançada"
                        />
                        </div>
                        <div class="course-content">
                            <h3>${courses.name}</h3>
                            <p>${courses.description}</p>
                            <div class="course-meta">
                                  <span class="course-lessons">${courses.classrooms.length} Aulas</span>
                                  <span class="course-details" onClick="redirectToCourse(${courses.id})">Ver detalhes</span>
                            </div>
                    </div>
                </a>
        `
    })
}
const redirectToCourse = (courseId) => {
    localStorage.removeItem("courseId");
    localStorage.setItem("courseId", courseId);
    window.location.href = "../Modulos_Curso/modulos.html";
}