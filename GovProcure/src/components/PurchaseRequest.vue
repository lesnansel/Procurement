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
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Item Name</label>
              <input v-model="newRequest.itemName" type="text" class="input-field" placeholder="Enter item name" required />
            </div>
            <div class="form-group">
              <label class="form-label">Quantity</label>
              <input v-model="newRequest.quantity" type="number" class="input-field" placeholder="Enter quantity" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea v-model="newRequest.description" class="input-field" placeholder="Enter description" required></textarea>
          </div>
          <button type="submit" class="btn-primary">Submit Request</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const newRequest = ref({
      itemName: "",
      quantity: 0,
      description: "",
    });

    const submitRequest = async () => {
      try {
        await addDoc(collection(db, "purchaseRequests"), newRequest.value);
        alert("Purchase request submitted successfully!");
        newRequest.value = { itemName: "", quantity: 0, description: "" };
      } catch (error) {
        console.error("Error submitting purchase request:", error);
      }
    };

    return {
      newRequest,
      submitRequest,
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

/* Form Row Styling */
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
}

/* Input Field Styling */
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 14px;
  color: #2d3748;
  background-color: #f7fafc;
  margin-top: 5px;
}

.input-field:focus {
  border-color: #3182ce;
  outline: none;
  background-color: #ffffff;
}
</style>
