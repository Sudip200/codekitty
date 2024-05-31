const btn= document.querySelector('.btn')
const login = document.getElementById('login-form')
const register =document.getElementById('register')
console.log(btn)
console.log(login)
console.log(register)
if (btn) {
    btn.addEventListener('click', () => {
        if (btn.innerHTML === 'Login') {
            btn.innerHTML = 'Register';
            login.style.display = 'block';
            register.style.display = 'none';
        } else {
            btn.innerHTML = 'Login';
            login.style.display = 'none';
            register.style.display = 'block';
        }
    });
}
