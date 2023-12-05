<script setup></script>
<template>
     <div class="form">
        <h1>Login</h1>
        <p>Don't have an account? <a href="#">Sign up</a></p>
        <div class="input">
            <label class="input__label" for="email">Email</label>
            <input class="input__field" type="email" id="email" />
        </div>
        <div class="input">
            <label class="input__label" for="password">Password</label>
            <input class="input__field" type="password" id="password" />
        </div>
        <div class="input input--btn">
            <button class="btn btn--small btn--primary">Login</button>
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

</style>