<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    const data = ref([]);
    const urlParams = new URLSearchParams(window.location.search);
    const router = useRouter()
    let newStage = "";
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
    const updateStage = (newStage) => {
        //put new stage through api
        console.log(newStage);
        
    }
    const nextStage = (currentstage) => {
        if(currentstage === 'pending'){
            newStage = 'processing';
            updateStage(newStage);
            return 'processing';
        } else if(currentstage === 'processing'){
            newStage = 'shipped';
            updateStage(newStage);
            return 'shipped';
        } else if(currentstage === 'shipped'){
            newStage = 'delivered';
            updateStage(newStage);
            return 'delivered';
        }
    }
    const previousStage = (currentstage) => {
        if(currentstage === 'processing'){
            newStage = 'pending';
            updateStage(newStage);
            return 'pending';
        } else if(currentstage === 'shipped'){
            newStage = 'processing';
            updateStage(newStage);
            return 'processing';
        } else if(currentstage === 'delivered'){
            newStage = 'shipped';
            updateStage(newStage);
            return 'shipped';
        }
    
    }
</script>

<template>
    <div class="container">
        <div class="container__item">
            <h1>{{ data.shoeName }}</h1>
            <h2>Size: {{ data.shoeSize }}</h2>
            <p>Material: {{ data.innerMaterial }}</p>
            <h3>Colors:</h3>
            <ul class="container__item__list">
                <div class="container__item__list__item"><p>Laces: </p><div class="colorbox" :style="{ backgroundColor: '#' + data.colorLaces }"></div><p>#{{ data.colorLaces }}</p></div>
                <div class="container__item__list__item"><p>Inner Material: </p><div class="colorbox" :style="{ backgroundColor: '#' + data.colorInnerMaterial }"></div><p>#{{ data.colorInnerMaterial }}</p></div>
                <div class="container__item__list__item"><p>Mid Material: </p><div class="colorbox" :style="{ backgroundColor: '#' + data.colorMidMaterial }"></div><p>#{{ data.colorMidMaterial }}</p></div>
                <div class="container__item__list__item"><p>Outer Material: </p><div class="colorbox" :style="{ backgroundColor: '#' + data.colorOuterMaterial }"></div><p>#{{ data.colorOuterMaterial }}</p></div>
                <div class="container__item__list__item"><p>Midsole: </p><div class="colorbox" :style="{ backgroundColor: '#' + data.colorMidsole }"></div><p>#{{ data.colorMidsole }}</p></div>
                <div class="container__item__list__item"><p>Outsole: </p><div class="colorbox" :style="{ backgroundColor: '#' + data.colorOutsole }"></div><p>#{{ data.colorOutsole }}</p></div>
            </ul>
        </div>
        <div class="container__item">
            <h2>{{ data.firstName}} {{ data.lastName }}</h2>
            <ul class="container__item__list">
                <li>{{ data.email }}</li>
                <li>{{ data.phoneNumber }}</li>
                <li>{{ data.orderNumber }}</li>
                <li>{{ formatDate(data.orderDate) }}</li>
                <li>{{ data.status }}</li>
                <div class="spacer"></div>
                <li>{{ data.street }} {{ data.houseNumber }}</li>
                <li>{{ data.zipCode }}</li>
                <li>{{ data.city }}</li>
                <li>{{ data.state }}</li>
                <li>{{ data.country }}</li>
                <li><div class="btn--medium btn--primary" @click="previousStage(data.status)">Previous order stage</div></li>
                <li><div class="btn--medium btn--primary" @click="nextStage(data.status)">Next order stage</div></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .container{
        width: 90%;
        margin: 64px auto 64px auto ;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 32px;
    }
    .container__item{
        border: 1px solid black;
        padding: 16px;
    }
    .container__item__list{
        list-style: none;
        padding: 0;
    }
    .spacer{
        height: 24px;
    }
    .container__item__list__item{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .colorbox{
        width: 100px;
        height: 24px;
        margin-top: 14px;
    }
    .btn--medium{
        width: 200px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        margin-top: 20px;
    }
    .btn--primary{
        background-color: var(--primary-color);
        border: none;
        color: black;
    }
    .btn--medium:hover{
        background-color: var(--primary-color-hover);
        cursor: pointer;
    }
</style>