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
        <h1 class="title">Procurement Plan</h1>
        <p class="subtitle">Manage and review purchase requests efficiently.</p>
      </div>

      <div class="card-content">
        <!-- Purchase Requests List -->
        <div v-if="requests.length" class="table-container">
          <table class="requests-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(request, index) in requests" :key="request.id">
                <td>{{ request.itemName }}</td>
                <td>{{ request.quantity }}</td>
                <td>{{ request.description }}</td>
                <td class="capitalize">{{ request.status }}</td>
                <td>
                  <button @click="viewRequest(index)" class="btn-link">View</button>
                  <button 
                    v-if="request.status !== 'Approved'" 
                    @click="approveRequest(request.id)" 
                    class="btn-primary"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="loading-state">No purchase requests available.</p>

        <!-- View Purchase Request Modal -->
        <div v-if="isViewing" class="modal-overlay">
          <div class="modal">
            <h3 class="modal-title">Review Purchase Request</h3>
            <div class="modal-body">
              <p><strong>Item Name:</strong> {{ viewRequestData.itemName }}</p>
              <p><strong>Quantity:</strong> {{ viewRequestData.quantity }}</p>
              <p><strong>Description:</strong> {{ viewRequestData.description }}</p>
            </div>
            <div class="modal-actions">
              <button type="button" @click="isViewing = false" class="btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default {
  setup() {
    const requests = ref([]);
    const isViewing = ref(false);
    const viewRequestData = ref({});

    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "purchaseRequests"));
        requests.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching purchase requests:", error);
        alert("Failed to fetch purchase requests. Please try again.");
      }
    };

    const viewRequest = (index) => {
      viewRequestData.value = { ...requests.value[index] };
      isViewing.value = true;
    };

    const approveRequest = async (requestId) => {
      try {
        const requestRef = doc(db, "purchaseRequests", requestId);
        const approvalDate = new Date().toISOString(); // Get the current date in ISO format
        await updateDoc(requestRef, { status: "Approved", approvalDate });

        // Update the local state
        const request = requests.value.find((req) => req.id === requestId);
        if (request) {
          request.status = "Approved";
          request.approvalDate = approvalDate; // Update the local state with the approval date
        }

        alert("Purchase request approved successfully!");
      } catch (error) {
        console.error("Error approving purchase request:", error);
        alert("Failed to approve the purchase request.");
      }
    };

    onMounted(fetchRequests);

    return {
      requests,
      isViewing,
      viewRequestData,
      viewRequest,
      approveRequest,
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

.requests-table {
  width: 100%;
  border-collapse: collapse;
}

.requests-table th,
.requests-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.requests-table th {
  background-color: #2b6cb0;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.requests-table td {
  color: #2d3748;
  font-size: 14px;
}

.requests-table tr:hover td {
  background-color: #ebf8ff;
}

.loading-state {
  text-align: center;
  color: #1a202c;
  font-size: 16px;
  font-weight: bold;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.modal-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.modal-body p {
  margin-bottom: 0.5rem;
  color: #374151;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-secondary {
  background-color: #d1d5db;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #9ca3af;
}

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

.btn-link {
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
}

.btn-link:hover {
  color: #1d4ed8;
}
</style>