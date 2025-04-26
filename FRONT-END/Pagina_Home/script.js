document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    getTeachers();
    }
    
    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            .main-nav.active {
                display: block;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                padding: 1rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 50;
            }
            
            .main-nav.active ul {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});
async function getTeachers(){
    const url = 'http://localhost:8080/teacher';
    const container = document.querySelector('.teachers-grid');
    container.innerHTML = ''; 
    let data = [];
    let index;
    await fetch(url)
        .then((res) => res.json())
        .then((resp) => data = resp)
        .catch((err) => console.error(err));
    index = data.length > 3 ? 3 :data.length;
    console.log(data)
    for (let i = 0; i < index; i++) {
        console.log(data[i]);
        container.innerHTML += `
             <a href="teachers.html" class="teacher-card">
              <div class="teacher-image">
                <img
                  src="https://placehold.co/150x150"
                  alt="${data[i].name}"    
                />
              </div>
              <h3>${data[i].name}</h3>
              <p>${data[i].areaTeaching}</p>
              <span class="teacher-link">Ver perfil</span>
            </a>
        
        
        `
       
    }
    

}