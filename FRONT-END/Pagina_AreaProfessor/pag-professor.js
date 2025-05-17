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

    function openScheduleModal(teacherId, teacherName, teacherPrice) {
        if (!validateLogin()) return;
        document.getElementById('schedule-teacher-name').textContent = teacherName;
        document.getElementById('schedule-price').textContent = teacherPrice;
        document.getElementById('schedule-modal').classList.add('active');

        document.getElementById('duration').addEventListener('change', function () {
            const duration = parseInt(this.value);
            const price = parseInt(teacherPrice);
            document.getElementById('schedule-price').textContent = (price * duration / 60).toFixed(2);
        });
    }

    // Modal Events
    document.getElementById('close-message-modal').addEventListener('click', function () {
        document.getElementById('message-modal').classList.remove('active');
    });

    document.getElementById('send-message').addEventListener('click', function () {
        alert('Mensagem enviada com sucesso!');
        document.getElementById('message-modal').classList.remove('active');
    });

    document.getElementById('close-schedule-modal').addEventListener('click', function () {
        document.getElementById('schedule-modal').classList.remove('active');
    });

    document.getElementById('confirm-schedule').addEventListener('click', function () {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!date || !time) {
            alert('Por favor, selecione uma data e horário.');
            return;
        }

        alert('Aula agendada com sucesso!');
        document.getElementById('schedule-modal').classList.remove('active');
    });

    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    renderTeachers(); // Renderiza todos os professores sem filtro
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
    const token = localStorage.getItem('token');
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
