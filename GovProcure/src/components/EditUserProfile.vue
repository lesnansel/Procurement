<template>
  <div class="edit-profile-wrapper">
    <!-- Background Pattern -->
    <div class="background-pattern">
      <div class="pattern-overlay"></div>
    </div>

    <!-- Edit Profile Card -->
    <div class="profile-card">
      <div class="card-header">
        <div class="logo-container">
          <img src="/placeholder.svg?height=70&width=70" alt="Procurement System Logo" class="logo" />
        </div>
        <h1 class="title">Edit Profile</h1>
        <p class="subtitle">Update your personal information</p>
      </div>

      <div class="card-content">
        <!-- Profile Picture Section -->
        <div class="profile-picture-section">
          <div class="profile-image-container">
            <img 
              :src="previewUrl || profileImageUrl || defaultProfilePic" 
              alt="Profile Picture" 
              class="profile-img"
            />
            <div class="upload-overlay" @click="triggerFileInput">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="camera-icon"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              <span>Change Photo</span>
            </div>
          </div>
          <input 
            type="file" 
            ref="fileInput"
            @change="handleFileUpload" 
            accept="image/*"
            class="hidden"
          />
          <button 
            v-if="selectedFile"
            @click="updateProfileImage" 
            :disabled="isLoading"
            class="upload-btn"
          >
            <span v-if="!isLoading">Upload New Picture</span>
            <span v-else class="spinner"></span>
          </button>
          <p v-if="uploadError" class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="error-icon"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            {{ uploadError }}
          </p>
        </div>

        <!-- User Info Form -->
        <form @submit.prevent="updateProfileInfo" class="edit-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="completeName">Complete Name</label>
              <input 
                type="text" 
                id="completeName"
                v-model="completeName" 
                required
              />
            </div>

            <div class="form-group">
              <label for="age">Age</label>
              <input 
                type="number" 
                id="age"
                v-model="age" 
                required
              />
            </div>

            <div class="form-group">
              <label for="birthday">Birthday</label>
              <input 
                type="date" 
                id="birthday"
                v-model="birthday" 
                required
              />
            </div>

            <div class="form-group">
              <label for="cellphone">Cellphone Number</label>
              <input 
                type="tel" 
                id="cellphone"
                v-model="cellphone" 
                required
              />
            </div>

            <div class="form-group">
              <label for="gender">Gender</label>
              <select 
                id="gender"
                v-model="gender" 
                required
              >
                <option value="" disabled selected>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group full-width">
              <label for="address">Complete Address</label>
              <input 
                type="text" 
                id="address"
                v-model="address" 
                required
              />
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Save Changes</span>
              <span v-else class="spinner"></span>
            </button>

            <button 
              type="button"
              class="cancel-btn"
              @click="$router.push('/profile-display')"
            >
              Cancel
            </button>

            <button 
              type="button"
              class="deactivate-btn"
              @click="showDeactivateModal = true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="user-slash-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="4" x2="7" y2="20"/></svg>
              Deactivate Account
            </button>
          </div>

          <div v-if="successMessage" class="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            {{ successMessage }}
          </div>

          <div v-if="errorMessage" class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="error-icon"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>

    <!-- Deactivation Modal -->
    <div v-if="showDeactivateModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="warning-icon"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            Deactivate Account
          </h3>
          <button class="close-btn" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="modal-body">
          <p class="warning-text">
            This action cannot be undone. Please enter your password to confirm.
          </p>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password"
              v-model="password"
              required
            />
          </div>

          <p v-if="deactivateError" class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="error-icon"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            {{ deactivateError }}
          </p>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="closeModal">Cancel</button>
          <button 
            class="confirm-btn" 
            @click="confirmDeactivation"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Confirm Deactivation</span>
            <span v-else class="spinner"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, storage } from "../firebase";

// Form state
const completeName = ref("");
const age = ref("");
const birthday = ref("");
const cellphone = ref("");
const gender = ref("");
const address = ref("");
const profileImageUrl = ref("");
const previewUrl = ref("");
const selectedFile = ref(null);
const fileInput = ref(null);

// UI state
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const uploadError = ref("");
const showDeactivateModal = ref(false);
const password = ref("");
const deactivateError = ref("");

const router = useRouter();
const auth = getAuth();
const defaultProfilePic = "https://ui-avatars.com/api/?background=0F2942&color=fff";

// Load user data
onMounted(async () => {
  const user = auth.currentUser;
  if (!user) {
    router.push("/login");
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      completeName.value = data.completeName || "";
      age.value = data.age || "";
      birthday.value = data.birthday || "";
      cellphone.value = data.cellphone || "";
      gender.value = data.gender || "";
      address.value = data.address || "";
      profileImageUrl.value = data.profileImageUrl || "";
    }
  } catch (error) {
    errorMessage.value = "Failed to load profile data";
  }
});

// Profile picture handling
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    uploadError.value = "Please select an image file";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = "Image size should be less than 5MB";
    return;
  }

  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
  uploadError.value = "";
};

const updateProfileImage = async () => {
  const user = auth.currentUser;
  if (!user || !selectedFile.value) return;

  isLoading.value = true;
  uploadError.value = "";

  try {
    const fileRef = storageRef(storage, `profile_pictures/${user.uid}-${Date.now()}`);
    await uploadBytes(fileRef, selectedFile.value);
    const imageUrl = await getDownloadURL(fileRef);

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      profileImageUrl: imageUrl,
    });

    profileImageUrl.value = imageUrl;
    selectedFile.value = null;
    successMessage.value = "Profile picture updated successfully!";
  } catch (error) {
    uploadError.value = "Failed to upload profile picture";
  } finally {
    isLoading.value = false;
  }
};

// Profile info update
const updateProfileInfo = async () => {
  const user = auth.currentUser;
  if (!user) return;

  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      completeName: completeName.value,
      age: age.value,
      birthday: birthday.value,
      cellphone: cellphone.value,
      gender: gender.value,
      address: address.value,
    });

    successMessage.value = "Profile updated successfully!";
    setTimeout(() => {
      router.push("/profile-display");
    }, 2000);
  } catch (error) {
    errorMessage.value = "Failed to update profile";
  } finally {
    isLoading.value = false;
  }
};

// Account deactivation
const confirmDeactivation = async () => {
  if (!password.value.trim()) {
    deactivateError.value = "Please enter your password";
    return;
  }

  isLoading.value = true;
  deactivateError.value = "";

  try {
    const user = auth.currentUser;
    await signInWithEmailAndPassword(auth, user.email, password.value);

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      status: "deactivated",
    });

    await auth.signOut();
    router.push("/login");
  } catch (error) {
    deactivateError.value = "Incorrect password";
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  showDeactivateModal.value = false;
  password.value = "";
  deactivateError.value = "";
};
</script>

<style scoped>
.edit-profile-wrapper {
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

/* Profile Picture Section */
.profile-picture-section {
  text-align: center;
  margin-bottom: 30px;
}

.profile-image-container {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(15, 41, 66, 0.1);
  object-fit: cover;
  transition: transform 0.3s;
}

.upload-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
}

.upload-overlay:hover {
  opacity: 1;
}

.camera-icon {
  margin-bottom: 4px;
}

.hidden {
  display: none;
}

.upload-btn {
  background-color: #0f2942;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn:hover:not(:disabled) {
  background-color: #1a4971;
}

.upload-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Form Styles */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0f2942;
  outline: none;
  box-shadow: 0 0 0 2px rgba(15, 41, 66, 0.1);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.submit-btn {
  flex: 1;
  background-color: #0f2942;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1a4971;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background-color: #e9ecef;
}

.deactivate-btn {
  background-color: rgba(229, 62, 62, 0.1);
  border: 1px solid rgba(229, 62, 62, 0.2);
  color: #e53e3e;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.deactivate-btn:hover {
  background-color: rgba(229, 62, 62, 0.15);
}

.success-message,
.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
}

.success-message {
  background-color: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.error-message {
  background-color: rgba(229, 62, 62, 0.1);
  border: 1px solid rgba(229, 62, 62, 0.2);
  color: #e53e3e;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  color: #e53e3e;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-icon {
  color: #e53e3e;
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

.warning-text {
  margin-bottom: 20px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.confirm-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #dc2626;
}

.confirm-btn:disabled {
  opacity: 0.7;
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
@media (max-width: 640px) {
  .card-content {
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }

  .profile-img {
    transition: none;
  }

  .modal-overlay,
  .modal-content {
    animation: none;
  }
}
</style>