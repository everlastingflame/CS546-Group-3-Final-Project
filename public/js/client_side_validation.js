const checkString = (str) => {
    if (typeof str !== 'string') {
        throw 'is not a string';
    }
    if (str.trim() === '') {
        throw 'is an empty string';
    }
    if(!str){
        throw 'is undefined';
    }
    return str;
}

const checkUsername = (username) => {
    username = username.trim();

    try{
        checkString(username);
    }
    catch(e){
        throw(`Username ${e}`);
    }

    if(username.length < 3){
        throw('Username is too short');
    }
    if(username.length > 10){
        throw('Username is too long');
    }
    username = username.toLowerCase();
    return username;
}

const checkPassword = (password) => {
    password = password.trim();

    try{
        checkString(password);
    }
    catch(e){
        throw(`Password ${e}`);
    }

    if(password.length < 8){
        throw('Password is too short');
    }
    if(!/\d/.test(password)){
        throw('Password must contain a number');
    }
    if(!/[-!@#$%^&*()_+{}:"<>?=[\],./\\';`~]/.test(password)){
        throw('Password must contain a special character');
    }    
    if(!/[A-Z]/.test(password)){
        throw('Password must contain an uppercase letter');
    }
    return password;
}

const checkEmail = (email) => {
    email = email.trim();

    try{
        checkString(email);
    }
    catch(e){
        throw(`Email ${e}`);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw('Invalid email format');
    }

    return email;
}

const loginForm = document.getElementById('signin-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let formIsValid = true;
        try {
            username = checkUsername(username);
            password = checkPassword(password);
        } catch (error) {
            error = "Either the username or password is invalid. - 400"
            const errorDiv = document.getElementById('error_output');
            errorDiv.style = "display: block";
            errorDiv.innerHTML = error;
            formIsValid = false;
        }

        if (formIsValid) {
            loginForm.submit();
        }
    });
}


let registerForm = document.getElementById('signup-form');

if(registerForm){
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        let email = document.getElementById('email').value;
        let formIsValid = true;

        try {
            username = checkUsername(username);
            password = checkPassword(password);
            confirmPassword = checkPassword(confirmPassword);
            email = checkEmail(email);

            if(password !== confirmPassword){
                throw 'Passwords do not match';
            }
        } catch (error) {
            const errorDiv = document.getElementById('error_output');
            errorDiv.style = "display: block";
            errorDiv.innerHTML = error;
            formIsValid = false;
        }
        if(formIsValid){
            registerForm.submit();
        }
    });
}

console.log("working");