document.addEventListener('DOMContentLoaded', () => {
    renderTeacher();
});
    const getTeacher = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = localStorage.getItem('id');
    console.log(id);
    const url = `http://localhost:8080/teacher/${id}`;
    let data = [];
    await fetch(url)
        .then((res) => res.json())
        .then((response) => data = response)
        .catch((err) => console.log(err));
    return data;
}
const renderTeacher = async () =>{
    let data = await getTeacher();

    document.querySelector(".teacher-name").innerHTML = data.name;
    document.querySelector(".teacher-phone").innerHTML = `Telefone: ${data.phone}`;
    document.querySelector(".teacher-email").innerHTML = `Email: ${data.email}`;
}