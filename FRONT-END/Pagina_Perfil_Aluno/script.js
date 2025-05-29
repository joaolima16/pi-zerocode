document.addEventListener('DOMContentLoaded', () => {
  renderStudentProfile();

});
const renderStudentProfile = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('id');

  const url = `http://localhost:8080/students/${studentId}`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {

      document.querySelector(".name-student").innerHTML = `Nome: ${data.name}`;
      document.querySelector(".phone-student").innerHTML = `Telefone: ${data.phone}`;
      renderStudentCourses(data.purchasedCourses);
      renderStudentSchedules(data.schedules);
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
}
const renderStudentCourses = async (courses) => {
  const container = document.querySelector("#card-courses");
  courses.map((index) => {

    container.innerHTML += `
          <div class="card">
            <div class="card-image"></div>
            <div class="card-content">
              <div class="card-title">Curso: ${index.name}</div>
              <div class="card-subtitle">Descrição: ${index.description}</div>
                <div class="card-subtitle">Quantidade de aulas: ${index.classrooms.length}</div>
            </div>
          </div>
        
        
        `
  })
}
const renderStudentSchedules = async (schedules) => {
  const container = document.querySelector("#card-schedules");
  schedules.map((index) => {
    console.log(index);
    container.innerHTML += `
        <div class="card">
            <div class="card-image"></div>
            <div class="card-content">
              <div class="card-title">Nome da aula:  ${index.subject}</div>
              <div class="card-status">Status: ${index.status}</div>
              <div class="card-date">Data e hora: ${formatDate(index.scheduleHour)}</div>
        
            </div>
          </div>
    `
  })
}
const formatDate = (isoDate) => {
  const data = new Date(isoDate);
  const twoDigits = (n) => String(n).padStart(2, '0');

  return `${twoDigits(data.getDate())}/${twoDigits(data.getMonth() + 1)}/${data.getFullYear()} ${twoDigits(data.getHours())}:${twoDigits(data.getMinutes())}`;
};

function verifyLogin() {
    const token = sessionStorage.getItem('token');
    if(token){
        
        document.querySelector("#btn-login").style.display = "none";
        document.querySelector("#btn-cadastro").style.display = "none";
        document.querySelector("#btn-sair").style.display = "block";
    }
}