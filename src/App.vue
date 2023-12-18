<script setup>
  import Nav from './components/nav.vue'
  import { ref } from 'vue'
  let shoe = ref();
  let status = ref();
  const handleStatusUpdated = (data) => {
    console.log(data);
    shoe = data.id;
    status = data.status;
    console.log(shoe);
    console.log(status);
    
  }

</script>

<template>

  <Nav />
  <router-view @status-updated="handleStatusUpdated"></router-view>
  

</template>

<style scoped>
</style>
