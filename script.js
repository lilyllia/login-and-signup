let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('themeSwitch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

//form validation portion:

const message = document.getElementById('errorMessage')
const form = document.getElementById('signUpForm')
const nameInput = document.getElementById ('nameInput')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const repeatPasswordInput = document.getElementById('repeatPasswordInput')


form.addEventListener('submit', (e) => {
    let errors = []

    if (nameInput){
        errors = getSignUpErrors(nameInput.value, emailInput.value, passwordInput.value, repeatPasswordInput.value)
    } else {
        errors = getLogInErrors(emailInput.value, passwordInput.value)
    }

    if (errors.length > 0){
        (e).preventDefault()
        message.innerText = errors.join('! ') + "!"
    } else {
        message.innerText = 'Account created sucessfully!'
    }
})

function getSignUpErrors(name, email, password, repeatPassword){
    let errors = []

    if (name === '' || name == null){
        errors.push('Name is required')
        nameInput.parentElement.classList.add('error')
    }
    if (email === '' || email == null){
        errors.push('Email is required')
        emailInput.parentElement.classList.add('error')
    }
    if (password === '' || password == null){
        errors.push('Password is required')
        passwordInput.parentElement.classList.add('error')
    }
    if (password !== repeatPassword){
        errors.push('The passwords do not match')
        passwordInput.parentElement.classList.add('error')
        repeatPasswordInput.parentElement.classList.add('error')
    }
    if (password.length < 8 && password != '' || null){
        errors.push ('The password must have at least 8 characters')
        passwordInput.parentElement.classList.add('error')
    }

    return errors
}

function getLogInErrors(email, password){
    let errors = []

    if (email === '' || email == null){
        errors.push('Email is required')
        emailInput.parentElement.classList.add('error')
    }
    if (password === '' || password == null){
        errors.push('Password is required')
        passwordInput.parentElement.classList.add('error')
    }
    if (password.length < 8 && password != '' || null){
        errors.push ('The password must have at least 8 characters')
        passwordInput.parentElement.classList.add('error')
    }

    return errors
}

let allInputs = [nameInput, emailInput,passwordInput, repeatPasswordInput].filter(input => input!== null)

allInputs.forEach(input => {
    input.addEventListener("input", () =>{
        if(input.parentElement.classList.contains('error')){
            input.parentElement.classList.remove('error')
            message.innerText = ''
        }
    })
})


