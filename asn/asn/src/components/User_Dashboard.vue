<template>
  <div class="dashboard-layout" :class="{'sidebar-open': sidebarOpen}">
    <!-- Sidebar -->
    <div class="sidebar-container" :class="{ 'sidebar-open': sidebarOpen }">
      <button class="sidebar-toggle" @click="toggleSidebar">
        <svg v-if="sidebarOpen" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      
      <div class="sidebar">
        <div class="sidebar-profile">
          <div class="sidebar-avatar">
            <img 
              :src="profileImage || defaultAvatar" 
              :alt="`${username}'s avatar`"
              @error="handleImageError"
            />
            <span class="status-badge" :class="role">{{ role }}</span>
          </div>
          <div class="sidebar-user-info">
            <h3>{{ username }}</h3>
            <p>{{ role }}</p>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <div v-for="(section, index) in navigationSections" :key="index" class="nav-section">
            <h4 class="section-title">{{ section.title }}</h4>
            <ul class="nav-links">
              <li v-for="route in section.routes" :key="route.path">
                <router-link 
                  :to="route.path" 
                  class="nav-link"
                  :class="{ 'active': currentRoute === route.path }"
                  v-if="shouldShowRoute(route)"
                >
                  <svg v-if="getIconForRoute(route)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="getIconForRoute(route)"></svg>
                  <span>{{ route.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
        
        <div class="sidebar-footer">
          <button @click="confirmLogout" class="sidebar-logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div 
        class="sidebar-overlay" 
        :class="{ 'overlay-visible': sidebarOpen }" 
        @click="toggleSidebar"
      ></div>
    </div>

    <!-- Main Dashboard Content -->
    <div class="dashboard-wrapper">
      <!-- Background Pattern -->
      <div class="background-pattern">
        <div class="pattern-overlay"></div>
      </div>

      <!-- Dashboard Card -->
      <div class="dashboard-card">
        <div class="card-header">
          <div class="logo-container">
            <img src="/placeholder.svg" alt="Procurement System Logo" class="logo" />
          </div>
          <h1 class="title">Dashboard</h1>
          <p class="subtitle">Manage your account and activities</p>
        </div>

        <div class="card-content">
          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Loading dashboard...</p>
          </div>

          <template v-else>
            <!-- User Welcome Section -->
            <div class="welcome-section">
              <div class="user-avatar">
                <img 
                  :src="profileImage || defaultAvatar" 
                  :alt="`${username}'s avatar`"
                  @error="handleImageError"
                />
                <span class="role-badge" :class="role">
                  {{ role }}
                </span>
              </div>
              <h2 class="welcome-text">Welcome back, {{ username }}!</h2>
              <p class="last-login">Last login: {{ formatDate(lastLogin) }}</p>
            </div>

            <!-- Quick Stats -->
            <div class="stats-grid">
              <div class="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
                <span class="stat-value">{{ loginCount }}</span>
                <span class="stat-label">Total Logins</span>
              </div>
              <div class="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span class="stat-value">{{ daysActive }}</span>
                <span class="stat-label">Days Active</span>
              </div>
              <div class="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span class="stat-value">{{ profileCompletion }}%</span>
                <span class="stat-label">Profile Complete</span>
              </div>
            </div>

            <!-- Admin Section -->
            <div v-if="role === 'admin'" class="admin-section">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Admin Controls
              </h3>
              <div class="admin-actions">
                <router-link to="/admin-dashboard" class="action-button primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                  Admin Panel
                </router-link>
                <router-link to="/admin-management" class="action-button secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Manage Users
                </router-link>
                <router-link to="/system-logs" class="action-button secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  System Logs
                </router-link>
              </div>
            </div>

            <!-- User Actions -->
            <div class="user-actions" :class="{ 'is-admin': role === 'admin' }">
              <router-link to="/profile-display" class="action-button secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                View Profile
              </router-link>
              <router-link to="/settings" class="action-button secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
              </router-link>
              <button @click="confirmLogout" class="action-button danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Log Out
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="modal-overlay" @click="showLogoutModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Confirm Logout</h3>
          <button class="close-btn" @click="showLogoutModal = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to log out?</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showLogoutModal = false">Cancel</button>
          <button class="confirm-btn" @click="logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

// State
const username = ref("User");
const role = ref("");
const profileImage = ref("");
const loading = ref(true);
const lastLogin = ref(new Date());
const loginCount = ref(0);
const daysActive = ref(0);
const profileCompletion = ref(0);
const showLogoutModal = ref(false);
const sidebarOpen = ref(false);
const defaultAvatar = "https://ui-avatars.com/api/?background=0F2942&color=fff";

const router = useRouter();
const route = useRoute();
const auth = getAuth();
const currentRoute = computed(() => route.path);

// Routes configuration
const routes = [
  { path: '/', name: 'Home', icon: 'home' },
  { path: '/register', name: 'Register', icon: 'user-plus' },
  { path: '/login', name: 'Login', icon: 'log-in' },
  { path: '/edit-profile', name: 'Edit Profile', icon: 'user-edit', meta: { requiresAuth: true, role: 'user' } },
  { path: '/dashboard', name: 'Dashboard', icon: 'layout', meta: { requiresAuth: true } },
  { path: '/profile-display', name: 'Profile', icon: 'user', meta: { requiresAuth: true, role: 'user' } },
  { path: '/admin-dashboard', name: 'Admin Dashboard', icon: 'shield', meta: { requiresAuth: true, role: 'admin' } },
  { path: '/reset-password', name: 'Reset Password', icon: 'key' },
  { path: "/admin-management", name: "Admin Management", icon: 'users', meta: { requiresAuth: true, role: "admin" } },
];

// Group routes by section
const navigationSections = computed(() => {
  return [
    {
      title: 'General',
      routes: routes.filter(r => 
        r.path === '/' || 
        r.path === '/dashboard' || 
        r.path === '/profile-display'
      )
    },
    {
      title: 'User Management',
      routes: routes.filter(r => 
        r.path === '/edit-profile' || 
        r.path === '/reset-password'
      )
    },
    {
      title: 'Admin Controls',
      routes: routes.filter(r => 
        r.path === '/admin-dashboard' || 
        r.path === '/admin-management'
      )
    }
  ];
});

// Helper function to safely convert Firestore timestamp to Date
const getDateFromTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp && timestamp.seconds) {
    return new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
  }
  return new Date();
};

// Calculate profile completion
const calculateProfileCompletion = (userData) => {
  const requiredFields = ['username', 'email', 'completeName', 'age', 'birthday', 'cellphone', 'gender', 'address'];
  const completedFields = requiredFields.filter(field => userData[field]);
  return Math.round((completedFields.length / requiredFields.length) * 100);
};

// Update user data
const updateUserData = async (userDoc) => {
  if (!userDoc) return;
  
  const userData = userDoc.data();
  username.value = userData.username || auth.currentUser?.displayName || "User";
  role.value = userData.role;
  profileImage.value = userData.profileImageUrl;
  lastLogin.value = getDateFromTimestamp(userData.lastLogin);
  loginCount.value = userData.loginCount || 0;
  
  // Calculate days active
  const createdAt = getDateFromTimestamp(userData.createdAt);
  const diffTime = Math.abs(new Date() - createdAt);
  daysActive.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate profile completion
  profileCompletion.value = calculateProfileCompletion(userData);
};

// Set up real-time listener for user data
const setupUserListener = (userId) => {
  const userRef = doc(db, "users", userId);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      updateUserData(doc);
    }
  }, (error) => {
    console.error("Error listening to user data:", error);
  });
};

// Check if route should be shown based on user role
const shouldShowRoute = (route) => {
  if (route.path === '/login' || route.path === '/register') {
    return false;
  }
  
  if (route.meta?.requiresAuth) {
    if (route.meta.role && route.meta.role !== role.value) {
      return false;
    }
  }
  
  return true;
};

// Get icon for each route
const getIconForRoute = (route) => {
  const iconMap = {
    '/': 'home',
    '/dashboard': 'layout',
    '/profile-display': 'user',
    '/edit-profile': 'edit',
    '/reset-password': 'key',
    '/admin-dashboard': 'shield',
    '/admin-management': 'users'
  };
  
  return iconMap[route.path];
};

// Check if this is a new login session
const isNewSession = () => {
  const lastSessionTime = sessionStorage.getItem('lastSessionTime');
  const currentTime = Date.now();
  
  if (!lastSessionTime) {
    sessionStorage.setItem('lastSessionTime', currentTime.toString());
    return true;
  }
  
  return false;
};

// Toggle sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  
  if (sidebarOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Image error handler
const handleImageError = (e) => {
  e.target.src = defaultAvatar;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

const confirmLogout = () => {
  showLogoutModal.value = true;
};

const logout = async () => {
  try {
    sessionStorage.removeItem('lastSessionTime');
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Watch for route changes to close sidebar on mobile
watch(currentRoute, () => {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false;
    document.body.style.overflow = '';
  }
});

// Initialize component
let unsubscribeUser = null;
onMounted(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        if (unsubscribeUser) {
          unsubscribeUser();
        }
        
        unsubscribeUser = setupUserListener(user.uid);
        
        if (isNewSession()) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            await updateDoc(userRef, {
              lastLogin: Timestamp.now(),
              loginCount: (userData.loginCount || 0) + 1
            });
          }
        }
      } catch (error) {
        console.error("Error setting up dashboard:", error);
      }
    } else {
      router.push('/login');
    }
    loading.value = false;
  });

  // Check saved sidebar state
  const savedSidebarState = localStorage.getItem('sidebarOpen');
  sidebarOpen.value = savedSidebarState === 'true';

  // Cleanup on component unmount
  return () => {
    unsubscribeAuth();
    if (unsubscribeUser) {
      unsubscribeUser();
    }
  };
});

// Save sidebar state when changed
watch(sidebarOpen, (newValue) => {
  localStorage.setItem('sidebarOpen', newValue);
});
</script>

<style scoped>
/* Layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Sidebar Styles */
.sidebar-container {
  height: 100%;
  position: relative;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: rgba(15, 41, 66, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar-open .sidebar {
  transform: translateX(0);
}

.sidebar-toggle {
  position: absolute;
  top: 10px;
  right: -40px;
  width: 40px;
  height: 40px;
  background: #0f2942;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 101;
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  background: #1a4971;
}

.sidebar-profile {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-avatar {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}

.sidebar-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.status-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 6px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.admin {
  background-color: rgba(229, 62, 62, 0.2);
  color: #e53e3e;
}

.status-badge.user {
  background-color: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.sidebar-user-info h3 {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.sidebar-user-info p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}

.sidebar-nav {
  flex-grow: 1;
  overflow-y: auto;
  padding: 12px 0;
}

.nav-section {
  margin-bottom: 16px;
}

.nav-section .section-title {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 8px 24px;
  text-transform: uppercase;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  margin-bottom: 2px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link svg {
  margin-right: 12px;
  width: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.nav-link span {
  font-size: 0.9rem;
}

.nav-link:hover,
.nav-link.active {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-link.active svg {
  color: white;
}

.sidebar-footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logout {
  background: rgba(229, 62, 62, 0.1);
  color: #e53e3e;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-logout:hover {
  background: rgba(229, 62, 62, 0.2);
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.sidebar-open .sidebar-overlay {
  opacity: 1;
  visibility: visible;
}

/* Dashboard Styles */
.dashboard-wrapper {
  flex: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: margin-left 0.3s ease, width 0.3s ease;
}

/* When sidebar is open on larger screens, adjust main content */
@media (min-width: 1024px) {
  .sidebar-open .dashboard-wrapper {
    margin-left: 280px;
    width: calc(100% - 280px);
  }
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
.dashboard-card {
  width: 100%;
  max-width: 800px;
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

/* Welcome Section */
.welcome-section {
  text-align: center;
  margin-bottom: 32px;
}

.user-avatar {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.user-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid rgba(15, 41, 66, 0.1);
  object-fit: cover;
}

.role-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

.role-badge.admin {
  background-color: rgba(229, 62, 62, 0.1);
  color: #e53e3e;
  border: 1px solid rgba(229, 62, 62, 0.2);
}

.role-badge.user {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.welcome-text {
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.last-login {
  color: #666;
  font-size: 0.9rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background-color: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-icon {
  color: #0f2942;
  margin: 0 auto;
}

.stat-value {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* Admin Section */
.admin-section {
  background-color: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: #0f2942;
}

.admin-actions,
.user-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.action-button.primary {
  background-color: #0f2942;
  color: white;
}

.action-button.secondary {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
}

.action-button.danger {
  background-color: rgba(229, 62, 62, 0.1);
  border: 1px solid rgba(229, 62, 62, 0.2);
  color: #e53e3e;
}

.action-button:hover {
  transform: translateY(-2px);
}

.action-button.primary:hover {
  background-color: #1a4971;
}

.action-button.secondary:hover {
  background-color: #eee;
}

.action-button.danger:hover {
  background-color: rgba(229, 62, 62, 0.15);
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
  max-width: 400px;
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
  color: #333;
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
  color: #666;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.confirm-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
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
@media (max-width: 768px) {
  .card-content {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .welcome-text {
    font-size: 1.5rem;
  }

  .admin-actions,
  .user-actions {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar,
  .sidebar-toggle,
  .sidebar-overlay,
  .dashboard-wrapper,
  .spinner,
  .modal-overlay,
  .modal-content {
    transition: none;
    animation: none;
  }

  .action-button:hover {
    transform: none;
  }
}
</style>