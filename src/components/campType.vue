<template>
  <div>
    <div class="webTitle"></div>
    <form @submit.prevent="add" class="form-container">
      <h4>CREATE CAMPING</h4>
      <input v-model="camping.name" placeholder="Camping Name" />
      <button type="submit" class="check">Save</button>
    </form>
  </div>
</template>

    
<script>
import axios from "axios";

export default {
    props: {
    changePage: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      camping: {
        Name: "",
      },
    };
  },
  methods: {
    async add() {
      try {
        let response = await axios.post("http://localhost:5038/Camping/create", this.camping);
        console.log(response.data);
        this.changePage("campReserve");
      } catch (error) {
        alert(error.response.data)
        console.error(error);
      }
    },
  },
};
</script>

    
<style>
  
  .form-container {
    width: 500px;
    height: auto;
    padding: 40px;
   
    border-radius: 20px;
    background: transparent;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 12); 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-container h4 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .form-container input[type="email"],
  .form-container input[type="password"] {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .form-container button {
    width: 100%;
    padding: 12px 0;
    margin-top: 20px;
  }
  
  
  </style>