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
        <h1 class="title">Purchase Request</h1>
        <p class="subtitle">Submit and manage your purchase requests.</p>
      </div>

      <div class="card-content">
        <!-- Submit Purchase Request Form -->
        <form @submit.prevent="submitRequest" class="form">
          <div class="form-section">
            <h2 class="section-title">Request Details</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="itemName">Item Name</label>
                <input 
                  id="itemName"
                  v-model="newRequest.itemName" 
                  type="text" 
                  class="input-field" 
                  placeholder="Enter item name" 
                  required 
                />
                <span v-if="validationErrors.itemName" class="error-message">{{ validationErrors.itemName }}</span>
              </div>
              <div class="form-group">
                <label class="form-label" for="quantity">Quantity</label>
                <input 
                  id="quantity"
                  v-model.number="newRequest.quantity" 
                  type="number" 
                  min="1"
                  class="input-field" 
                  placeholder="Enter quantity" 
                  required 
                />
                <span v-if="validationErrors.quantity" class="error-message">{{ validationErrors.quantity }}</span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="category">Category</label>
                <select 
                  id="category"
                  v-model="newRequest.category" 
                  class="input-field" 
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
                <span v-if="validationErrors.category" class="error-message">{{ validationErrors.category }}</span>
              </div>
              <div class="form-group">
                <label class="form-label" for="priority">Priority</label>
                <select 
                  id="priority"
                  v-model="newRequest.priority" 
                  class="input-field" 
                  required
                >
                  <option value="" disabled>Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <span v-if="validationErrors.priority" class="error-message">{{ validationErrors.priority }}</span>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="description">Description</label>
              <textarea 
                id="description"
                v-model="newRequest.description" 
                class="input-field textarea" 
                placeholder="Enter detailed description of the item(s)" 
                required
              ></textarea>
              <span v-if="validationErrors.description" class="error-message">{{ validationErrors.description }}</span>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="estimatedCost">Estimated Cost (₱)</label>
                <input 
                  id="estimatedCost"
                  v-model.number="newRequest.estimatedCost" 
                  type="number" 
                  min="0" 
                  step="0.01"
                  class="input-field" 
                  placeholder="Enter estimated cost" 
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="requiredDate">Required By</label>
                <input 
                  id="requiredDate"
                  v-model="newRequest.requiredDate" 
                  type="date" 
                  class="input-field" 
                  :min="minDate"
                  required
                />
                <span v-if="validationErrors.requiredDate" class="error-message">{{ validationErrors.requiredDate }}</span>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="justification">Justification</label>
              <textarea 
                id="justification"
                v-model="newRequest.justification" 
                class="input-field textarea" 
                placeholder="Explain why this purchase is necessary" 
                required
              ></textarea>
              <span v-if="validationErrors.justification" class="error-message">{{ validationErrors.justification }}</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="resetForm">Reset</button>
            <button 
              type="submit" 
              class="btn-primary" 
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
            </button>
          </div>
        </form>
        
        <!-- Success/Error Notification -->
        <div v-if="notification.show" :class="['notification', notification.type]">
          <div class="notification-content">
            <span v-if="notification.type === 'success'" class="notification-icon success">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </span>
            <span v-else class="notification-icon error">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </span>
            <p>{{ notification.message }}</p>
            <button class="notification-close" @click="closeNotification">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";
import { db, auth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  name: "PurchaseRequest",
  
  setup() {
    // Form data
    const newRequest = reactive({
      itemName: "",
      quantity: 1,
      description: "",
      category: "",
      priority: "",
      estimatedCost: null,
      requiredDate: "",
      justification: ""
    });
    
    // Validation errors
    const validationErrors = reactive({});
    
    // UI state
    const isSubmitting = ref(false);
    const notification = reactive({
      show: false,
      type: "success",
      message: ""
    });
    
    // Available categories
    const categories = [
      "Office Supplies",
      "IT Equipment",
      "Furniture",
      "Maintenance",
      "Services",
      "Other"
    ];
    
    // Minimum date for the required date field (today)
    const minDate = computed(() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    });
    
    // Validate form
    const validateForm = () => {
      const errors = {};
      
      if (!newRequest.itemName.trim()) {
        errors.itemName = "Item name is required";
      }
      
      if (!newRequest.quantity || newRequest.quantity < 1) {
        errors.quantity = "Quantity must be at least 1";
      }
      
      if (!newRequest.category) {
        errors.category = "Please select a category";
      }
      
      if (!newRequest.priority) {
        errors.priority = "Please select a priority level";
      }
      
      if (!newRequest.description.trim()) {
        errors.description = "Description is required";
      } else if (newRequest.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters";
      }
      
      if (!newRequest.requiredDate) {
        errors.requiredDate = "Required date is required";
      }
      
      if (!newRequest.justification.trim()) {
        errors.justification = "Justification is required";
      }
      
      return errors;
    };
    
    // Submit request
    const submitRequest = async () => {
      // Validate form
      const errors = validateForm();
      
      if (Object.keys(errors).length > 0) {
        Object.assign(validationErrors, errors);
        showNotification("error", "Please fix the errors in the form");
        return;
      }
      
      // Clear previous validation errors
      Object.keys(validationErrors).forEach(key => {
        delete validationErrors[key];
      });
      
      isSubmitting.value = true;
      
      try {
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          showNotification("error", "You must be logged in to submit a request");
          isSubmitting.value = false;
          return;
        }
        
        // Prepare request data
        const requestData = {
          ...newRequest,
          userId: currentUser.uid,
          userEmail: currentUser.email,
          status: "pending",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        // Add document to Firestore
        await addDoc(collection(db, "purchaseRequests"), requestData);
        
        // Show success notification
        showNotification("success", "Purchase request submitted successfully!");
        
        // Reset form
        resetForm();
      } catch (error) {
        console.error("Error submitting purchase request:", error);
        showNotification("error", "Failed to submit request. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // Reset form
    const resetForm = () => {
      Object.assign(newRequest, {
        itemName: "",
        quantity: 1,
        description: "",
        category: "",
        priority: "",
        estimatedCost: null,
        requiredDate: "",
        justification: ""
      });
      
      // Clear validation errors
      Object.keys(validationErrors).forEach(key => {
        delete validationErrors[key];
      });
    };
    
    // Show notification
    const showNotification = (type, message) => {
      notification.type = type;
      notification.message = message;
      notification.show = true;
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        notification.show = false;
      }, 5000);
    };
    
    // Close notification
    const closeNotification = () => {
      notification.show = false;
    };
    
    return {
      newRequest,
      validationErrors,
      isSubmitting,
      notification,
      categories,
      minDate,
      submitRequest,
      resetForm,
      closeNotification
    };
  }
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

/* Form Styling */
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f2942;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 16px;
  }
}

.form-group {
  flex: 1;
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 6px;
}

/* Input Field Styling */
.input-field {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 14px;
  color: #2d3748;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.input-field:focus {
  border-color: #3182ce;
  outline: none;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.error-message {
  display: block;
  color: #e53e3e;
  font-size: 12px;
  margin-top: 4px;
}

/* Button Styling */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #4a5568;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: #cbd5e0;
}

.btn-primary {
  background-color: #0f2942;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.btn-primary:hover {
  background-color: #1a4971;
}

.btn-primary:disabled {
  background-color: #90cdf4;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Notification */
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  min-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background-color: #ebf8ff;
  border-left: 4px solid #3182ce;
}

.notification.error {
  background-color: #fff5f5;
  border-left: 4px solid #e53e3e;
}

.notification-content {
  display: flex;
  align-items: center;
  padding: 16px;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.notification-icon.success {
  background-color: #bee3f8;
  color: #2b6cb0;
}

.notification-icon.error {
  background-color: #fed7d7;
  color: #c53030;
}

.notification p {
  flex: 1;
  margin: 0;
  color: #2d3748;
  font-size: 14px;
}

.notification-close {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  color: #718096;
  background-color: #edf2f7;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .notification {
    animation: none;
  }
  
  .spinner {
    animation: none;
  }
}
</style>