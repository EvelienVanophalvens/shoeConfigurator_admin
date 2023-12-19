<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

let newPassword = ref("");
let confirmPassword = ref("");
let message = ref("");
const router = useRouter()

const changePassword = () => {
    console.log(newPassword.value);
    console.log(confirmPassword.value)
    //check if passwords match
    if (newPassword.value == confirmPassword.value) {
        //put new password through api
        fetch("https://shoeconfigurator.onrender.com/api/v1/users/password", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                password: newPassword.value
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                message.value = "Password changed";
                console.log(data);
                console.log(message.value);
                setTimeout(() => {
                    router.push('/home');
            }, 2000);
            })
            .catch(err => {
                console.log(err);
                message.value = "Something went wrong";
            })
    } else {
        message.value = "Passwords do not match";
    }
}

</script>
<template>
    <div class="body">
        <h1>Change Password</h1>
        <form class="form" @submit.prevent="changePassword">
        <div class="input">
            <label class="input__label" for="newPassword">New Password</label>
            <input class="input__field" type="password" id="newPassword" v-model="newPassword" required />
        </div>
        <div class="input">
            <label class="input__label" for="confirmPassword">Confirm Password</label>
            <input class="input__field" type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <div class="input input--btn">
             <button type="submit" class="btn btn--small btn--primary">change password</button>
        </div>
        <p class="form__error">{{message}}</p>
        </form>
    </div>
</template>
<style scoped>
    .formwrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
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

    
    .input__field{
        padding: 10px;
        border: 1px solid white;
    }

</style>