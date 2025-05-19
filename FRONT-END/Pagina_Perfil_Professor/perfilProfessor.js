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
    return data;
}
const renderTeacher = async () => {
    let data = await getTeacher();

    document.querySelector(".teacher-name").innerHTML = data.name;
    document.querySelector(".teacher-phone").innerHTML = `Telefone: ${data.phone}`;
    document.querySelector(".teacher-email").innerHTML = `Email: ${data.email}`;
}
const renderCourses = async (courses) => {
    const container = document.querySelector(".courses-grid");
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
const formatToReal = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}