document.addEventListener('DOMContentLoaded', () => {   
    renderStudentProfile();

});
const renderStudentProfile = async () => {
    const id = localStorage.getItem('id');
    const url =  `http://localhost:8080/students/${id}`;
    await fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
}