document.addEventListener('DOMContentLoaded', () => {   
    renderStudentProfile();

});
const renderStudentProfile = async () => {
    const id = sessionStorage.getItem('id');

    const url =  `http://localhost:8080/students/${id}`;
    await fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        document.querySelector(".name-student").innerHTML = `Nome: ${data.name}`;
        document.querySelector(".phone-student").innerHTML = `Telefone: ${data.phone}`;
    })
    .catch((error) => console.error('Error:', error));
}