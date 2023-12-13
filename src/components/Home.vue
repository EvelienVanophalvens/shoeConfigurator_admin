<script setup>
    import { onMounted } from 'vue';
    import Shoe from './subcomponents/Shoe.vue'
    //on mount, fetch data from api
    const dataset = ref([null]);
    onMounted(async () => {
        const response = await fetch('https://shoeconfigurator.onrender.com/api/v1/shoes', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        });
        dataset.value = await response.json();
    })
</script>
<template>
    <Shoe :data="dataset"/>
</template>
<style scoped>
</style>