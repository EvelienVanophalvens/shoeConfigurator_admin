<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const data = ref([]);
const urlParams = new URLSearchParams(window.location.search);
const router = useRouter()
let newStage = ref("");
let update = ref("");
const fetchurl = "https://shoeconfigurator.onrender.com/api/v1/shoes/" + urlParams.get('id');
fetch(fetchurl, {
    headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
    },
}).then((result) => {
    return result.json();
}).then((json) => {
    data.value = json.data[0].shoe;
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
    fetch(fetchurl, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        body: JSON.stringify({
            status: newStage
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            update.value = "Order updated to: " + newStage;
            console.log(data);
            console.log(update.value);
            setTimeout(() => {
                router.push('/home');
        }, 2000);
        })
        .catch(err => {
            console.log(err);
            update.value = "Something went wrong";
        })
}
const nextStage = (currentstage) => {
    if (currentstage === 'pending') {
        newStage.value = 'processing';
        updateStage(newStage.value);
        return 'processing';
    } else if (currentstage === 'processing') {
        newStage.value = 'shipped';
        updateStage(newStage.value);
        return 'shipped';
    } else if (currentstage === 'shipped') {
        newStage.value = 'delivered';
        updateStage(newStage.value);
        return 'delivered';
    }
}
const previousStage = (currentstage) => {
    if (currentstage === 'processing') {
        newStage.value = 'pending';
        updateStage(newStage.value);
        return 'pending';
    } else if (currentstage === 'shipped') {
        newStage.value = 'processing';
        updateStage(newStage.value);
        return 'processing';
    } else if (currentstage === 'delivered') {
        newStage.value = 'shipped';
        updateStage(newStage.value);
        return 'shipped';
    }
}
const goBack = () => {
    //go back to home page
    router.push('/home');
}
const removeShoe = () => {
    fetch(fetchurl, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .then(() => {
            router.push('/home');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
</script>
<template>
    <div class="body">
        <svg @click="goBack" class="icon icon--closeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        <div class="container">
            <div class="container__item">
                <h1>{{ data.shoeName }}</h1>
                <h2>Size: {{ data.shoeSize }}</h2>
                <p>Material: {{ data.innerMaterial }}</p>
                <h3>Colors:</h3>
                <ul class="container__item__list">
                    <div class="container__item__list__item">
                        <p>Laces: </p>
                        <div class="colorbox" :style="{ backgroundColor: '#' + data.colorLaces }"></div>
                        <p>#{{ data.colorLaces }}</p>
                    </div>
                    <div class="container__item__list__item">
                        <p>Inner Material: </p>
                        <div class="colorbox" :style="{ backgroundColor: '#' + data.colorInnerMaterial }"></div>
                        <p>#{{ data.colorInnerMaterial }}</p>
                    </div>
                    <div class="container__item__list__item">
                        <p>Mid Material: </p>
                        <div class="colorbox" :style="{ backgroundColor: '#' + data.colorMidMaterial }"></div>
                        <p>#{{ data.colorMidMaterial }}</p>
                    </div>
                    <div class="container__item__list__item">
                        <p>Outer Material: </p>
                        <div class="colorbox" :style="{ backgroundColor: '#' + data.colorOuterMaterial }"></div>
                        <p>#{{ data.colorOuterMaterial }}</p>
                    </div>
                    <div class="container__item__list__item">
                        <p>Midsole: </p>
                        <div class="colorbox" :style="{ backgroundColor: '#' + data.colorMidsole }"></div>
                        <p>#{{ data.colorMidsole }}</p>
                    </div>
                    <div class="container__item__list__item">
                        <p>Outsole: </p>
                        <div class="colorbox" :style="{ backgroundColor: '#' + data.colorOutsole }"></div>
                        <p>#{{ data.colorOutsole }}</p>
                    </div>
                </ul>
            </div>
            <div class="container__item">
                <h2>{{ data.firstName }} {{ data.lastName }}</h2>
                <ul class="container__item__list">
                    <li>Email: {{ data.email }}</li>
                    <li>Phone number: {{ data.phoneNumber }}</li>
                    <li>Order number: {{ data.orderNumber }}</li>
                    <li>Order date: {{ formatDate(data.orderDate) }}</li>
                    <li>Order Status: {{ data.status }}</li>
                    <div class="spacer"></div>
                    <li>{{ data.street }} {{ data.houseNumber }}</li>
                    <li>{{ data.zipCode }}</li>
                    <li>{{ data.city }}</li>
                    <li>{{ data.state }}</li>
                    <li>{{ data.country }}</li>
                    <li>
                        <div class="btn--medium btn--blue" @click="previousStage(data.status)">Previous order stage</div>
                    </li>
                    <li>
                        <div class="btn--medium btn--blue" @click="nextStage(data.status)">Next order stage</div>
                    </li>
                    <li>
                        <div class="btn--medium btn--primary btn--red" @click="removeShoe()">Remove shoe</div>
                    </li>
                    <li>
                        <p>{{ update }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
    div.body{
      background-color: var(--offblack-color);
      color: white;
    }
    .container{
        width: 90%;
        margin: 100px auto 64px auto ;
        padding: 0;
        display: grid;
        grid-column-gap: 10%;
        grid-row-gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 45%));
    }
    .container__item{
        border: 1px solid white;
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
    .btn--red{
        background-color: var(--red-color);
        color: white;
    }
    .btn--red:hover{
        background-color: var(--red-color-hover);
        cursor: pointer;
    }
    .btn--blue{
        background-color: var(--blue-color);
        color: white;
    }
    .btn--blue:hover{
        background-color: var(--blue-color-hover);
        cursor: pointer;
        color: white;
    }
    .icon{
        width: 44px;
        height: 44px;
    }
    .icon--closeIcon{
        position: absolute;
        top: 50px;
        right: 20px;
        fill: white;
        cursor: pointer;
    }
</style>
