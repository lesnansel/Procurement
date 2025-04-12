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
        <h1 class="title">Approved Purchases</h1>
        <p class="subtitle">View all approved purchase requests</p>
      </div>

      <div class="card-content">
        <!-- Loading State -->
        <div v-if="approvedPurchases.length === 0" class="loading-state">
          <p>No approved purchases available.</p>
        </div>

        <template v-else>
          <!-- Approved Purchases Table -->
          <div class="table-container">
            <table class="purchases-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Approved By</th>
                  <th>Date Approved</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="purchase in approvedPurchases" :key="purchase.id">
                  <td>{{ purchase.requestId }}</td>
                  <td>{{ purchase.itemName }}</td>
                  <td>{{ purchase.quantity }}</td>
                  <td>{{ purchase.approvedBy }}</td>
                  <td>{{ formatDate(purchase.dateApproved) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
  setup() {
    const approvedPurchases = ref([]);

    const fetchApprovedPurchases = async () => {
      try {
        const q = query(
          collection(db, "purchaseRequests"),
          where("status", "==", "Approved")
        );
        const querySnapshot = await getDocs(q);
        approvedPurchases.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching approved purchases:", error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    onMounted(fetchApprovedPurchases);

    return {
      approvedPurchases,
      formatDate,
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
    linear-gradient(30deg, rgba(16, 42, 66, 0.5) 12%, transparent 12.5%, transparent 87%, rgba(16, 42, 66, 0.5) 87.5%, rgba(16, 42, 66, 0.5)),
    linear-gradient(150deg, rgba(16, 42, 66, 0.5) 12%, transparent 12.5%, transparent 87%, rgba(16, 42, 66, 0.5) 87.5%, rgba(16, 42, 66, 0.5)),
    linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25.5%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1)),
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

.purchases-table {
  width: 100%;
  border-collapse: collapse;
}

.purchases-table th,
.purchases-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.purchases-table th {
  background-color: #2b6cb0;
  color: white;
  font-weight: bold;
  font-size: 15px;
}

.purchases-table td {
  color: #2d3748;
  font-size: 14px;
}

.purchases-table tr:hover td {
  background-color: #ebf8ff;
}

.loading-state {
  text-align: center;
  color: #1a202c;
  font-size: 16px;
  font-weight: bold;
}
</style>