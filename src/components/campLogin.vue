<template>
    <div>
      <div class="webTitle"></div>
      <form @submit.prevent="login" class="form-container">
        <h4>LOGIN</h4>
        <input v-model="loginData.username" type="text" placeholder="Username" />
        <input
          v-model="loginData.password"
          type="password"
          placeholder="Password"
        />
        <button type="submit" class="login1">Login</button>
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
        loginData: {
          username: "",
          password: "",
        },
      };
    },
    methods: {
      async login() {
        if (!this.loginData.username || !this.loginData.password) {
          alert('Please enter both username and password.');
          return;
        }
        try {
          const response = await axios.post("http://localhost:5038/User/authenticate", this.loginData);
          if (response.data.id) {
            localStorage.setItem('userId', response.data.id);
            console.log("Login successfully.");
            this.changePage("campingType");  
          } else {
            alert("Login failed, please try again.");  
          }
        } catch (error) {
          const errorMessage = error.response ? error.response.data : "Network error or server down.";
          alert(errorMessage);
          console.error("Login Failed:", errorMessage);
        }
      },
    },
  };
  </script>
  
  <style>

  .webTitle h1 {
    font-family: "Arial", sans-serif;
    font-size: 36px;
    margin-top: 10px;
    color: orange;
  }
  
  .form-container {
  margin-top: auto; 
  margin-bottom: auto;
  width: 350px;
  padding: 20px;
  background: transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 12);
  border-radius: 10px;
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


  