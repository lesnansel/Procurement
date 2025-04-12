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
        <h1 class="title">Payment Processing</h1>
        <p class="subtitle">Manage and process payments efficiently.</p>
      </div>

      <div class="card-content">
        <!-- Add Payment Form -->
        <form @submit.prevent="addPayment" class="form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Supplier</label>
              <input v-model="newPayment.supplier" type="text" class="input-field" placeholder="Enter supplier name" required />
            </div>
            <div class="form-group">
              <label class="form-label">Amount</label>
              <input v-model="newPayment.amount" type="number" class="input-field" placeholder="Enter payment amount" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select v-model="newPayment.status" class="input-field" required>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <button type="submit" class="btn-primary">Add Payment</button>
        </form>

        <!-- Payments List -->
        <div v-if="payments.length" class="table-container">
          <table class="payments-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(payment, index) in payments" :key="payment.id">
                <td>{{ payment.supplier }}</td>
                <td>{{ formatCurrency(payment.amount) }}</td>
                <td class="capitalize">{{ payment.status }}</td>
                <td>
                  <button @click="editPayment(index)" class="btn-link">Edit</button>
                  <button @click="deletePayment(payment.id)" class="btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="loading-state">No payments available.</p>

        <!-- Edit Payment Modal -->
        <div v-if="isEditing" class="modal-overlay">
          <div class="modal">
            <h3 class="modal-title">Edit Payment</h3>
            <form @submit.prevent="updatePayment">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Supplier</label>
                  <input v-model="editPaymentData.supplier" type="text" class="input-field" placeholder="Enter supplier name" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Amount</label>
                  <input v-model="editPaymentData.amount" type="number" class="input-field" placeholder="Enter payment amount" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Status</label>
                <select v-model="editPaymentData.status" class="input-field" required>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div class="modal-actions">
                <button type="button" @click="isEditing = false" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Update</button>
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
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default {
  setup() {
    const payments = ref([]);
    const newPayment = ref({ supplier: "", amount: "", status: "Pending" });
    const isEditing = ref(false);
    const editPaymentData = ref({});
    const editPaymentIndex = ref(null);

    const fetchPayments = async () => {
      const querySnapshot = await getDocs(collection(db, "payments"));
      payments.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    const addPayment = async () => {
      try {
        await addDoc(collection(db, "payments"), newPayment.value);
        alert("Payment added successfully");
        newPayment.value = { supplier: "", amount: "", status: "Pending" };
        fetchPayments();
      } catch (error) {
        console.error("Error adding payment:", error);
        alert("Failed to add payment. Please try again.");
      }
    };

    const editPayment = (index) => {
      editPaymentIndex.value = index;
      editPaymentData.value = { ...payments.value[index] };
      isEditing.value = true;
    };

    const updatePayment = async () => {
      try {
        const paymentRef = doc(db, "payments", editPaymentData.value.id);
        await updateDoc(paymentRef, {
          supplier: editPaymentData.value.supplier,
          amount: editPaymentData.value.amount,
          status: editPaymentData.value.status,
        });
        alert("Payment updated successfully");
        isEditing.value = false;
        fetchPayments();
      } catch (error) {
        console.error("Error updating payment:", error);
        alert("Failed to update payment. Please try again.");
      }
    };

    const deletePayment = async (id) => {
      if (confirm("Are you sure you want to delete this payment?")) {
        try {
          await deleteDoc(doc(db, "payments", id));
          alert("Payment deleted successfully");
          fetchPayments();
        } catch (error) {
          console.error("Error deleting payment:", error);
          alert("Failed to delete payment. Please try again.");
        }
      }
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    onMounted(fetchPayments);

    return {
      payments,
      newPayment,
      isEditing,
      editPaymentData,
      addPayment,
      editPayment,
      updatePayment,
      deletePayment,
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

.payments-table {
  width: 100%;
  border-collapse: collapse;
}

.payments-table th,
.payments-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.payments-table th {
  background-color: #2c5282;
  color: white;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
}

.payments-table td {
  color: #4a5568;
  font-size: 14px;
}

.payments-table tr:hover td {
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
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 15px;
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

.modal-actions button {
  padding: 8px 16px;
  font-size: 14px;
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
  background-color: #3182ce;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2b6cb0;
}

.btn-danger {
  background-color: #e53e3e;
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c53030;
}

.btn-link {
  background: none;
  color: #3182ce;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}

.btn-link:hover {
  color: #2b6cb0;
}

/* Enhanced Input Fields */
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

/* Form Label Styling */
.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 5px;
  display: block;
}

/* Input Placeholder Styling */
.input-field::placeholder {
  color: #a0aec0;
  font-size: 14px;
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

/* Table Alignment */
.payments-table th,
.payments-table td {
  text-align: center;
}
</style>