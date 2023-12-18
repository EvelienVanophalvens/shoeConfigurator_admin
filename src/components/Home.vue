<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
const router = useRouter()
const data = ref([]);
let socket = ref(null);


onMounted(() => {
  socket = new WebSocket('wss://shoeconfigurator.onrender.com/primus');
  socket.addEventListener('open', function (event) {
    console.log('connected');
  });

  
  socket.onmessage = (event) => {
  //push new data to data.value
  console.log(event.data);
  let newShoe = JSON.parse(event.data);
  data.value.push(newShoe);
  console.log(data.value);
  if (newShoe === 'ping'){
    console.log('ping');
    if (socket.readyState === WebSocket.OPEN) {
      console.log('pong');
    socket.send('pong');
  }
  }
  }
});





fetch("https://shoeconfigurator.onrender.com/api/v1/shoes", {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem('token'),
  },  
}).then((result) => {
    return result.json();
}).then((json) => {
    console.log(json)
    data.value = json.data[0].shoes;
}).catch((err) => {
    router.push('/');
});
</script>
<template>
  <h1>Orders</h1>
  <h2>Pending</h2>
  <ul class="table" v-for="shoe in data">
    <li class="table__row" v-if="shoe.status === 'pending'">
      <div class="table__row__item">
        {{shoe.orderNumber}}
      </div>
      <div class="table__row__item">
        {{shoe.firstName}}
      </div>
      <div class="table__row__item">
        {{shoe.shoeName}}
      </div>
      <div class="table__row__item">
        {{shoe.shoeSize}}
      </div>
      <div class="btn btn--small btn--primary">
        <a class="btn__link" :href="'Shoe?id=' + shoe._id">View</a>
      </div>
    </li>
  </ul>
  <h2>Processing</h2>
    <ul class="table" v-for="shoe in data">
      <li class="table__row" v-if="shoe.status === 'processing'">
        <div class="table__row__item">
          {{shoe.orderNumber}}
        </div>
        <div class="table__row__item">
          {{shoe.firstName}}
        </div>
        <div class="table__row__item">
          {{shoe.shoeName}}
        </div>
        <div class="table__row__item">
          {{shoe.shoeSize}}
        </div>
        <div class="btn btn--small btn--primary">
          <a class="btn__link" :href="'Shoe?id=' + shoe._id">View</a>
        </div>
      </li>
    </ul>
  <h2>Shipped</h2>
    <ul class="table" v-for="shoe in data">
      <li class="table__row" v-if="shoe.status === 'shipped'">
        <div class="table__row__item">
          {{shoe.orderNumber}}
        </div>
        <div class="table__row__item">
          {{shoe.firstName}}
        </div>
        <div class="table__row__item">
          {{shoe.shoeName}}
        </div>
        <div class="table__row__item">
          {{shoe.shoeSize}}
        </div>
        <div class="btn btn--small btn--primary">
          <a class="btn__link" :href="'Shoe?id=' + shoe._id">View</a>
        </div>
      </li>
    </ul>
  <h2>Delivered</h2>
    <ul class="table" v-for="shoe in data">
      <li class="table__row" v-if="shoe.status === 'delivered'">
        <div class="table__row__item">
          {{shoe.orderNumber}}
        </div>
        <div class="table__row__item">
          {{shoe.firstName}}
        </div>
        <div class="table__row__item">
          {{shoe.shoeName}}
        </div>
        <div class="table__row__item">
          {{shoe.shoeSize}}
        </div>
        <div class="btn btn--small btn--primary">
          <a class="btn__link" :href="'Shoe?id=' + shoe._id">View</a>
        </div>
      </li>
    </ul>
</template>
<style scoped>

    .table{
        width: 90%;
        margin: 64px auto 64px auto ;
        padding: 0;
        list-style: none;
    }
    h1, h2{
        margin-left: 28px;
    }
    .table__row:not(:only-child):first-child {
    border-bottom: none;
    }
    .table__row{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border: 1px solid black;
    }
    .btn--small{
        width: 120px;
        height: 45px;
        text-align: center;
        line-height: 45px;
    }
    .btn--primary{
        background-color: var(--primary-color);
        border: none;
        color: black;
    }
    .btn__link{
        color: black;
        text-decoration: none;
    }
    .btn__link:hover{
        color: black;
    }
    .btn--primary:hover{
        background-color: var(--primary-color-hover);
        cursor: pointer;
    }
</style>