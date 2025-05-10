<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <img src="@/assets/proculogo.png" alt="GovProcure Logo" class="sidebar-logo-img" />
        <span class="sidebar-logo-text">GovProcure</span>
      </div>
    </div>

    <div class="sidebar-user">
      <div class="sidebar-user-avatar">
        <img :src="defaultAvatar" alt="Admin User" />
      </div>
      <div class="sidebar-user-info">
        <span class="sidebar-user-name">Admin User</span>
        <span class="sidebar-user-role">System Administrator</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul class="sidebar-menu">
        <li class="sidebar-menu-item">
          <router-link to="/dashboard" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/admin-management" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path></svg>
            <span>Admin Management</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/procurement-plan" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>Purchase Requests</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/invitation-to-bid" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Invitation to Bid</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/admin-bid-review" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <span>Bid Review</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/evaluate-bids" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>Evaluate Bids</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/post-qualification" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>Post Qualification</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/contract-management" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"></path><path d="M14 3v5h5M18 21v-6M15 18h6"></path></svg>
            <span>Contract Management</span>
          </router-link>
        </li>
        <li class="sidebar-menu-item">
          <router-link to="/payment-processing" class="sidebar-menu-link" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            <span>Payment Processing</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button class="sidebar-logout-btn" @click="handleLogout">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminNavigationBar",
  data() {
    return {
      defaultAvatar: "https://via.placeholder.com/150",
    };
  },
  methods: {
    handleLogout() {
      // Implement logout logic here
      console.log("Logout clicked");
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>