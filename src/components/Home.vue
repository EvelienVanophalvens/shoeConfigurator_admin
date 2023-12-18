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
  <table>
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
        <a class="btn btn--small btn--primary btn__link" :href="'Shoe?id=' + shoe._id">View</a>
      </li>
    </ul>
  </table>
  <h2>Processing</h2>
  <table>
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
        <a class="btn btn--small btn--primary btn__link" :href="'Shoe?id=' + shoe._id">View</a>
      </li>
    </ul>
  </table>
  <h2>Shipped</h2>
  <table>
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
        <a class="btn btn--small btn--primary btn__link" :href="'Shoe?id=' + shoe._id">View</a>
      </li>
    </ul>
  </table>
  <h2>Delivered</h2>
  <table>
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
        <a class="btn btn--small btn--primary btn__link" :href="'Shoe?id=' + shoe._id">View</a>
      </li>
    </ul>
  </table>
</template>
<style scoped>
    table{
        width: 90%;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 64px;
        padding: 0;
        list-style: none;
        border-bottom: 1px solid black;
    }
    .table{
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
        padding: 0;
        list-style: none;
    }
    h1, h2{
        margin-left: 28px;
    }
    h2{
        margin-top: 64px;
    }
    .table__row{
        display: grid;
        grid-template-columns: 100px 100px 150px 50px 100px;
        padding: 12px 16px;
        align-items: center;
    }
    .table__row {
    border-top: 1px solid black;
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
    @media screen and (max-width: 690px) {
      .table__row{
        grid-template-columns: 100px 100px 50px 100px;
      }
      .table__row__item:nth-child(3){
        display: none;
      }
    }
    @media screen and (max-width: 500px) {
      .table__row{
        grid-template-columns: 100px 100px 100px;
      }
      .table__row__item:nth-child(4){
        display: none;
      }
    }
    @media screen and (max-width: 420px) {
        .table__row{
            grid-template-columns: 100px 1fr;
            grid-template-rows: 30px 30px;
        }
        .table__row__item:nth-child(1){
            grid-column: 1 / 3;
        }
        table{
          margin-left: 8px;
        }
    }
</style>