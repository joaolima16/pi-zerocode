document.addEventListener('DOMContentLoaded', function() {
     const token = localStorage.getItem('token');
    var loginButton = document.querySelector('#btn-login'); 
    var registerButton = document.querySelector('#btn-register');
    var logoutButton = document.querySelector('#btn-logout');
    if (loginButton && token) { 
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'block';
    }
    const teachers = [
        {
            id: 1,
            name: "Dra. Carolina Silva",
            image: "https://placehold.co/100x100",
            subject: "Matemática",
            rating: 4.9,
            specialty: ["Cálculo", "Álgebra Linear", "Estatística"],
            price: 120,
            available: true,
        },
        {
            id: 2,
            name: "Prof. André Santos",
            image: "https://placehold.co/100x100",
            subject: "Programação",
            rating: 4.7,
            specialty: ["JavaScript", "React", "Node.js"],
            price: 150,
            available: true,
        },
        {
            id: 3,
            name: "Mestra Julia Costa",
            image: "https://placehold.co/100x100",
            subject: "Inglês",
            rating: 4.8,
            specialty: ["Conversação", "Gramática", "Redação"],
            price: 100,
            available: false,
        },
        {
            id: 4,
            name: "Dr. Roberto Almeida",
            image: "https://placehold.co/100x100",
            subject: "Física",
            rating: 4.6,
            specialty: ["Mecânica", "Eletromagnetismo", "Física Moderna"],
            price: 130,
            available: true,
        },
        {
            id: 5,
            name: "Profa. Carla Mendes",
            image: "https://placehold.co/100x100",
            subject: "História",
            rating: 4.5,
            specialty: ["História do Brasil", "História Mundial", "História da Arte"],
            price: 90,
            available: true,
        },
        {
            id: 6,
            name: "Prof. Daniel Oliveira",
            image: "https://placehold.co/100x100",
            subject: "Química",
            rating: 4.4,
            specialty: ["Química Orgânica", "Química Inorgânica", "Bioquímica"],
            price: 110,
            available: false,
        },
    ];
    
    // Filter state
    let filters = {
        subject: "all",
        minRating: 4,
        priceRange: [50, 200],
        availableNow: false,
        availableWeekends: false,
        search: ""
    };
    
    // Render teachers
    function renderTeachers() {
        const teachersGrid = document.getElementById('teachers-grid');
        teachersGrid.innerHTML = '';
        
        // Filter teachers
        const filteredTeachers = teachers.filter(teacher => {
            return (
                (filters.subject === "all" || teacher.subject === filters.subject) &&
                teacher.rating >= filters.minRating &&
                teacher.price >= filters.priceRange[0] &&
                teacher.price <= filters.priceRange[1] &&
                (!filters.availableNow || teacher.available) &&
                (filters.search === "" || 
                 teacher.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                 teacher.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
                 teacher.specialty.some(s => s.toLowerCase().includes(filters.search.toLowerCase())))
            );
        });
        
        // Show empty state if no teachers match filters
        if (filteredTeachers.length === 0) {
            teachersGrid.innerHTML = `
                <div class="empty-state">
                    <h2 class="empty-title">Nenhum professor encontrado</h2>
                    <p class="empty-message">Tente ajustar seus filtros de busca</p>
                </div>
            `;
            return;
        }
        
        // Render each teacher
        filteredTeachers.forEach(teacher => {
            const teacherCard = document.createElement('div');
            teacherCard.className = 'teacher-card';
            teacherCard.innerHTML = `
                <div class="teacher-header">
                    <div class="teacher-info">
                        <div class="teacher-avatar">
                            <img src="${teacher.image}" alt="${teacher.name}">
                            <div class="status-indicator ${teacher.available ? 'status-available' : 'status-unavailable'}"></div>
                        </div>
                        <div>
                            <h3 class="teacher-name">${teacher.name}</h3>
                            <p class="teacher-subject">${teacher.subject}</p>
                        </div>
                    </div>
                    <div class="teacher-rating">
                        <i class="fas fa-star"></i>
                        <span>${teacher.rating}</span>
                    </div>
                </div>
                <div class="teacher-body">
                    <div class="teacher-tags">
                        ${teacher.specialty.map(spec => `<span class="teacher-tag">${spec}</span>`).join('')}
                    </div>
                    <div class="teacher-meta">
                        <div class="teacher-price">
                            R$ ${teacher.price}/hora
                        </div>
                        <div class="teacher-availability">
                            <i class="fas fa-calendar"></i>
                            ${teacher.available ? 'Disponível hoje' : 'Indisponível hoje'}
                        </div>
                    </div>
                </div>
                <div class="teacher-footer">
                    <button class="btn btn-outline btn-sm message-btn" data-id="${teacher.id}" data-name="${teacher.name}">
                        <i class="fas fa-comment"></i> Mensagem
                    </button>
                    <button class="btn btn-primary btn-sm schedule-btn" data-id="${teacher.id}" data-name="${teacher.name}" data-price="${teacher.price}" ${!teacher.available ? 'disabled' : ''}>
                        Agendar aula
                    </button>
                </div>
            `;
            teachersGrid.appendChild(teacherCard);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.message-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const teacherId = this.getAttribute('data-id');
                const teacherName = this.getAttribute('data-name');
                openMessageModal(teacherId, teacherName);
            });
        });
        
        document.querySelectorAll('.schedule-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const teacherId = this.getAttribute('data-id');
                const teacherName = this.getAttribute('data-name');
                const teacherPrice = this.getAttribute('data-price');
                openScheduleModal(teacherId, teacherName, teacherPrice);
            });
        });
    }
    
    // Initialize range sliders
    const ratingSlider = document.getElementById('rating');
    const ratingValue = document.getElementById('rating-value');
    
    ratingSlider.addEventListener('input', function() {
        ratingValue.textContent = this.value;
        filters.minRating = parseFloat(this.value);
    });
    
    // Price range slider (simplified for this example)
    const priceRangeSlider = document.getElementById('price-range');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    
    priceRangeSlider.addEventListener('input', function() {
        const value = this.value.split(',');
        if (value.length === 2) {
            priceMin.textContent = value[0];
            priceMax.textContent = value[1];
            filters.priceRange = [parseInt(value[0]), parseInt(value[1])];
        }
    });
    
    // Filter form
    const filterForm = document.getElementById('filter-form');
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        filters.subject = document.getElementById('subject').value;
        filters.availableNow = document.getElementById('available-now').checked;
        filters.availableWeekends = document.getElementById('available-weekends').checked;
        
        renderTeachers();
    });
    
    // Search
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function() {
        filters.search = this.value;
        renderTeachers();
    });
    
    // Modal functionality
    function openMessageModal(teacherId, teacherName) {
        document.getElementById('message-teacher-name').textContent = teacherName;
        document.getElementById('message-modal').classList.add('active');
    }
    
    function openScheduleModal(teacherId, teacherName, teacherPrice) {
        document.getElementById('schedule-teacher-name').textContent = teacherName;
        document.getElementById('schedule-price').textContent = teacherPrice;
        document.getElementById('schedule-modal').classList.add('active');
        
        // Update price when duration changes
        document.getElementById('duration').addEventListener('change', function() {
            const duration = parseInt(this.value);
            const price = parseInt(teacherPrice);
            document.getElementById('schedule-price').textContent = (price * duration / 60).toFixed(2);
        });
    }
    
    document.getElementById('close-message-modal').addEventListener('click', function() {
        document.getElementById('message-modal').classList.remove('active');
    });
    
    document.getElementById('send-message').addEventListener('click', function() {
        alert('Mensagem enviada com sucesso!');
        document.getElementById('message-modal').classList.remove('active');
    });
    
    document.getElementById('close-schedule-modal').addEventListener('click', function() {
        document.getElementById('schedule-modal').classList.remove('active');
    });
    
    document.getElementById('confirm-schedule').addEventListener('click', function() {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        if (!date || !time) {
            alert('Por favor, selecione uma data e horário.');
            return;
        }
        
        alert('Aula agendada com sucesso!');
        document.getElementById('schedule-modal').classList.remove('active');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Initial render
    renderTeachers();
});
function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    alert("Deslogado com sucesso!");
    window.location.href = "../PAGINA_Login/Login/login.html";
}