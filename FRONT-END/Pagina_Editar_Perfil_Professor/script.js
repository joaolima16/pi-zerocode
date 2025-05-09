function concluido(){
    alert("Professor editado com sucesso!");
};

async function renderTeacher(){
    const teacher = await getTeacher();
    console.log(teacher.phone);
    document.querySelector("#name").value = teacher.name;
    document.querySelector("#email").value = teacher.email;
    document.querySelector("#phone").value = teacher.phone;
    document.querySelector("#areaTeaching").value = teacher.areaTeaching;
    document.querySelector("#valuePerHour").value = teacher.valuePerHour;

}

async function getTeacher(){
    const id = localStorage.getItem('id');
    const url = `http://localhost:8080/teacher/${id}`;
    let teacher = [];
    await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      teacher = data;
    })
    .catch((err) => {
        console.error(err);
    });
    return teacher;
}
document.addEventListener("DOMContentLoaded", renderTeacher());