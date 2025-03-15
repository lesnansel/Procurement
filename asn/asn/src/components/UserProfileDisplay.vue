<template>
  <div class="profile-wrapper">
    <!-- Background Pattern -->
    <div class="background-pattern">
      <div class="pattern-overlay"></div>
    </div>

    <!-- Profile Card -->
    <div class="profile-card">
      <div class="card-header">
        <div class="logo-container">
          <img src="/placeholder.svg" alt="Procurement System Logo" class="logo" />
        </div>
        <h1 class="title">User Profile</h1>
        <p class="subtitle">View and manage your account information</p>
      </div>

      <div class="card-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading profile...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="errorMessage" class="error-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="error-icon"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          <p>{{ errorMessage }}</p>
          <button @click="fetchUserProfile" class="retry-button">
            Retry
          </button>
        </div>

        <!-- Profile Content -->
        <div v-else class="profile-content">
          <div class="profile-header">
            <div class="profile-image-container">
              <img 
                :src="profileImageUrl || defaultProfilePic" 
                :alt="`${username}'s profile picture`" 
                class="profile-img"
                @error="handleImageError"
              />
              <div class="status-badge" :class="status">
                {{ status }}
              </div>
            </div>
            <h2 class="username">{{ username || "Not provided" }}</h2>
            <p class="email">{{ email || "Not provided" }}</p>
          </div>

          <div class="profile-sections">
            <!-- Personal Information -->
            <div class="section">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                Personal Information
              </h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Complete Name</label>
                  <p>{{ completeName || "Not provided" }}</p>
                </div>
                <div class="info-item">
                  <label>Age</label>
                  <p>{{ age || "Not provided" }}</p>
                </div>
                <div class="info-item">
                  <label>Birthday</label>
                  <p>{{ birthday || "Not provided" }}</p>
                </div>
                <div class="info-item">
                  <label>Gender</label>
                  <p>{{ gender || "Not provided" }}</p>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="section">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Contact Information
              </h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Cellphone</label>
                  <p>{{ cellphone || "Not provided" }}</p>
                </div>
                <div class="info-item">
                  <label>Address</label>
                  <p>{{ address || "Not provided" }}</p>
                </div>
              </div>
            </div>
          </div>

          <router-link to="/edit-profile" class="edit-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="edit-icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit Profile
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// State
const username = ref("");
const email = ref("");
const completeName = ref("");
const age = ref("");
const birthday = ref("");
const cellphone = ref("");
const gender = ref("");
const address = ref("");
const profileImageUrl = ref("");
const status = ref("");
const errorMessage = ref("");
const loading = ref(true);

// Default profile picture with modern design
const defaultProfilePic = "https://ui-avatars.com/api/?background=0F2942&color=fff";

const handleImageError = (e) => {
  e.target.src = defaultProfilePic;
};

const fetchUserProfile = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      errorMessage.value = "Please sign in to view your profile";
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      username.value = data.username;
      email.value = data.email;
      completeName.value = data.completeName;
      age.value = data.age;
      birthday.value = data.birthday;
      cellphone.value = data.cellphone;
      gender.value = data.gender;
      address.value = data.address;
      profileImageUrl.value = data.profileImageUrl;
      status.value = data.status || "active";
    } else {
      errorMessage.value = "Profile not found. Please complete your profile setup.";
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    errorMessage.value = "Unable to load profile. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.profile-wrapper {
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
.profile-card {
  width: 100%;
  max-width: 600px;
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

/* Error Container */
.error-container {
  text-align: center;
  color: #e53e3e;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.error-icon {
  color: #e53e3e;
  width: 40px;
  height: 40px;
}

.retry-button {
  margin-top: 8px;
  padding: 8px 16px;
  background-color: rgba(229, 62, 62, 0.1);
  border: 1px solid rgba(229, 62, 62, 0.2);
  border-radius: 6px;
  color: #e53e3e;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-button:hover {
  background-color: rgba(229, 62, 62, 0.2);
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-header {
  text-align: center;
}

.profile-image-container {
  position: relative;
  display: inline-block;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(15, 41, 66, 0.1);
  object-fit: cover;
  transition: transform 0.3s;
}

.profile-img:hover {
  transform: scale(1.05);
}

.status-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.active {
  background-color: rgba(34, 197, 94, 0.1);
  color: #16a34a;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-badge.deactivated {
  background-color: rgba(229, 62, 62, 0.1);
  color: #e53e3e;
  border: 1px solid rgba(229, 62, 62, 0.2);
}

.username {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 16px 0 4px;
}

.email {
  color: #666;
  font-size: 0.9rem;
}

/* Profile Sections */
.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 24px;
  border: 1px solid #eee;
}

.section-title {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: #0f2942;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item label {
  color: #666;
  font-size: 0.85rem;
  font-weight: 500;
}

.info-item p {
  color: #333;
  font-size: 1rem;
}

/* Edit Button */
.edit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #0f2942;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  align-self: center;
}

.edit-button:hover {
  background-color: #1a4971;
}

.edit-icon {
  color: white;
}

@media (max-width: 640px) {
  .card-content {
    padding: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .profile-img {
    width: 100px;
    height: 100px;
  }

  .section {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }

  .profile-img:hover {
    transform: none;
  }
}
</style>