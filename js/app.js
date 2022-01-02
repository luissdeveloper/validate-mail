const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');
const sendMailForm = document.querySelector('#form-send-mail');
const sendBtn = document.querySelector('#submit');
const resetBtn = document.querySelector('#reset');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


loadedFunctions();
function loadedFunctions(){

    document.addEventListener('DOMContentLoaded',sendBtnFun);

    email.addEventListener('blur',formValidate);
    subject.addEventListener('blur',formValidate);
    message.addEventListener('blur',formValidate);

    sendMailForm.addEventListener('submit',sendMailFun);

    resetBtn.addEventListener('click',resetMailForm);
};

function sendBtnFun(){
    sendBtn.classList.add('disabled');
    sendBtn.disabled=true;
}

function formValidate(e){

    if(e.target.value.length > 0){
        const error = document.querySelector('p.error-custom');
        if(error){
            error.remove();
        }
    
        e.target.classList.remove('error');
        e.target.classList.add('enable')
    }else{
        e.target.classList.add('error');
        e.target.classList.remove('enable');
        showError('Todos los campos son requeridos');
    }

    if(e.target.type === 'email'){
        const error = document.querySelector('p.error-custom');
        if(error){
            error.remove();
        }

        if(re.test(e.target.value)){
            e.target.classList.remove('error');
            e.target.classList.add('enable')
        }else{
            e.target.classList.add('error');
            e.target.classList.remove('enable');
            showError('El email no es valido');
        }
    }

    if(re.test(email.value) && subject.value !== '' && message.value !== ''){
        sendBtn.classList.remove('disabled');
        sendBtn.disabled = false;
    }

}


function showError(mensaje){
    const parrafo = document.createElement('p');
    parrafo.textContent = `${mensaje}`;
    parrafo.classList.add('error-custom','mr-2', 'pd-2');
    const errores = document.querySelectorAll('.error-custom');
    if(errores.length === 0){
        sendMailForm.appendChild(parrafo);
    }
    
}

function sendMailFun(e){
    e.preventDefault();

    const spinner  = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(()=>{
        console.log('Se ejecuta 3 segundos');
        spinner.style.display = 'none';
        showSend('Mensaje enviado con exito');
    },3000);
}

function showSend(mensaje){
    const parrafo = document.createElement('p');
    parrafo.textContent = `${mensaje}`;
    parrafo.classList.add('send-custom','mr-2', 'pd-2');

    sendMailForm.appendChild(parrafo);
}

function resetMailForm(e){
    e.preventDefault();

    email.value = '';
    subject.value = '';
    message.value = '';
    const successMessage = document.querySelector('.send-custom');
    if(successMessage){
        successMessage.remove();
    }

    // sendMailForm.reset();

    // sendBtnFun();
}