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
  let newShoe = JSON.parse(event.data);
  data.value.push(newShoe);
  if (newShoe === 'ping'){
    if (socket.readyState === WebSocket.OPEN) {
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


let newStage = ref("");
let update = ref("");
const updateStage = (newStage, shoeid) => {
    const fetchurl = "https://shoeconfigurator.onrender.com/api/v1/shoes/" + shoeid;
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
            location.reload();
        })
        .catch(err => {
            console.log(err);
            update.value = "Something went wrong";
        })
}
const nextStage = (currentstage, shoeid) => {
    if (currentstage === 'pending') {
        newStage.value = 'processing';
        updateStage(newStage.value, shoeid);
        return 'processing';
    } else if (currentstage === 'processing') {
        newStage.value = 'shipped';
        updateStage(newStage.value, shoeid);
        return 'shipped';
    } else if (currentstage === 'shipped') {
        newStage.value = 'delivered';
        updateStage(newStage.value, shoeid);
        return 'delivered';
    }
}
const previousStage = (currentstage, shoeid) => {
    if (currentstage === 'processing') {
        newStage.value = 'pending';
        updateStage(newStage.value, shoeid);
        return 'pending';
    } else if (currentstage === 'shipped') {
        newStage.value = 'processing';
        updateStage(newStage.value, shoeid);
        return 'processing';
    } else if (currentstage === 'delivered') {
        newStage.value = 'shipped';
        updateStage(newStage.value, shoeid);
        return 'shipped';
    }
}
const removeShoe = (shoeid) => {
    const fetchurl = "https://shoeconfigurator.onrender.com/api/v1/shoes/" + shoeid;
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
          location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
</script>
<template>
  <div class="body">
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
          <a class="btn btn--small btn--red btn__link " @click="removeShoe(shoe._id)">Cancel order</a>
          <a class="btn btn--small btn--blue btn__link" @click="nextStage(shoe.status, shoe._id)">Next stage</a>
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
          <a class="btn btn--small btn--blue btn__link " @click="previousStage(shoe.status, shoe._id)">Previous Stage</a>
          <a class="btn btn--small btn--blue btn__link" @click="nextStage(shoe.status, shoe._id)">Next stage</a>
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
          <a class="btn btn--small btn--blue btn__link " @click="previousStage(shoe.status, shoe._id)">Previous Stage</a>
          <a class="btn btn--small btn--blue btn__link" @click="nextStage(shoe.status, shoe._id)">Next stage</a>
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
          <a class="btn btn--small btn--blue btn__link " @click="previousStage(shoe.status, shoe._id)">Previous Stage</a>
          <a class="btn btn--small btn--blue btn__link" @click="nextStage(shoe.status, shoe._id)">Next stage</a>
          <a class="btn btn--small btn--primary btn__link" :href="'Shoe?id=' + shoe._id">View</a>
        </li>
      </ul>
    </table>
  </div>
</template>
<style scoped>
    div.body{
      background-color: var(--offblack-color);
      color: white;
    }
    table{
        width: 90%;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 64px;
        padding: 0;
        list-style: none;
        border-bottom: 1px solid white;
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
        grid-template-columns: 10% 10% 15% 5% 17% 17% 17%;
        padding: 12px 16px;
        align-items: center;
    }
    .table__row {
    border-top: 1px solid white;
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
    .btn--red{
        background-color: var(--red-color);
        color: white;
    }
    .btn--red:hover{
        background-color: var(--red-color-hover);
        cursor: pointer;
        color: white;
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
    @media screen and (max-width: 930px){
      .btn--blue{
        display: none;
      }
      .btn--red{
        display: none;
      }
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