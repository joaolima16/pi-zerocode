document.addEventListener('DOMContentLoaded', () => {
    renderTeacher();
});
    const getTeacher = async() => {
    const id = localStorage.getItem('id');
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
    console.log(data);
    document.querySelector(".teacher-name").innerHTML = data.name;
    document.querySelector(".teacher-phone").innerHTML = `Telefone: ${data.phone}`;
    document.querySelector(".teacher-email").innerHTML = `Email: ${data.email}`;
}
console.log(localStorage.getItem('token'));