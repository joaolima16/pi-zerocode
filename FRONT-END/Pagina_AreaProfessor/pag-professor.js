var teacherPrice = 0;
var teacherId = 0;
document.addEventListener('DOMContentLoaded', async function () {
    const teachers = await getTeachers();

    function renderTeachers() {
        const teachersGrid = document.getElementById('teachers-grid');
        teachersGrid.innerHTML = '';

        if (teachers.length === 0) {
            teachersGrid.innerHTML = `
                <div class="empty-state">
                    <h2 class="empty-title">Nenhum professor encontrado</h2>
                    <p class="empty-message">Tente novamente mais tarde.</p>
                </div>
            `;
            return;
        }

        teachers.forEach(teacher => {
            const teacherCard = document.createElement('div');
            teacherCard.className = 'teacher-card';
            teacherCard.innerHTML = `
                <div class="teacher-header">
                    <div class="teacher-info">
                        <div>
                            <h3 class="teacher-name">${teacher.name}</h3>
                            <p class="teacher-subject">${teacher.areaTeaching}</p>
                        </div>
                    </div>
                    <div class="teacher-rating"> 
                        <a onclick="redirectPage(${teacher.id})" class="btn btn-outline btn-sm details-btn">
                            Detalhes
                        </a>
                    </div>
                </div>
                <div class="teacher-body">
                    <div class="teacher-meta">
                        <div class="teacher-price">
                            ${formatToReal(teacher.valuePerHour)}/hora
                        </div>
                        <div class="teacher-availability"></div>
                    </div>
                </div>
                <div class="teacher-footer">
                    <button class="btn btn-primary btn-sm schedule-btn" data-id="${teacher.id}" data-name="${teacher.name}" data-price="${teacher.valuePerHour}">
                        Agendar aula
                    </button>
                </div>
            `;
            teachersGrid.appendChild(teacherCard);
        });

        // Event listeners dos botões
        document.querySelectorAll('.message-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const teacherId = this.getAttribute('data-id');
                const teacherName = this.getAttribute('data-name');
                openMessageModal(teacherId, teacherName);
            });
        });

        document.querySelectorAll('.schedule-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const teacherId = this.getAttribute('data-id');
                const teacherName = this.getAttribute('data-name');
                const teacherPrice = this.getAttribute('data-price');
                openScheduleModal(teacherId, teacherName, teacherPrice);
            });
        });
    }

    // Modal Functions (mantidas)
    function openMessageModal(teacherId, teacherName) {
        document.getElementById('message-teacher-name').textContent = teacherName;
        document.getElementById('message-modal').classList.add('active');
    }

    function openScheduleModal(idTeacher, teacherName, priceTeacher) {
        if (!validateLogin()) return;
        document.getElementById('schedule-teacher-name').textContent = teacherName;
        document.getElementById('schedule-price').textContent = priceTeacher;
        document.getElementById('schedule-modal').classList.add('active');
        teacherPrice = priceTeacher;
        teacherId = idTeacher;


        document.getElementById('duration').addEventListener('change', function () {
            const duration = parseInt(this.value);
            const price = parseInt(priceTeacher);
            document.getElementById('schedule-price').textContent = (price * duration).toFixed(2);
        });
    }

    // Modal Events



    document.getElementById('close-schedule-modal').addEventListener('click', function () {
        document.getElementById('schedule-modal').classList.remove('active');
    });

    document.getElementById('confirm-schedule').addEventListener('click', async function () {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const topic = document.getElementById('topic').value;
        var localDateTime = '';
        if (!date || !time) {
            alert('Por favor, selecione uma data e horário.');
            return;
        }
        if (date && time) {
             localDateTime = `${date}T${time}`; 
        }
        const response = await scheduler(localDateTime, topic, sessionStorage.getItem('id'), teacherId);
       console.log(response);
        if(response == true){
            alert('Aula agendada com sucesso!');
        }
        else{
            alert('Erro ao agendar aula. Tente novamente mais tarde.');
        }
        document.getElementById('schedule-modal').classList.remove('active');
    });

    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    renderTeachers();
});

// Funções auxiliares mantidas
async function getTeachers() {
    const url = "http://localhost:8080/teacher";
    let teachers = [];
    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => teachers = data)
        .catch((err) => console.log(err))
    return teachers;
}

const redirectPage = (id) => {
    window.location.href = `/FRONT-END/Pagina_Perfil_Professor/perfilProfessor.html?id=${id}`;
}

const validateLogin = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar essa página!');
        window.location.href = '../PAGINA_Login/Login/login.html';
        return false;
    }
    return true;
}

const formatToReal = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
async function scheduler(date, topic, idStudent, idTeacher) {
    const url = "http://localhost:8080/schedules"
    const jsonData = JSON.stringify({
        studentId: idStudent,
        teacherId: idTeacher,
        subject: topic,
        scheduleHour: date,
        status: "PENDENTE"
    });

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    })
        .then((response) => {
            console.log(response);
            if (response.status == 200) {
                return true;
            }
            if(response.status == 403) {
                console.error('Erro ao agendar aula:', response.statusText);
                return false;
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
}