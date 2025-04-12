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
        <h1 class="title">Evaluate Bids</h1>
        <p class="subtitle">Evaluate, approve, or reject bids submitted by users.</p>
      </div>

      <div class="card-content">
        <!-- Bids List -->
        <div v-if="bids.length" class="table-container">
          <table class="bids-table">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bid, index) in bids" :key="bid.id">
                <td>{{ bid.bidderName || 'Anonymous' }}</td>
                <td>{{ formatCurrency(bid.bidPrice) }}</td>
                <td>{{ bid.currency }}</td>
                <td>{{ bid.score || 'N/A' }}</td>
                <td class="capitalize">{{ bid.status }}</td>
                <td>
                  <button @click="evaluateBid(index)" class="view-btn">Evaluate</button>
                  <button @click="approveBid(bid.id)" class="approve-btn" :disabled="bid.status === 'approved'">Approve</button>
                  <button @click="rejectBid(bid.id)" class="reject-btn" :disabled="bid.status === 'rejected'">Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="loading-state">
          <p>No bids available for evaluation.</p>
        </div>

        <!-- Evaluate Bid Modal -->
        <div v-if="isEvaluating" class="modal-overlay">
          <div class="modal">
            <h3 class="modal-title">Evaluate Bid</h3>
            <div class="modal-body">
              <p><strong>Bidder:</strong> {{ selectedBid.bidderName || 'Anonymous' }}</p>
              <p><strong>Amount:</strong> {{ formatCurrency(selectedBid.bidPrice) }}</p>
              <p><strong>Currency:</strong> {{ selectedBid.currency }}</p>
              <p><strong>Submission Date:</strong> {{ selectedBid.submissionDate || 'N/A' }}</p>
              <p><strong>Description:</strong> {{ selectedBid.description || 'No description provided' }}</p>
              <p><strong>Additional Notes:</strong> {{ selectedBid.notes || 'No additional notes' }}</p>
            </div>
            <form @submit.prevent="submitEvaluation">
              <div class="form-group">
                <label>Score</label>
                <input v-model="evaluationScore" type="number" min="0" max="100" required />
              </div>
              <div class="modal-actions">
                <button type="button" @click="isEvaluating = false" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default {
  setup() {
    const bids = ref([]);
    const isEvaluating = ref(false);
    const selectedBid = ref({});
    const evaluationScore = ref(null);

    const fetchBids = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bids"));
        bids.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          submissionDate: doc.data().submissionDate || "N/A", // Ensure default values
          description: doc.data().description || "",
          notes: doc.data().notes || "",
        }));
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    const evaluateBid = (index) => {
      selectedBid.value = { ...bids.value[index] };
      evaluationScore.value = selectedBid.value.score || null;
      isEvaluating.value = true;
    };

    const submitEvaluation = async () => {
      try {
        const bidRef = doc(db, "bids", selectedBid.value.id);
        await updateDoc(bidRef, { score: evaluationScore.value });
        alert("Bid evaluation submitted successfully");
        isEvaluating.value = false;
        fetchBids();
      } catch (error) {
        console.error("Error submitting evaluation:", error);
        alert("Failed to submit evaluation. Please try again.");
      }
    };

    const approveBid = async (id) => {
      try {
        const bidRef = doc(db, "bids", id);
        await updateDoc(bidRef, { status: "approved" });
        alert("Bid approved successfully");
        fetchBids();
      } catch (error) {
        console.error("Error approving bid:", error);
        alert("Failed to approve bid. Please try again.");
      }
    };

    const rejectBid = async (id) => {
      try {
        const bidRef = doc(db, "bids", id);
        await updateDoc(bidRef, { status: "rejected" });
        alert("Bid rejected successfully");
        fetchBids();
      } catch (error) {
        console.error("Error rejecting bid:", error);
        alert("Failed to reject bid. Please try again.");
      }
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    onMounted(fetchBids);

    return {
      bids,
      isEvaluating,
      selectedBid,
      evaluationScore,
      evaluateBid,
      submitEvaluation,
      approveBid,
      rejectBid,
      formatCurrency,
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
</style>
