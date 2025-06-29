<template>
  <div class="app-container">
    <!-- Fixed Left Sidebar -->
    <div class="sidebar">
      <!-- User Profile Section -->
      <div class="user-profile">
        <div class="user-avatar">
          <span class="avatar-text">JD</span>
        </div>
        <div class="user-info">
          <div class="username">ansel</div>
          <div class="user-role">user</div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <!-- GENERAL Section -->
        <div class="nav-section">
          <div class="section-header">GENERAL</div>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span class="nav-text">Home</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span class="nav-text">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="nav-text">Profile</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- PROCUREMENT Section -->
        <div class="nav-section">
          <div class="section-header">PROCUREMENT</div>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="nav-text">Request Purchase</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link active">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="nav-text">Track Payments</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <span class="nav-text">PR Lists</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- USER MANAGEMENT Section -->
        <div class="nav-section">
          <div class="section-header">USER MANAGEMENT</div>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span class="nav-text">Edit Profile</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
                <span class="nav-text">Reset Password</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- ADMIN CONTROLS Section -->
        <div class="nav-section">
          <div class="section-header">ADMIN CONTROLS</div>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="nav-text">View Profile</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="nav-text">Settings</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link logout">
                <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span class="nav-text">Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Background Pattern -->
      <div class="background-pattern">
        <div class="pattern-overlay"></div>
      </div>

      <!-- Payment Tracking Content -->
      <div class="content-wrapper">
        <div class="admin-card">
          <!-- Header with gradient overlay and stats -->
          <div class="card-header">
            <div class="header-content">
              <div class="logo-container">
                <img src="@/assets/proculogo.png" alt="Procurement System Logo" class="logo" />
              </div>
              <div class="header-text">
                <h1 class="title">Payment Tracking</h1>
                <p class="subtitle">Track and monitor all procurement payments</p>
              </div>
            </div>

            <!-- Stats Overview -->
            <div class="stats-overview">
              <div class="stat-item">
                <div class="stat-value">{{ payments.length }}</div>
                <div class="stat-label">Total Payments</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ pendingPaymentsCount }}</div>
                <div class="stat-label">Pending</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ paidPaymentsCount }}</div>
                <div class="stat-label">Paid</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ formatCurrency(totalPaymentAmount) }}</div>
                <div class="stat-label">Total Amount</div>
              </div>
            </div>
          </div>

          <div class="card-content">
            <!-- Search and Filter Bar -->
            <div class="action-bar">
              <div class="search-container">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search by supplier..." 
                  class="search-input"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div class="filter-container">
                <select v-model="statusFilter" class="filter-select">
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            <!-- Payments List -->
            <div v-if="loading" class="loading-state">
              <div class="loading-spinner">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading-icon"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
              </div>
              <p>Loading payments...</p>
            </div>

            <div v-else-if="filteredPayments.length === 0" class="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><path d="M12 2v6m0 0v14m0-14h6m-6 0H6"></path><path d="M17 20H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z"></path></svg>
              <p class="empty-text">No payments available.</p>
              <p class="empty-subtext">Track payments to get started.</p>
            </div>

            <div v-else class="payments-grid">
              <div v-for="payment in filteredPayments" :key="payment.id" class="payment-card" :class="`payment-card-${payment.status.toLowerCase()}`">
                <div class="payment-card-header">
                  <div class="payment-header-content">
                    <div class="payment-title">{{ payment.supplier }}</div>
                    <span class="status-badge" :class="`status-${payment.status.toLowerCase()}`">
                      {{ payment.status }}
                    </span>
                  </div>
                  <div class="payment-amount-tag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    <span>{{ formatCurrency(payment.amount) }}</span>
                  </div>
                </div>

                <div class="payment-card-body">
                  <div class="payment-details">
                    <div class="detail-item" v-if="payment.paymentDate">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      <span>Date: {{ formatDate(payment.paymentDate) }}</span>
                    </div>
                    <div class="detail-item" v-if="payment.paymentMethod">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                      <span>Method: {{ payment.paymentMethod }}</span>
                    </div>
                    <div class="detail-item" v-if="payment.invoiceNumber">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                      <span>Invoice: {{ payment.invoiceNumber }}</span>
                    </div>
                  </div>

                  <div class="payment-description" v-if="payment.description">
                    {{ payment.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  setup() {
    const payments = ref([]);
    const loading = ref(true);
    const searchQuery = ref("");
    const statusFilter = ref("all");

    const pendingPaymentsCount = computed(() => 
      payments.value.filter(payment => payment.status === "Pending").length
    );

    const paidPaymentsCount = computed(() => 
      payments.value.filter(payment => payment.status === "Paid").length
    );

    const totalPaymentAmount = computed(() => 
      payments.value.reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
    );

    const filteredPayments = computed(() => {
      let result = [...payments.value];

      if (statusFilter.value !== "all") {
        result = result.filter(payment => payment.status === statusFilter.value);
      }

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(payment => 
          payment.supplier.toLowerCase().includes(query) ||
          (payment.invoiceNumber && payment.invoiceNumber.toLowerCase().includes(query)) ||
          (payment.description && payment.description.toLowerCase().includes(query))
        );
      }

      return result;
    });

    const fetchPayments = async () => {
      try {
        loading.value = true;
        const unsubscribe = onSnapshot(collection(db, "payments"), (snapshot) => {
          payments.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          loading.value = false;
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching payments:", error);
        loading.value = false;
      }
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return "N/A";
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };

    const formatCurrency = (amount) => {
      if (!amount) return "$0.00";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    onMounted(fetchPayments);

    return {
      payments,
      loading,
      searchQuery,
      statusFilter,
      pendingPaymentsCount,
      paidPaymentsCount,
      totalPaymentAmount,
      filteredPayments,
      formatDate,
      formatCurrency
    };
  },
};
</script>

<style scoped>
/* Main App Container */
.app-container {
  display: flex;
  height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Fixed Left Sidebar */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 256px;
  height: 100vh;
  background-color: #1e3a5f;
  color: white;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

/* User Profile Section */
.user-profile {
  padding: 24px;
  border-bottom: 1px solid #2d4a6b;
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  background-color: #4a90e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-text {
  font-weight: bold;
  font-size: 18px;
  color: white;
}

.user-info {
  flex: 1;
}

.username {
  font-weight: 600;
  font-size: 16px;
  color: white;
  margin-bottom: 2px;
}

.user-role {
  font-size: 14px;
  color: #94a3b8;
}

/* Navigation Menu */
.nav-menu {
  padding: 16px 0;
}

.nav-section {
  margin-bottom: 32px;
}

.section-header {
  padding: 0 24px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  background-color: #2d4a6b;
  color: white;
}

.nav-link.active {
  background-color: #2d4a6b;
  color: white;
  border-right: 3px solid #4a90e2;
}

.nav-link.logout {
  color: #fca5a5;
}

.nav-link.logout:hover {
  background-color: #dc2626;
  color: white;
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}

/* Main Content Area */
.main-content {
  margin-left: 256px;
  flex: 1;
  position: relative;
  overflow-y: auto;
}

.content-wrapper {
  padding: 24px;
  min-height: 100vh;
}

/* Background Pattern */
.background-pattern {
  position: fixed;
  top: 0;
  left: 256px;
  right: 0;
  bottom: 0;
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
  margin: 0 auto;
}

/* Card Header with Stats */
.card-header {
  background: linear-gradient(135deg, #0f2942 0%, #102a42 100%);
  padding: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-container {
  flex-shrink: 0;
}

.logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.header-text {
  flex: 1;
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

/* Stats Overview */
.stats-overview {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  flex: 1;
  min-width: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.card-content {
  padding: 30px;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.filter-container {
  width: auto;
  min-width: 200px;
}

.filter-select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  color: #1e293b;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Payment Cards Grid */
.payments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.payment-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
}

.payment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Card color accents based on status */
.payment-card-pending {
  border-top: 3px solid #fbbf24;
}

.payment-card-paid {
  border-top: 3px solid #10b981;
}

.payment-card-failed {
  border-top: 3px solid #ef4444;
}

.payment-card-header {
  padding: 15px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.payment-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.payment-title {
  font-weight: 600;
  color: #0f2942;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.payment-amount-tag {
  background-color: #0f2942;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  font-weight: 600;
}

.payment-card-body {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.9rem;
}

.payment-description {
  font-size: 0.9rem;
  color: #334155;
  line-height: 1.5;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* Status Badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-paid {
  background-color: #d1fae5;
  color: #065f46;
}

.status-failed {
  background-color: #fee2e2;
  color: #b91c1c;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
}

.empty-icon {
  color: #94a3b8;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.empty-subtext {
  font-size: 16px;
  color: #64748b;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #1e293b;
}

.loading-spinner {
  margin-bottom: 16px;
}

.loading-icon {
  animation: spin 2s linear infinite;
  color: #2563eb;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }
  
  .main-content {
    margin-left: 240px;
  }
  
  .background-pattern {
    left: 240px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .background-pattern {
    left: 0;
  }
  
  .content-wrapper {
    padding: 16px;
  }
  
  .action-bar {
    flex-direction: column;
  }

  .search-container,
  .filter-container {
    width: 100%;
  }

  .payments-grid {
    grid-template-columns: 1fr;
  }

  .stats-overview {
    flex-direction: column;
  }

  .stats-overview .stat-item {
    width: 100%;
  }
}
</style>