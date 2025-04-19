document.addEventListener('DOMContentLoaded', function () {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Form validation
    const studentForm = document.getElementById('student-register-form');
    const teacherForm = document.getElementById('teacher-register-form');

    if (studentForm) {
        studentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const password = document.getElementById('student-password').value;
            const confirmPassword = document.getElementById('student-confirm-password').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            registerStudent();

        });
    }

    if (teacherForm) {
        teacherForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const password = document.getElementById('teacher-password').value;
            const confirmPassword = document.getElementById('teacher-confirm-password').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            registerTeacher();


        });
    }
});
async function registerStudent() {
    const url = "http://localhost:8080/students/create";

    const name = document.querySelector("#student-name").value;
    const email = document.querySelector("#student-email").value;
    const password = document.querySelector("#student-password").value;
    const cpf = document.querySelector("#student-cpf").value;
    const birthday = document.querySelector("#student-birthday").value;
    const phone = document.querySelector("#student-phone").value;
    const jsonData = JSON.stringify({
        name: name,
        cpf: cpf,
        dateBirth: birthday,
        phone: phone,
        email: email,
        password: password,
    })
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData

    })
        .then((res) => res)
        .then((response) => {
    
            if (response.status == 200) {
                alert("Aluno cadastrado com sucesso!");
                window.location.href = "../Login/login.html";
            }
        })
        .catch((error) => alert("Ocorreu um erro ao cadastrar o aluno!"));
}

const validateCPF = () => {

    let cpfInput = document.getElementById('student-cpf').value;
    let cpf = cpfInput.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        showResult(false);
        return;
    }


    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    primeiroDigito = primeiroDigito >= 10 ? 0 : primeiroDigito;


    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    segundoDigito = segundoDigito >= 10 ? 0 : segundoDigito;
    if (cpf.charAt(9) == primeiroDigito && cpf.charAt(10) == segundoDigito) {
        showResult(true);
    } else {
        showResult(false);
    }
}
function showResult(isValid) {
    const cpfInput = document.getElementById("student-cpf")
    if (isValid == false) {
        alert("CPF invalido!")
        cpfInput.value = ""

    }
}

function registerTeacher() {
    const url = "http://localhost:8080/teacher/create";

    const name = document.querySelector("#teacher-name").value;
    const email = document.querySelector("#teacher-email").value;
    const password = document.querySelector("#teacher-password").value;
    const cpf = document.querySelector("#teacher-cpf").value;
    const birthday = document.querySelector("#teacher-birthday").value;
    const phone = document.querySelector("#teacher-phone").value;
    const area_teaching = document.querySelector("#teacher-specialty").value;
    const jsonData = JSON.stringify({
        name: name,
        cpf: cpf,
        dateBirth: birthday,
        email: email,
        password: password,
        phone: phone,
        areaTeaching: area_teaching
    })

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
                alert("Professor cadastrado com sucesso!");
                window.location.href = "../Login/login.html";
            
        })
        .catch((err) =>{
            alert("Ocorreu um erro ao cadastrar o professor!");
            console.log(err);
        });
}