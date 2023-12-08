<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const data = ref([]);

fetch("http://localhost:3000/api/v1/shoes", {
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
  <ul class="table">
    <li class="table__row" v-for="shoe in data">
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
      <div class="btn btn--small btn--primary">  <a class="btn__link" href="/shoe/{{shoe._id}}">View</a></div>
    
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
    .table__row:first-child{
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