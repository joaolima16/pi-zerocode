function concluido(){
    alert("Professor editado com sucesso!");
};

async function renderTeacher(){
    const teacher = await getTeacher();
    document.querySelector("#name").value = teacher.name;
    document.querySelector("#email").value = teacher.email;
    document.querySelector("#phone").value = teacher.phone;
    document.querySelector("#areaTeaching").value = teacher.areaTeaching;
    document.querySelector("#valuePerHour").value = teacher.valuePerHour;

}

async function updateTeacher(){
    const id = sessionStorage.getItem('id');
    const url = `http://localhost:8080/teacher/11`;
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const areaTeaching = document.querySelector("#areaTeaching").value;
    const valuePerHour = document.querySelector("#valuePerHour").value;

    const data = {
        name,
        email,
        phone,
        areaTeaching,
        valuePerHour
    };

    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {

        concluido();
    })
    .catch((err) => {
        console.error(err);
    });
}
async function getTeacher(){
    const id = sessionStorage.getItem('id');
    const url = `http://localhost:8080/teacher/${id}`;
    console.log(id);
    let teacher = [];
    await fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      teacher = data;
    })
    .catch((err) => {
        console.error(err);
    });
    return teacher;
}
document.addEventListener("DOMContentLoaded", renderTeacher());