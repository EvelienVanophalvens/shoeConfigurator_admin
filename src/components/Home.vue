<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

fetch("http://localhost:3000/api/v1/shoes", {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem('token'),
  },  
}).then((result) => {
}).then((json) => {
}).catch((err) => {
    router.push('/');
});



</script>
<template>Overview</template>
<style scoped></style>