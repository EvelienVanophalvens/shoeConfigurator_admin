<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()


const login = () => {
    fetch ('https://shoeconfigurator.onrender.com/api/v1/users/login', {
    // fetch('http://localhost:3000/api/v1/users/login', { //change to this when running locally
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    .then(response => response.json())
    .then(data => {
       if(data.status === 'success'){
            router.push('/home');
           let token = data.data.token;
            localStorage.setItem('token', token);
       } else {
           //show error message
           document.querySelector('.message--error').innerHTML = 'Incorrect email or password'
           document.querySelector('.message--error').style.display = 'block'
       }
    })
}
</script>
<template>
    <div class="body">
        <div class="formwrapper">
            <form @submit.prevent="login" class="form">
                <h1>Login</h1>
                <p>Don't have an account? <a href="/Signup">Sign up</a></p>
                <p class="message message--error"></p>
                <div class="input">
                    <label class="input__label" for="email">Email</label>
                    <input class="input__field" type="email" id="email" />
                </div>
                <div class="input">
                    <label class="input__label" for="password">Password</label>
                    <input class="input__field" type="password" id="password" />
                </div>
                <div class="input input--btn">
                    <button type="submit" class="btn btn--small btn--primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
    div.body{
        background-image: url('../assets/background.png');
    }
    .formwrapper{
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background: radial-gradient(rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0));
    }
    .form{
        color: white;
        padding: 20px;
        width: 650px;
        margin: 0 auto;
        margin-top: 200px;
    }
    .input{
        margin: 32px 0 0 0;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .input__label{
        margin-bottom: 5px;
    }

    .input__field{
        padding: 10px;
        border: 1px solid white;
    }
    .btn--small{
        width: 120px;
        height: 45px;
    }

    .btn--primary{
        background-color: var(--primary-color);
        border: none;
    }
    .btn--primary:hover{
        background-color: var(--primary-color-hover);
        cursor: pointer;
    }
    .input--btn {
        flex-direction: row;
        justify-content: end;
    }

    .message{
        margin-bottom: 0px;
        display: inline-block;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1em;
        font-weight: bold;
    }
    .message--error{
        color: red;
        display: none;
    }
    a{
        color: white;
        text-decoration: none;
    }
    a:hover{
        color: white;
        text-decoration: underline;
    }


</style>