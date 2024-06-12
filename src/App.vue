<template>
  <div id="app">
    <h1 class="homeTitle">

      Welcome To Bamiyan Afghanistan

    </h1>
    <ul id="nav">
      <li v-for="page in pages" :key="page.id">
        <button @click="changeActivePage(page.id)" v-show="!page.disabled">
          {{ page.text }}
        </button>
      </li>
    </ul>
    <component :is="activePageComponent" :changePage="changeActivePage" />
  </div>
</template>

<script>
import campRegistration from "./components/campRegistration.vue";
import campLogin from "./components/campLogin.vue";
import campType from "./components/campType.vue";
import campReserve from "./components/campReserve.vue";

export default {
  name: 'App',
  components: {
    campRegistration,
    campLogin,
    campType,
    campReserve,
  },
  data() {
    return {
      activePage: "app",
      pages: [
        { id: "home", text: "Register", disabled: false },
        { id: "login", text: "Login", disabled: false },
        { id: "list", text: "Camp Type", disabled: false },
        { id: "reservation", text: "Reserve", disabled: false },
        { id: "logout", text: "Logout", disabled: false },
      ],
    };
  },
  computed: {
    activePageComponent() {
      switch (this.activePage) {
        case 'home': return campRegistration;
        case 'login': return campLogin;
        case 'list': return campType;
        case 'reservation': return campReserve;
        default: return null;
      }
    }
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      var userId = localStorage.getItem("userId");
      this.pages.forEach(page => {
        page.disabled = ((page.id === "home" || page.id === "login") && userId) ||
                        (["list", "reservation", "logout"].includes(page.id) && !userId);
      });
    },
    changeActivePage(page) {
      if (page === "logout") {
        localStorage.removeItem("userId");
        window.location.reload();
      }
      this.activePage = page;
    },
  },
};
</script>


<style>
.homeTitle{
  color: white;
  margin-bottom: 10vh;
  padding: 20px 40px; 
  border-radius: 10px; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); 
  opacity: 0; 
  animation: fadeIn 1s ease-out forwards; 
}


@keyframes fadeIn {
  from {
    opacity: 0; 
  }
  to {
    opacity: 1; 
  }
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  min-height: 100vh;
  width: 100vw;
  position: relative; 
  background-image: url(../src/assets/1234.webp);
  background-size: cover;
}

#nav {
  position: absolute;
  list-style-type: none; 
  top: 0; 
  left: 0;
  right: 0;
  display: flex;
  justify-content: center; 
  padding: 10px 0; 
}

#nav li {
  margin: 0 10px; 
}

#nav button {
  background: rgba(236, 240, 243, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#nav button:hover, #nav button:focus {
  background-color: #0056b3;
  transform: scale(1.05);
}

#nav button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 