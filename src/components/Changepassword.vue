<script setup></script>
<template>
    <div class="body">
        <h1>Change Password</h1>
        <form class="form" @submit.prevent="changePassword">
        <div class="input">
            <label class="input__label" for="oldPassword">Old Password</label>
            <input class="input__field" type="password" id="oldPassword" v-model="oldPassword" required />
        </div>
        <div class="input">
            <label class="input__label" for="newPassword">New Password</label>
            <input class="input__field" type="password" id="newPassword" v-model="newPassword" required />
        </div>
        <div class="input">
            <label class="input__label" for="confirmPassword">Confirm Password</label>
            <input class="input__field" type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <div class="input input--btn">
             <button type="submit" class="btn btn--small btn--primary">changePassword</button>
        </div>
        <p class="form__error">{{update}}</p>
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