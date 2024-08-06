//Recebe os dados do formulario e chama e recebe o resultado da validção 
function RegisterFormSubmit(event) {
    event.preventDefault();

    let 
    // name = document.querySelector("#name").value, 
    // company = document.querySelector("#company").value, 
    // phone = document.querySelector("#phone").value,
    email = document.querySelector("#email").value;

    //se retornar falso a validação falhou e isso inpedira do cosigo abaixo ser executado 
    if(!validateForm(name, company, email, phone))
        return;

    //Carregamento
    document.querySelector(".spinner").style.display = "inline-block";
   
    //envia os dados 
    sendAsgard(name, company, email, phone);
// Adicionado para depuração
}

//Apos validação dos dados faz a criação da conta e manda um negocio para o funil 
function sendAsgard(name, company, email, phone) 
{
    let a = new XMLHttpRequest();
    (a.withCredentials = !1), 
    a.open("POST",   "https://3sksqeptx3.execute-apia.us-east-1.amazonaws.com/prod/site/request-demo"),
    a.setRequestHeader("Content-Type", "application/json"),(a.onload = function()
    {
        if(a.status === 200) 
        {
            document.querySelector(".spinner").style.display = "none";
            document.querySelector(".conta-success-container").style.display = "flex";
            document.querySelector(".conta-register-container").style.display = "none";
            document.querySelector("#nameRegister").textContent = name.split(' ')[0] + ", verifique sua caixa de entrada no e-mail";
            document.querySelector("#emailRegister").textContent = email;
            unami.track('Signup: Criação de conta');
        } else 
        {
            document.getElementById("errorModal").style.display = "block";
            unami.track('Erro ' + a.status + ': Criação de conta', 
            {
                Event: new Date().toLocaleString('pt-BR', 
                {
                    timeZone: 'America/Sao_Paulo'
                })
            });
        }
    });

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

//Faz a validação dos campos do formulario
function validateForm(name, company, email, phone) {
    let isValid = true;
    clearErrors(); 

    if(name === "") {
        showError("error-name", "Nome: Preenchimento obrigatório");
        isValid = false;
    }

    if(company === "") {
        showError("error-company", "Empresa: `Preenchimento obrigatório");
        isValid = false; 
    }

    if(email === "") {
        showError("error-email", "Email: Preenchimento obrigatório");
        document.querySelector("#email").style.border = '3px solid #a8200d';
        alert("erro")
        isValid = false; 
    } else {
        if(!validateEmail(email)) {
            showError("error-email", "O e-mail informado não é valido");
            document.querySelector("#email").style.border = '3px solid #a8200d';
            isValid = false;
            alert("erro")
        }
    }

    if(phone === "") {
        showError("error-phone", "Telefone: Preenchimento obrigatório");
        isValid = false;
    } else {
        if(!validatePhone(phone)) {
            showError("error-phone", "O telefone informado não é valido");
            isValid = false;
        }
    }
    return isValid;
}

//Validação do e-mail seguindo o regex fornecido 
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//Validação do phone seguindo o regex fornecido 
function validatePhone(phone) {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(phone);
}

//Aplica a mascara no numero de telefone
function applyPhoneMask(element) {
    let value = element.value; 
    if(value.length <= 10) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    element.value = value;
}


//Mostra os erros
function showError(fieldId, message) {
    const errorDiv = document.getElementById(fieldId);
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

//Limpa os erros 
function clearErrors() {
    document.querySelectorAll(".login-error-message").forEach
    (
        function(error) 
        {
            error.textContent = "";
            error.style.display = "none";
        }
    )
}

// document.getElementById("closeModalError").onclick = function() {
//     document.getElementById("errorModal").style.display = "none";
// }