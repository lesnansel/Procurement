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
        <h1 class="title">Admin Dashboard</h1>
        <p class="subtitle">System Overview and Management</p>
      </div>

      <div class="card-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>

        <template v-else>
          <!-- Quick Actions Bar -->
          <div class="quick-actions-bar">
            <button @click="refreshStats" class="action-btn" :disabled="refreshing">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'rotating': refreshing }"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
              Refresh
            </button>
            <router-link to="/dashboard" class="action-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/></svg>
              User Dashboard
            </router-link>
          </div>

          <!-- Stats Overview -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon users">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.totalUsers }}</span>
                <span class="stat-label">Total Users</span>
              </div>
              <div class="stat-change" :class="stats.userGrowth >= 0 ? 'positive' : 'negative'">
                <svg v-if="stats.userGrowth >= 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                {{ Math.abs(stats.userGrowth) }}%
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon active">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.activeUsers }}</span>
                <span class="stat-label">Active Users</span>
              </div>
              <div class="stat-percentage">
                {{ Math.round((stats.activeUsers / stats.totalUsers) * 100) || 0 }}%
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon new">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.newUsers }}</span>
                <span class="stat-label">New Users (24h)</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon system">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.systemHealth }}%</span>
                <span class="stat-label">System Health</span>
              </div>
              <div class="health-indicator" :class="getHealthStatus(stats.systemHealth)"></div>
            </div>
          </div>

          <!-- Management Sections -->
          <div class="management-grid">
            <!-- User Management -->
            <div class="management-card">
              <div class="card-header">
                <h2>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                  User Management
                </h2>
                <router-link to="/admin-management" class="view-all">
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </router-link>
              </div>
              <div class="recent-users">
                <div v-for="user in recentUsers" :key="user.id" class="user-item">
                  <img :src="user.avatar || defaultAvatar" :alt="user.name">
                  <div class="user-info">
                    <span class="user-name">{{ user.name }}</span>
                    <span class="user-email">{{ user.email }}</span>
                  </div>
                  <span class="user-status" :class="user.status">
                    {{ user.status }}
                  </span>
                </div>
                <div v-if="!recentUsers.length" class="empty-list">
                  <p>No users found</p>
                </div>
              </div>
            </div>

            <!-- System Logs -->
            <div class="management-card">
              <div class="card-header">
                <h2>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  Recent System Logs
                </h2>
                <router-link to="/system-logs" class="view-all">
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </router-link>
              </div>
              <div class="log-list">
                <div v-for="log in recentLogs" :key="log.id" class="log-item">
                  <span class="log-type" :class="log.type">
                    <svg v-if="log.type === 'info'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <svg v-else-if="log.type === 'warning'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    <svg v-else-if="log.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    <svg v-else-if="log.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </span>
                  <div class="log-info">
                    <span class="log-message">{{ log.message }}</span>
                    <span class="log-time">{{ formatTime(log.timestamp) }}</span>
                  </div>
                </div>
                <div v-if="!recentLogs.length" class="empty-list">
                  <p>No logs found</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions-grid">
            <button class="quick-action-btn" @click="backupSystem">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              Backup System
            </button>
            <button class="quick-action-btn" @click="clearCache">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Clear Cache
            </button>
            <button class="quick-action-btn" @click="generateReport">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Generate Report
            </button>
            <button class="quick-action-btn warning" @click="showMaintenanceModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              Maintenance Mode
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- Maintenance Mode Modal -->
    <div v-if="showMaintenance" class="modal-overlay" @click="showMaintenance = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="modal-icon"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            Enable Maintenance Mode
          </h3>
          <button class="close-btn" @click="showMaintenance = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal-body">
          <p class="warning-text">
            This will temporarily disable user access to the system.
            Only administrators will be able to log in.
          </p>
          <div class="maintenance-form">
            <div class="form-group">
              <label for="maintenanceMessage">Message</label>
              <input 
                type="text" 
                id="maintenanceMessage"
                v-model="maintenanceMessage" 
                placeholder="Maintenance message for users"
              />
            </div>
            <div class="form-group">
              <label for="maintenanceDuration">Duration (minutes)</label>
              <input 
                type="number" 
                id="maintenanceDuration"
                v-model="maintenanceDuration" 
                placeholder="Duration in minutes"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showMaintenance = false">Cancel</button>
          <button 
            class="confirm-btn warning" 
            @click="enableMaintenance"
            :disabled="!maintenanceMessage || !maintenanceDuration"
          >
            Enable Maintenance Mode
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// We'll use auth in a real implementation for checking admin permissions
// import { getAuth } from 'firebase/auth';

// State
const loading = ref(true);
const refreshing = ref(false);
const showMaintenance = ref(false);
const maintenanceMessage = ref('');
const maintenanceDuration = ref('');
const defaultAvatar = "https://ui-avatars.com/api/?background=0F2942&color=fff";

// Stats
const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  newUsers: 0,
  userGrowth: 0,
  systemHealth: 98,
});

// Recent Users
const recentUsers = ref([]);

// Recent Logs
const recentLogs = ref([]);

// Load initial data
onMounted(async () => {
  try {
    await loadDashboardData();
  } finally {
    loading.value = false;
  }
});

const loadDashboardData = async () => {
  try {
    // Fetch users
    const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(5));
    const usersSnapshot = await getDocs(usersQuery);
    
    recentUsers.value = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().username || 'Unknown User',
      email: doc.data().email,
      avatar: doc.data().profileImageUrl,
      status: doc.data().status || 'active'
    }));

    // Calculate stats
    stats.value = {
      totalUsers: usersSnapshot.size,
      activeUsers: recentUsers.value.filter(u => u.status === 'active').length,
      newUsers: recentUsers.value.filter(u => {
        const created = new Date(u.createdAt);
        return (Date.now() - created) < 24 * 60 * 60 * 1000;
      }).length,
      userGrowth: 5.2, // Example value
      systemHealth: 98,
    };

    // Fetch logs
    const logsQuery = query(collection(db, 'system_logs'), orderBy('timestamp', 'desc'), limit(5));
    const logsSnapshot = await getDocs(logsQuery);
    
    recentLogs.value = logsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // If no logs exist yet, add some sample logs
    if (recentLogs.value.length === 0) {
      recentLogs.value = [
        {
          id: '1',
          type: 'info',
          message: 'System startup completed',
          timestamp: new Date().getTime()
        },
        {
          id: '2',
          type: 'success',
          message: 'Database backup successful',
          timestamp: new Date().getTime() - 3600000
        },
        {
          id: '3',
          type: 'warning',
          message: 'High server load detected',
          timestamp: new Date().getTime() - 7200000
        }
      ];
    }

  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
};

// Utility functions
const getHealthStatus = (health) => {
  if (health >= 90) return 'excellent';
  if (health >= 70) return 'good';
  if (health >= 50) return 'fair';
  return 'poor';
};

const formatTime = (timestamp) => {
  if (!timestamp) return 'Unknown';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

// Action handlers
const refreshStats = async () => {
  refreshing.value = true;
  try {
    await loadDashboardData();
  } finally {
    setTimeout(() => {
      refreshing.value = false;
    }, 1000);
  }
};

const backupSystem = () => {
  // Implement backup functionality
  alert('System backup initiated');
};

const clearCache = () => {
  // Implement cache clearing
  alert('Cache cleared successfully');
};

const generateReport = () => {
  // Implement report generation
  alert('Report generation started');
};

const showMaintenanceModal = () => {
  showMaintenance.value = true;
};

const enableMaintenance = async () => {
  // Implement maintenance mode
  alert(`Maintenance mode enabled for ${maintenanceDuration.value} minutes with message: ${maintenanceMessage.value}`);
  showMaintenance.value = false;
  maintenanceMessage.value = '';
  maintenanceDuration.value = '';
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

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(15, 41, 66, 0.1);
  border-radius: 50%;
  border-top-color: #0f2942;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Quick Actions Bar */
.quick-actions-bar {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 24px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(15, 41, 66, 0.1);
  border: 1px solid rgba(15, 41, 66, 0.2);
  border-radius: 6px;
  color: #0f2942;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.action-btn:hover {
  background-color: rgba(15, 41, 66, 0.15);
}

.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #f8fafc;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-icon.users {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.stat-icon.active {
  background-color: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.stat-icon.new {
  background-color: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

.stat-icon.system {
  background-color: rgba(234, 179, 8, 0.1);
  color: #eab308;
}

.stat-info {
  flex: 1;
}

.stat-value {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  display: block;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #16a34a;
}

.stat-change.negative {
  color: #e53e3e;
}

.stat-percentage {
  color: #16a34a;
  font-weight: 500;
}

.health-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.health-indicator.excellent {
  background-color: #16a34a;
}

.health-indicator.good {
  background-color: #eab308;
}

.health-indicator.fair {
  background-color: #f97316;
}

.health-indicator.poor {
  background-color: #e53e3e;
}

/* Management Grid */
.management-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.management-card {
  background-color: #f8fafc;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.management-card .card-header {
  background: none;
  padding: 0;
  text-align: left;
}

.management-card h2 {
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.management-card h2 svg {
  color: #0f2942;
}

.view-all {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s;
}

.view-all:hover {
  opacity: 0.8;
}

/* Recent Users */
.recent-users {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s;
}

.user-item:hover {
  background-color: #f1f5f9;
}

.user-item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  color: #333;
  font-weight: 500;
  display: block;
}

.user-email {
  color: #666;
  font-size: 0.9rem;
}

.user-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.user-status.active {
  background-color: rgba(34, 197, 94, 0.1);
  color: #16a34a;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.user-status.deactivated, .user-status.inactive {
  background-color: rgba(229, 62, 62, 0.1);
  color: #e53e3e;
  border: 1px solid rgba(229, 62, 62, 0.2);
}

/* Log List */
.log-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.log-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s;
}

.log-item:hover {
  background-color: #f1f5f9;
}

.log-type {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.log-type.info {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.log-type.warning {
  background-color: rgba(234, 179, 8, 0.1);
  color: #eab308;
}

.log-type.error {
  background-color: rgba(229, 62, 62, 0.1);
  color: #e53e3e;
}

.log-type.success {
  background-color: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.log-info {
  flex: 1;
}

.log-message {
  color: #333;
  display: block;
}

.log-time {
  color: #666;
  font-size: 0.9rem;
}

.empty-list {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

/* Quick Actions Grid */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.quick-action-btn {
  background-color: #f8fafc;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.quick-action-btn svg {
  color: #0f2942;
}

.quick-action-btn.warning svg {
  color: #eab308;
}

.quick-action-btn:hover {
  background-color: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  animation: slideUp 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h3 {
  color: #eab308;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
}

.modal-body {
  padding: 20px;
}

.warning-text {
  color: #666;
  margin-bottom: 20px;
}

.maintenance-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
}

.confirm-btn {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  border: none;
}

.confirm-btn.warning {
  background-color: #eab308;
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .management-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .card-content {
    padding: 20px;
  }

  .quick-actions-bar {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
  
  .rotating {
    animation: none;
  }
  
  .modal-overlay,
  .modal-content {
    animation: none;
  }
  
  .quick-action-btn:hover {
    transform: none;
  }
}
</style>