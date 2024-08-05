
/*vALIDAÇÃO DE EMAILS*/
const form = document.getElementById("formInitial");
const emailInput = document.getElementById("email");
const warning = document.querySelector(".alert-error-email");
const errorEmail = document.getElementById("error-email");

form.addEventListener("submit", function(event){
    event.preventDefault();

    if(checkInputDados()) {
        window.location.href = "continue-page.html";
    }
})


function checkInputDados() {
    let emailValue = emailInput.value;
    let isValid = true;

    if((emailValue === "") || !checkInputEmail(emailValue)) {
        warning.style.display = 'flex';
        emailInput.style.border = '3px solid #a8200d';
        isValid = false;
    }
    return isValid;
}


function checkInputEmail() {
    const emailValue = email.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formItem = email.parentElement;
}

/*PESQUISA*/
function filterFunction() {
    const searchInput = document.querySelector('.search-input');
    const filter = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.search-list .search-item');

    items.forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

function selectItem(value, imgSrc) {
    const searchInput = document.querySelector('#search-input');
    searchInput.value = value;

    // Fechar a lista após a seleção
    document.querySelector('.search-list').style.display = 'none';
}

document.querySelector('.search-button').addEventListener('click', () => {
    const list = document.querySelector('.search-list');
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
});

// Fechar a lista ao clicar fora
document.addEventListener('click', (event) => {
    const select = document.querySelector('.search-select');
    if (!select.contains(event.target)) {
        document.querySelector('.search-list').style.display = 'none';
    }
});