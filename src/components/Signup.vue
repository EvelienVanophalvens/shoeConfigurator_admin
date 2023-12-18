<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const signup = () => {
    console.log('signup')
    //post request to api: http://localhost:3000/api/v1/users
    fetch ('https://shoeconfigurator.onrender.com/api/v1/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.status === 'success'){
        //redirect to login page with router link
        router.push('/')
        let token = data.data.token
        localStorage.setItem('token', token);
        } else {
            //show error message
            if(data.message.keyPattern.username === 1){
                document.querySelector('.message--error').innerHTML = 'This email is already in use'
                document.querySelector('.message--error').style.display = 'block'
            }else{
                document.querySelector('.message--error').innerHTML = 'Please fill in all fields'
                document.querySelector('.message--error').style.display = 'block'
            }
            
            
        }
    })

    
}

</script>

<template>

    <div class="body">
        <div class="formwrapper">
            <form @submit.prevent="signup" class="form">
                <h1>Sign Up</h1>
                <p>Already have an account? <a href="/">Log in</a></p>
                <p class="message message--error"></p>
                <div class="inputGroup">
                    <div class="input input--small">
                        <label class="input__label" for="firstName">First name</label>
                        <input class="input__field" autocapitalize="off" autocorrect="off" type="text" id="firstName" required />
                    </div>
                    <div class="input input--small">
                        <label class="input__label" for="lastName">Last name</label>
                        <input class="input__field" autocapitalize="off" autocorrect="off" type="text" id="lastName" required />
                    </div>
                </div>
                <div class="input">
                    <label class="input__label" for="email">Email</label>
                    <input class="input__field" autocapitalize="off" autocorrect="off" type="email" id="email" required />
                </div>
                <div class="input">
                    <label class="input__label" for="password">Password</label>
                    <input class="input__field" autocapitalize="off" autocorrect="off" type="password" id="password" required />
                </div>
                <div class="input input--btn">
                    <button class="btn btn--small btn--primary" type="submit">Sign up</button>
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
        width: 100vw;
        height: 100vh;
        background: radial-gradient(rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0));
    }
    .form{
        color: white;
        padding: 20px;
        width: 650px;
        margin: 0 auto;
        margin-top: 200px;
        animation: scale-up 0.8s ease-in-out;
    }
    @keyframes scale-up {
        0% {
        transform: scale(0);
        }
        85% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    .inputGroup{
        display: flex;
        justify-content: space-between;
    }

    .input{
        margin: 32px 0 0 0;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .input--small{
        width: 45%;
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
    a{
        color: white;
        text-decoration: none;
    }
    a:hover{
        color: white;
        text-decoration: underline;
    }

</style>