<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
const router = useRouter()
const data = ref([]);
let socket = ref(null);

let counter = ref(0);



onMounted(() => {
  socket = new WebSocket('wss://shoeconfigurator.onrender.com/primus');
  socket.addEventListener('open', function (event) {
    console.log('connected');
  });

  
  socket.onmessage = (event) => {
  //push new data to data.value
  let newShoe = JSON.parse(event.data);
  if(newShoe.action === 'create'){
    data.value.push(newShoe);
    console.log("pending" + data.value);
    //make counter the count of the array
    counter.value++;
  }
  if(newShoe.action === "update"){
    let shoe= data.value.find(shoe => shoe._id === newShoe.id);
    if (shoe) {
      // Update the status of the shoe
      shoe.status = newShoe.status;
    }
  }
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
    // Update counter here
    counter.value = data.value.length;
}).catch((err) => {
    router.push('/');
});


let newStage = ref("");
let update = ref("");
const updateStage = (newStage, shoeid) => {
  console.log(newStage);
  socket.send(JSON.stringify({
      id: shoeid,
      status: newStage,
      action: 'update'
    }));
    const fetchurl = "https://shoeconfigurator.onrender.com/api/v1/shoes/" + shoeid;
    //put new stage through api
    fetch(fetchurl, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        body: JSON.stringify({
            status: newStage,
            id: shoeid
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            update.value = "Order updated to: " + newStage;
            console.log(data);
            console.log(update.value);
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

watch(data, () => {
  console.log(counter.value);
})

watch(counter, () => {
  console.log(counter.value);
})
const detail = (orderNumber) => {
  router.push('/shoe?id=' + orderNumber);
}

watch(data, () => {
  console.log(counter.value);
})

watch(counter, () => {
  console.log(counter.value);
})


</script>
<template>
  <div class="container container--full">
    <h1 class="container__item container__item--noBorder">Orders</h1>
    <h1 class="container__item container__item--noBorder">{{counter}}</h1>
  </div>
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
        <a class="btn btn--small btn--blue btn__link" @click="nextStage(shoe.status, shoe._id)">Next stage</a>
        <a class="btn btn--small btn--primary btn__link" @click="detail(shoe.orderNumber)">View</a>
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
        <a class="btn btn--small btn--primary btn__link" @click="detail(shoe.orderNumber)">View</a>
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
        <a class="btn btn--small btn--primary btn__link" @click="detail(shoe.orderNumber)">View</a>
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
        <a class="btn btn--small btn--gray btn__link">Delivered</a>
        <a class="btn btn--small btn--blue btn__link " @click="previousStage(shoe.status, shoe._id)">Previous Stage</a>
        <a class="btn btn--small btn--primary btn__link" @click="detail(shoe.orderNumber)">View</a>
      </li>
    </ul>
  </table>
</template>
<style scoped>
    .container{
        width: 90%;
        margin: 64px auto 64px auto ;
        padding: 0;
        display: grid;
        grid-column-gap: 10%;
        grid-row-gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 45%));
    }

    .container--full{
      width: 100%;
    }

    .container__item{
        border: 1px solid black;
        padding: 16px;
    }
    .container__item--noBorder{
      border: none;
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
    h1{
        margin-top: 100px;
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
    .btn--gray{
        background-color: var(--gray-color);
        color: white;
    }
    .btn--gray:hover{
        cursor: unset;
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