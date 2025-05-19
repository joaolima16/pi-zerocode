
window.addEventListener('DOMContentLoaded', () => {
    renderStudent();
})

const getStudentData = async () => {
    const id = sessionStorage.getItem('id');
    const url = `http://localhost:8080/students/${id}`;
    let data = [];
    await fetch(url)
        .then((res) => res.json())
        .then((response) => data = response)
        .catch((err) => console.log(err));
    return data;
}
const renderStudent = async() =>{
    const data = await getStudentData();

    document.getElementById("student-name").value = data.name;
    document.getElementById("student-phone").value = data.phone;
    document.getElementById("student-email").value = data.email;
}

const updateStudent = async () => {
    const id = sessionStorage.getItem('id');
    const url = `http://localhost:8080/students/update/${id}`;
    const name = document.getElementById("student-name").value;
    const phone = document.getElementById("student-phone").value;
    const email = document.getElementById("student-email").value;

    const data = {
        name: name,
        phone: phone,
        email: email
    }

    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            alert("Dados atualizados com sucesso!");
            window.location.href = "../Pagina_Home/index.html";
        })
        .catch(error => {
            alert("Erro ao atualizar os dados");
            console.error('Error:', error);
        });
}
const deleteStudent = async () => { 
    const confirmation = confirm("Tem certeza que deseja excluir sua conta?");
    if(confirmation){
        const id = sessionStorage.getItem('id');
        const url = `http://localhost:8080/students/delete/${id}`;
        await fetch(url, {
            method: 'DELETE',
       
        })
            .then(response =>{
                if (response.ok) {
                    alert("Conta excluída com sucesso!");
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('id');
                    sessionStorage.removeItem('role');
                    window.location.href = "../Pagina_home/index.html";
                } else {
                    alert("Erro ao excluir a conta");
                }
            })
            .catch(error => {
                alert("Erro ao excluir a conta");
                console.error('Error:', error);
            });
    }
    else{
        alert("Exclusão cancelada!");
    }
}