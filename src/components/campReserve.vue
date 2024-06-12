<template>
  <div>
    <div class="webTitle"></div>
    <form @submit.prevent="add" class="form-container">
      <h4>BOOKING FORM</h4>
      <select v-model="booking.campingId" required>
        <option value="" disabled>Select a Camping</option>
        <option v-for="camp in campingList" :key="camp.id" :value="camp.id">
          {{ camp.name }}
        </option>
      </select>
      <select v-model="booking.campingTypeId" required>
        <option value="" disabled>Select a Camping Type</option>
        <option v-for="campT in campingTypeList" :key="campT.id" :value="campT.id">
          {{ campT.name }} - ${{ campT.price }}
        </option>
      </select>
      <input type="date" v-model="booking.dateFrom" required placeholder="Check-in" />
      <input type="date" v-model="booking.dateTo" required placeholder="Check-out" />
      <button type="submit">Save</button>
    </form>
    <div class="booking-summary">
      <div v-for="booking in bookingList" :key="booking.id" class="booking-details">
        <p>{{ booking.campingName }}</p>
        <p>Type: {{ booking.campingType }} | Price: ${{ booking.campingPrice }}</p>
        <p>Dates: {{ formatDate(booking.dateFrom) }} to {{ formatDate(booking.dateTo) }}</p>
        <button class="delete" @click="deleteBooking(booking.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      booking: {
        userId: "",
        campingId: "",
        dateFrom: new Date().toISOString().split('T')[0],
        dateTo: new Date().toISOString().split('T')[0],
        campingTypeId: "",
        campingType: "",
        campingPrice: 0
      },
      campingList: [],
      campingTypeList: [],
      bookingList: [],
    };
  },
  created() {
    this.getCampingList();
    this.getCampingTypesWithPrices();
    this.getBookingsByUserId();
  },
  methods: {
    async getCampingList() {
      try {
        const response = await axios.get("http://localhost:5038/Camping/getAll");
        this.campingList = response.data;
      } catch (error) {
        console.error("Error fetching camping list:", error);
      }
    },
    async getCampingTypesWithPrices() {
      try {
        const response = await axios.get("http://localhost:5038/Camping/campingTypesWithPrices");
        this.campingTypeList = Object.entries(response.data).map(([name, price], index) => ({
          id: index + 1,
          name,
          price
        }));
      } catch (error) {
        console.error("Error fetching camping list:", error);
      }
    },
    async add() {
      try {
        var userId = localStorage.getItem('userId');
        this.booking.userId = userId;
        const selectedCampType = this.campingTypeList.find(campT => campT.id === this.booking.campingTypeId);
        this.booking.campingType = selectedCampType.name;
        this.booking.campingPrice = selectedCampType.price;

        await axios.post("http://localhost:5038/Booking/book", this.booking);
        this.getBookingsByUserId();
        alert("Booking saved successfully.");
      } catch (error) {
        alert("Error saving booking: " + error.response.data);
        console.error(error);
      }
    },
    async getBookingsByUserId() {
      try {
        var userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5038/Booking/getBookingsByUserId/${userId}`);
        this.bookingList = response.data;
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },
    async deleteBooking(bookingId) {
      try {
        await axios.delete(`http://localhost:5038/Booking/delete/${bookingId}`);
        this.bookingList = this.bookingList.filter(booking => booking.id !== bookingId);
      } catch (error) {
        alert("Error deleting booking: " + error.response.data);
        console.error(error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toISOString().split('T')[0];
    }
  }
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
    width: 500px;
    height: auto;
    padding: 40px;
    background: rgba(236, 240, 243, 0.8);
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-container h4 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .form-container select,
  .form-container input[type="date"],
  .form-container input[type="text"],
  .form-container input[type="password"] {
  width: calc(100% - 20px); 
  padding: 10px; 
  margin-bottom: 20px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
  font-size: 16px; 
  appearance: none; 
}

.form-container select:focus,
.form-container input:focus {
  outline: none; 
  border-color: #0056b3; 
}

.form-container button {
  width: 100%;
  padding: 12px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.form-container button:hover {
  background-color: #0056b3;
}
  
.booking-summary {
  max-width: 600px;
  margin: 20px auto;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.booking-details {
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

.booking-details:last-child {
  border-bottom: none;
}

.booking-details p {
  margin: 5px 0;
}
.delete{
  background: rgba(236, 240, 243, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
  </style>