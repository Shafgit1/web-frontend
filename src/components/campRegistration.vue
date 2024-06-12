<template>
  <div>
    <div v-if="user" class="webTitle"></div>
    <form @submit.prevent="register" class="form-container">
      <h4>CREATE AN ACCOUNT</h4>
      <input v-model="user.firstName" placeholder="First Name" />
      <input v-model="user.lastName" placeholder="Last Name" />
      <input v-model="user.username" type="text" placeholder="Username" />
      <input v-model="user.password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    changePage: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async register() {
      if (!this.user.firstName || !this.user.lastName || !this.user.username || !this.user.password) {
        alert('Please fill in all fields.');
        return;
      }
      try {
        const response = await axios.post("http://localhost:5038/User/register", this.user);
        console.log('Registration successful:', response.data);
        this.changePage('login');
      } catch (error) {
        const errorMessage = error.response ? error.response.data : 'Registration failed due to a network error';
        alert(errorMessage);
        console.error('Registration Failed:', errorMessage);
      }
    },
  },
};
</script>

<style>
.form-container {
  width: 500px;
  height: 500px;
  padding: 40px;
  border-radius: 20px;
  background: transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 12); 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.form-container label {
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
  text-align: center;
}

.form-container input[type="email"],
.form-container input[type="password"],
.form-container input {
  width: calc(100% - 20px);
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  appearance: none;
}

.form-container button {
  width: 100%;
  padding: 12px 0;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-container button:hover {
  background-color: #0056b3;
}
</style>