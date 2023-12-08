<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()


const login = () => {
    fetch ('http://localhost:3000/api/v1/users/login', {
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
            document.querySelector('.message--error').style.display = 'none'
       } else {
           //show error message
           document.querySelector('.message--error').innerHTML = 'Incorrect email or password'
           document.querySelector('.message--error').style.display = 'block'
       }
            
        
    })

    
}
</script>
<template>
     <div class="form">
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
            <button class="btn btn--small btn--primary" @click="login">Login</button>
        </div>
    </div>
</template>
<style scoped>
    .form{
        padding: 20px;
        width: 650px;
        margin: 0 auto;
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
        border: 1px solid black;
    }
    .btn--small{
        width: 120px;
        height: 45px;
    }

    .btn--primary{
        background-color: var(--primary-color);
        border: none;
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


</style>