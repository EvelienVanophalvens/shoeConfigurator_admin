<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }
</script>

<template>
    <div class="logo">
        <img class="logo__img" src="../assets/SWEAR_logo.png" alt="logo" />
        <button class="btn btn--small btn--primary" @click="logout">Log out</button>
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
    .btn{
        position: absolute;
        right: 0;
        top: 0;
    }
</style>