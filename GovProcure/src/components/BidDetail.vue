<template>
  <div class="admin-wrapper">
    <!-- Background Pattern -->
    <div class="background-pattern">
      <div class="pattern-overlay"></div>
    </div>

    <!-- Admin Card -->
    <div class="admin-card">
      <div class="card-header">
        <div class="header-content">
          <div class="logo-container">
            <img src="@/assets/proculogo.png" alt="Procurement System Logo" class="logo" />
          </div>
          <div class="header-text">
            <h1 class="title">Bid Details</h1>
            <p class="subtitle">View detailed information about the selected bid</p>
          </div>
        </div>
      </div>

      <div class="card-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading bid details...</p>
        </div>

        <!-- Bid Details -->
        <div v-else>
          <div class="detail-section">
            <h3 class="detail-section-title">Bid Information</h3>
            <div class="detail-row">
              <span class="detail-label">Bidder Name:</span>
              <span class="detail-value">{{ bid.bidderName || 'Anonymous Vendor' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Bid Amount:</span>
              <span class="detail-value">{{ formatCurrency(bid.bidPrice) }} {{ bid.currency }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submission Date:</span>
              <span class="detail-value">{{ formatDate(bid.submissionDate) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="status-badge" :class="`status-${bid.status?.toLowerCase()}`">
                {{ bid.status || 'Pending' }}
              </span>
            </div>
          </div>

          <div class="detail-section" v-if="bid.description">
            <h3 class="detail-section-title">Description</h3>
            <p class="detail-value">{{ bid.description }}</p>
          </div>

          <div class="detail-section" v-if="bid.notes">
            <h3 class="detail-section-title">Notes</h3>
            <p class="detail-value">{{ bid.notes }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="goBack" class="btn-back">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back
          </button>
          <button @click="approveBid" class="btn-approve">
            Approve Bid
          </button>
          <button @click="rejectBid" class="btn-reject">
            Reject Bid
          </button>
          <button @click="requestMoreInfo" class="btn-info">
            Request More Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const bidId = route.params.id;
    const bid = ref({});
    const loading = ref(true);

    const fetchBidDetails = async () => {
      try {
        const bidRef = doc(db, "bids", bidId);
        const bidSnapshot = await getDoc(bidRef);
        if (bidSnapshot.exists()) {
          bid.value = bidSnapshot.data();
        } else {
          alert("Bid not found");
          router.push("/admin-bid-review");
        }
      } catch (error) {
        console.error("Error fetching bid details:", error);
        alert("Failed to fetch bid details.");
      } finally {
        loading.value = false;
      }
    };

    const approveBid = async () => {
      try {
        const bidRef = doc(db, "bids", bidId);
        await updateDoc(bidRef, { status: "Approved" });
        alert("Bid approved successfully!");
        router.push("/admin-bid-review");
      } catch (error) {
        console.error("Error approving bid:", error);
        alert("Failed to approve bid.");
      }
    };

    const rejectBid = async () => {
      try {
        const bidRef = doc(db, "bids", bidId);
        await updateDoc(bidRef, { status: "Rejected" });
        alert("Bid rejected successfully!");
        router.push("/admin-bid-review");
      } catch (error) {
        console.error("Error rejecting bid:", error);
        alert("Failed to reject bid.");
      }
    };

    const requestMoreInfo = async () => {
      try {
        const info = prompt("Enter the additional information you need:");
        if (info) {
          const bidRef = doc(db, "bids", bidId);
          await updateDoc(bidRef, { status: "More Info Requested", infoRequested: info });
          alert("Information request sent successfully!");
          router.push("/admin-bid-review");
        }
      } catch (error) {
        console.error("Error requesting more information:", error);
        alert("Failed to request more information.");
      }
    };

    const goBack = () => {
      router.back();
    };

    const formatCurrency = (amount) => {
      if (!amount) return "0.00";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return "N/A";
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    onMounted(fetchBidDetails);

    return {
      bid,
      loading,
      approveBid,
      rejectBid,
      requestMoreInfo,
      goBack,
      formatCurrency,
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

.admin-card {
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #0f2942 0%, #102a42 100%);
  padding: 30px;
  color: white;
  text-align: center;
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

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1e293b;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(15, 41, 66, 0.1);
  border-radius: 50%;
  border-top-color: #0f2942;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #0f2942;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.detail-label {
  font-weight: 600;
  color: #64748b;
}

.detail-value {
  font-weight: 500;
  color: #334155;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-approved {
  background-color: #d1fae5;
  color: #065f46;
}

.status-rejected {
  background-color: #fee2e2;
  color: #b91c1c;
}

.status-more-info-requested {
  background-color: #e0f2fe;
  color: #0369a1;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-start; /* Align buttons to the left */
  margin-top: 20px; /* Add spacing from the content above */
}

.btn-approve {
  background-color: #059669;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-reject {
  background-color: #dc2626;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-info {
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-back {
  background-color: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 20px;
  transition: all 0.2s;
}

.btn-back:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}
</style>
