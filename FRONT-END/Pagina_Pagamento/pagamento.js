document.addEventListener('DOMContentLoaded', function () {

    renderCourses();
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

    // Formulário de cartão
    const cardForm = document.getElementById('card-form');
    if (cardForm) {
        cardForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Pagamento processado com sucesso! Em um ambiente real, você seria redirecionado para a página de confirmação.');
        });
    }

    // Botão de copiar código PIX
    const copyButton = document.querySelector('.pix-code .btn');
    if (copyButton) {
        copyButton.addEventListener('click', function () {
            const pixCode = document.querySelector('.pix-code-text').textContent;
            navigator.clipboard.writeText(pixCode).then(() => {
                alert('Código PIX copiado para a área de transferência!');
            });
        });
    }
});
const getCourse = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('courseId');
    const url = `http://localhost:8080/courses/${id}`;
    let dataCourse = [];
    await fetch(url)
        .then((response) => response.json())
        .then((data) => dataCourse = data)
        .catch((err) => console.error(err));

    return dataCourse;
}
const renderCourses = async (data) => {

    const dataCourses = await getCourse();

    document.querySelector(".product-name").innerHTML = dataCourses.name;
    document.querySelector(".product-classrooms").innerHTML = dataCourses.classrooms.length;
    document.querySelector(".product-price").innerHTML = formatToReal(dataCourses.price);
    
}

const formatToReal = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}