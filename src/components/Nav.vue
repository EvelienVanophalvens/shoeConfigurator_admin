<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref, watchEffect } from 'vue'
    const router = useRouter()
    let hasToken = ref(false);

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }
    const changePassword = () => {
        router.push('/changePassword');
    }
</script>

<template>
    <div class="nav">
        <div class="logo">
            <img class="logo__img" src="../assets/SWEAR_logo.png" alt="logo" />
        </div>
        <div class="btnGroup">
                <button class="btnGroup__btn btn--small btn--primary" @click="changePassword">Change password</button>
                <button class="btnGroup__btn btn--small btn--primary" @click="logout">Log out</button>
            </div>
    </div>
</template>

<style scoped>
    .logo{
        background-color: var(--primary-color);
        display: inline-block;
    }
    .logo__img{
        width: 150px;
        margin: 20px;
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
    .btnGroup{
        display: flex;
        flex-direction: row;
        width: 20%;
        justify-content: space-between;
    }
    .nav{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;

    }
</style>