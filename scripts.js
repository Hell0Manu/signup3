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

/* Email validation */
function checkInputEmail() {
    const emailValue = email.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formItem = email.parentElement;
}
