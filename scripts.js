// Definir elementos do DOM
const form = document.getElementById("formInitial");
const emailInput = document.getElementById("email");
const warning = document.querySelector(".alert-error-email");
const errorEmail = document.getElementById("error-email");
const phoneInput = document.getElementById("phone");
const errorPhone = document.getElementById("error-phone");

// Adicionar máscara ao telefone
phoneInput.addEventListener('input', function() {
    applyPhoneMask(phoneInput);
});

form.addEventListener('submit', RegisterFormSubmit);

function RegisterFormSubmit(event) {
    event.preventDefault();

    const phone = phoneInput.value;
    const email = emailInput.value;

    if (!validateForm(phone, email)) {
        return;
    }

    document.querySelector(".spinner").style.display = "inline-block";

    // Simule valores para name e company ou adicione campos ao formulário
    sendAsgard("Nome do Usuário", "Nome da Empresa", email, phone);
}

function sendAsgard(name, company, email, phone) {
    let a = new XMLHttpRequest();
    a.withCredentials = false;
    a.open("POST", "https://3sksqeptx3.aexecute-api.us-east-1.amazonaws.com/prod/site/request-demo");
    a.setRequestHeader("Content-Type", "application/json");
    a.onload = function () {
        if (a.status === 200) {
            document.querySelector(".spinner").style.display = "none";
            document.querySelector(".conta-success-container").style.display = "flex";
            document.querySelector(".conta-register-container").style.display = "none";
            document.querySelector("#nameRegister").textContent = name.split(' ')[0] + ", verifique sua caixa de entrada no e-mail";
            document.querySelector("#emailRegister").textContent = email;
            umami.track('Signup: Criação de conta');
        } else {
            document.getElementById("errorModal").style.display = "block";
            umami.track('Erro ' + a.status + ': Criação de conta', {
                Event: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            });
        }
    };
    let r = {
        tituloNegocio: company + " - " + name,
        nome: name,
        email: email,
        celular: phone,
        empresa: company,
        responsavelId: 979,
        campanhaId: null,
        origemId: 1,
        etapaId: 17,
    };
    a.send(JSON.stringify(r));
}

function validateForm(phone, email, nome) {
    let isValid = true;
    clearErrors();

    if (phone === "") {
        showError("error-phone", "Preenchimento do número de telefone obrigatório");
        isValid = false;
        phoneInput.style.border = '3px solid #a8200d';

    } else {
        if (!validatePhone(phone)) {
            showError("error-phone", "O telefone informado não é válido");
            phoneInput.style.border = '3px solid #a8200d';
            isValid = false;
        }
    }

    if (email === "" || !validateEmail(email)) {
       
        showError("error-email", "O email informado não é válido");
        emailInput.style.border = '3px solid #a8200d';
        isValid = false;
    }

    if(nome === ""){
        showError("error-nome", "O preenchimento do nome é obrigatorio");
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(phone);
}

function showError(fieldId, message) {
    warning.style.display = 'flex';
    const errorDiv = document.getElementById(fieldId);

    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

function applyPhoneMask(element) {
    let value = element.value;
    value = value.replace(/\D/g, "");
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    element.value = value;
}

function clearErrors() {
    document.querySelectorAll(".login-error-message").forEach(function (error) {
        error.textContent = "";
        error.style.display = "none";
    });
}

document.getElementById("closeModalError").onclick = function () {
    document.getElementById("errorModal").style.display = "none";
};

/* Preenchimento do select de UF */
document.addEventListener('DOMContentLoaded', function() {
    const jsonData = {
        "UF": [
            // Dados de UF
        ]
    };

    const selectElement = document.getElementById('uf');

    jsonData.UF.forEach(uf => {
        const option = document.createElement('option');
        option.value = uf.sigla;
        option.textContent = `${uf.ddd} (${uf.sigla})`;
        selectElement.appendChild(option);
    });
});
