<template>
  <div class="admin-wrapper">
    <!-- Background Pattern -->
    <div class="background-pattern">
      <div class="pattern-overlay"></div>
    </div>

    <!-- Admin Card -->
    <div class="admin-card">
      <div class="card-header">
        <div class="logo-container">
          <img src="@/assets/proculogo.png" alt="Procurement System Logo" class="logo" />
        </div>
        <h1 class="title">Submit Bid</h1>
        <p class="subtitle">Submit your bid for the procurement process.</p>
      </div>

      <div class="card-content">
        <!-- Submit Bid Form -->
        <form @submit.prevent="submitBid" class="form">
          <div class="form-group">
            <label>Bid Amount</label>
            <input v-model="newBid.amount" type="number" required />
          </div>
          <div class="form-group">
            <label>Bid Description</label>
            <textarea v-model="newBid.description" required></textarea>
          </div>
          <div class="form-group">
            <label>Upload Supporting Documents</label>
            <input type="file" @change="handleFileUpload" />
          </div>
          <button type="submit" class="btn-primary">Submit Bid</button>
        </form>

        <!-- Submitted Bids List -->
        <div v-if="bids.length" class="table-container">
          <table class="bids-table">
            <thead>
              <tr>
                <th>Bid Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bid in bids" :key="bid.id">
                <td>{{ bid.amount }}</td>
                <td>{{ bid.description }}</td>
                <td class="capitalize">{{ bid.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="loading-state">No bids submitted yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default {
  setup() {
    const bids = ref([]);
    const newBid = ref({ amount: 0, description: "" });

    const fetchBids = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bids"));
        bids.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching bids:", error);
        alert("Failed to fetch bids. Please try again.");
      }
    };

    const submitBid = async () => {
      try {
        await addDoc(collection(db, "bids"), newBid.value);
        alert("Bid submitted successfully!");
        newBid.value = { amount: 0, description: "" };
        fetchBids();
      } catch (error) {
        console.error("Error submitting bid:", error);
        alert("Failed to submit bid. Please try again.");
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("File uploaded:", file.name);
      }
    };

    onMounted(fetchBids);

    return {
      bids,
      newBid,
      submitBid,
      handleFileUpload,
    };
  },
};
</script>

<style scoped>
.admin-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Background Pattern */
.background-pattern {
  position: fixed;
  inset: 0;
  background-color: #1a1a2e;
  z-index: -1;
  overflow: hidden;
}

.pattern-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(30deg, rgba(16, 42, 66, 0.5) 12%, transparent 12.5%, transparent 87%, rgba(16, 42, 66, 0.5) 87.5%, rgba(16, 42, 66, 0.5)),
    linear-gradient(150deg, rgba(16, 42, 66, 0.5) 12%, transparent 12.5%, transparent 87%, rgba(16, 42, 66, 0.5) 87.5%, rgba(16, 42, 66, 0.5)),
    linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25.5%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1));
  background-size: 80px 140px;
  background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
  opacity: 0.2;
}

/* Card Design */
.admin-card {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
}

.card-header {
  background: linear-gradient(135deg, #0f2942 0%, #102a42 100%);
  padding: 30px;
  text-align: center;
  color: white;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 0.95rem;
  opacity: 0.8;
}

.card-content {
  padding: 30px;
}

/* Table Design */
.table-container {
  overflow-x: auto;
}

.bids-table {
  width: 100%;
  border-collapse: collapse;
}

.bids-table th,
.bids-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.bids-table th {
  background-color: #2b6cb0;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.bids-table td {
  color: #2d3748;
  font-size: 14px;
}

.bids-table tr:hover td {
  background-color: #ebf8ff;
}

.loading-state {
  text-align: center;
  color: #1a202c;
  font-size: 16px;
  font-weight: bold;
}

/* Buttons */
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}
</style>
