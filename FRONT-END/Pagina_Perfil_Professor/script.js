document.addEventListener('DOMContentLoaded', () => {
    renderTeacher();
});
const getTeacher = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const url = `http://localhost:8080/teacher/${id}`;
    let data = [];
    await fetch(url)
        .then((res) => res.json())
        .then((response) => data = response)
        .catch((err) => console.log(err));
    renderCourses(data.courses);
    renderSchedules(data.schedules);
    console.log(data);
    return data;
}
const renderTeacher = async () => {
    let data = await getTeacher();

    document.querySelector(".teacher-name").innerHTML = data.name;
    document.querySelector(".teacher-phone").innerHTML = `Telefone: ${data.phone}`;
    document.querySelector(".teacher-email").innerHTML = `Email: ${data.email}`;
}
const renderCourses = async (courses) => {
    const container = document.querySelector("#courses-grid");
    courses.map((index) => {
       container.innerHTML += `
            <div class="card">
            <div class="card-image"></div>
            <div class="card-content">
              <div class="card-title">Nome do curso: ${index.name}</div>
              <div class="card-subtitle">Descrição do curso: ${index.description}</div>
              <div class="card-status">Quantidade de aulas: ${index.classrooms.length}</div>
              <div class="card-price">Preço:  ${formatToReal(index.price)}</div>
            </div>
          </div>
       `
    })
}
const renderSchedules = async(schedules) =>{
    const container = document.querySelector("#schedules-grid");
    schedules.map((index) =>{
        console.log(index);
        container.innerHTML += `
            <div class="card">
            <div class="card-image"></div>
            <div class="card-content">
              <div class="card-title">Nome da aula: ${index.subject}</div>
              <div class="card-subtitle">Status: ${index.status}</div>
              <div class="card-status">Data e hora: ${formatDate(index.scheduleHour)}</div>
            </div>
          </div>
        
        `
    })
}
const formatToReal = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
function verifyLogin() {
    const token = sessionStorage.getItem('token');
    console.log(token);
    if(token){
        
        document.querySelector("#btn-login").style.display = "none";
        document.querySelector("#btn-cadastro").style.display = "none";
        document.querySelector("#btn-sair").style.display = "block";
    }
}
const formatDate = (isoDate) => {
  const data = new Date(isoDate);
  const twoDigits = (n) => String(n).padStart(2, '0');

  return `${twoDigits(data.getDate())}/${twoDigits(data.getMonth() + 1)}/${data.getFullYear()} ${twoDigits(data.getHours())}:${twoDigits(data.getMinutes())}`;
};