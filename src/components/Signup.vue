<script setup>

const signup = () => {
    console.log('signup')
    //post request to api: http://localhost:3000/api/v1/users
    fetch ('http://localhost:3000/api/v1/users/signup', {
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
        //router.push('/login')
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
    <div class="form">
        <h1>Sign Up</h1>
        <p class="message message--error"></p>
        <div class="inputGroup">
            <div class="input input--small">
                <label class="input__label" for="firstName">First name</label>
                <input class="input__field" type="text" id="firstName" />
            </div>
            <div class="input input--small">
                <label class="input__label" for="lastName">Last name</label>
                <input class="input__field" type="text" id="lastName" />
            </div>
        </div>
        <div class="input">
            <label class="input__label" for="email">Email</label>
            <input class="input__field" type="email" id="email" />
        </div>
        <div class="input">
            <label class="input__label" for="password">Password</label>
            <input class="input__field" type="password" id="password" />
        </div>
        <div class="input input--btn">
            <button class="btn btn--small btn--primary" @click="signup">Sign up</button>
        </div>
    </div>
</template>

<style scoped>
    .form{
        padding: 20px;
        width: 650px;
        margin: 0 auto;
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

</style>