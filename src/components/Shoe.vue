<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    const data = ref([]);
    const urlParams = new URLSearchParams(window.location.search);
    const router = useRouter()

    const fetchurl = "https://shoeconfigurator.onrender.com/api/v1/shoes/" + urlParams.get('id');
    fetch(fetchurl, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    }).then((result) => {
        return result.json();
    }).then((json) => {
        data.value = json.data[0].shoe;
        console.log(data.value);
    }).catch((err) => {
        console.log(err);
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);

      return `${day}-${month}-${year} - ${hours}:${minutes}`;
    }
</script>

<template>
    <div>
        <h1>{{ data.shoeName }}</h1>
        <h2>{{ data.shoeSize }}</h2>
        <p>Material: {{ data.innerMaterial }}</p>
        <h3>Colors:</h3>
        <ul>
            <li>Laces: {{ data.colorLaces }}</li>
            <li>Inner Material: {{ data.colorInnerMaterial }}</li>
            <li>Mid Material: {{ data.colorMidMaterial }}</li>
            <li>Outer Material: {{ data.colorOuterMaterial }}</li>
            <li>Outsole: {{ data.colorOutsole }}</li>
            <li>Midsole: {{ data.colorMidsole }}</li>

            <li>Outsole: {{ data.colorOutsole }}</li>
        </ul>
    </div>
    <div>
        <h2>{{ data.firstName}} {{ data.lastName }}</h2>
        <ul>
            <li>{{ data.email }}</li>
            <li>{{ data.phoneNumber }}</li>
            <li>{{ data.orderNumber }}</li>
            <li>{{ formatDate(data.orderDate) }}</li>
            <li>{{ data.status }}</li>
            <li>{{ data.street }}</li>
            <li>{{ data.houseNumber }}</li>
            <li>{{ data.zipCode }}</li>
            <li>{{ data.state }}</li>
            <li>{{ data.city }}</li>
        </ul>
    </div>
</template>

<style scoped></style>