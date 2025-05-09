document.addEventListener("DOMContentLoaded", () => {
    renderClassrooms();

});

const getClassroom = async (id) => {
    const courseId = localStorage.getItem("courseId");
    let dataClassrooms = [];
    const url = `http://localhost:8080/courses/${courseId}`
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
        document.querySelector(".title-course").innerHTML = `<h2>${data.name}</h2>`;
        dataClassrooms = data.classrooms;
    })
    .catch((err) => console.error(err));
    return dataClassrooms;
};
const renderClassrooms = async() =>{
    const dataClassrooms = await getClassroom();
    const classroomsContainer = document.querySelector(".accordion");
    classroomsContainer.innerHTML = "";
    dataClassrooms.map((classroom) =>{
        console.log(classroom)
        return(
            classroomsContainer.innerHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            ${classroom.nameClass}
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Duração da aula: ${formatDuration(classroom.duration)}</div>
                    </div>
                </div>
            `
        )
    })
}
function formatDuration(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
  
    if (horas > 0 && mins > 0) {
      return `${horas}h ${mins}min`;
    } else if (horas > 0) {
      return `${horas}h`;
    } else {
      return `${mins} min`;
    }
  }
  