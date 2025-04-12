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
        <h1 class="title">Contract Management</h1>
        <p class="subtitle">Manage all contracts efficiently</p>
      </div>

      <div class="card-content">
        <!-- Add Contract Form -->
        <form @submit.prevent="addContract" class="form">
          <div class="form-group">
            <label class="form-label">Supplier</label>
            <input v-model="newContract.supplier" type="text" class="input-field" placeholder="Enter supplier name" required />
          </div>
          <div class="form-group">
            <label class="form-label">PO Number</label>
            <input v-model="newContract.poNumber" type="text" class="input-field" placeholder="Enter PO number" required />
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select v-model="newContract.status" class="input-field" required>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="btn-primary">Add Contract</button>
        </form>

        <!-- Contracts List -->
        <div v-if="contracts.length" class="table-container">
          <table class="contracts-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>PO Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contract, index) in contracts" :key="contract.id">
                <td>{{ contract.supplier }}</td>
                <td>{{ contract.poNumber }}</td>
                <td class="capitalize">{{ contract.status }}</td>
                <td>
                  <button @click="editContract(index)" class="btn-link">Edit</button>
                  <button @click="deleteContract(contract.id)" class="btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="loading-state">No contracts available.</p>

        <!-- Edit Contract Modal -->
        <div v-if="isEditing" class="modal-overlay">
          <div class="modal">
            <h3 class="modal-title">Edit Contract</h3>
            <form @submit.prevent="updateContract">
              <div class="form-group">
                <label class="form-label">Supplier</label>
                <input v-model="editContractData.supplier" type="text" class="input-field" placeholder="Enter supplier name" required />
              </div>
              <div class="form-group">
                <label class="form-label">PO Number</label>
                <input v-model="editContractData.poNumber" type="text" class="input-field" placeholder="Enter PO number" required />
              </div>
              <div class="form-group">
                <label class="form-label">Status</label>
                <select v-model="editContractData.status" class="input-field" required>
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
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
    const contracts = ref([]);
    const newContract = ref({ supplier: "", poNumber: "", status: "Pending" });
    const isEditing = ref(false);
    const editContractData = ref({});
    const editContractIndex = ref(null);

    const fetchContracts = async () => {
      const querySnapshot = await getDocs(collection(db, "contracts"));
      contracts.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    const addContract = async () => {
      try {
        await addDoc(collection(db, "contracts"), newContract.value);
        alert("Contract added successfully");
        newContract.value = { supplier: "", poNumber: "", status: "Pending" };
        fetchContracts();
      } catch (error) {
        console.error("Error adding contract:", error);
        alert("Failed to add contract. Please try again.");
      }
    };

    const editContract = (index) => {
      editContractIndex.value = index;
      editContractData.value = { ...contracts.value[index] };
      isEditing.value = true;
    };

    const updateContract = async () => {
      try {
        const contractRef = doc(db, "contracts", editContractData.value.id);
        await updateDoc(contractRef, {
          supplier: editContractData.value.supplier,
          poNumber: editContractData.value.poNumber,
          status: editContractData.value.status,
        });
        alert("Contract updated successfully");
        isEditing.value = false;
        fetchContracts();
      } catch (error) {
        console.error("Error updating contract:", error);
        alert("Failed to update contract. Please try again.");
      }
    };

    const deleteContract = async (id) => {
      if (confirm("Are you sure you want to delete this contract?")) {
        try {
          await deleteDoc(doc(db, "contracts", id));
          alert("Contract deleted successfully");
          fetchContracts();
        } catch (error) {
          console.error("Error deleting contract:", error);
          alert("Failed to delete contract. Please try again.");
        }
      }
    };

    onMounted(fetchContracts);

    return {
      contracts,
      newContract,
      isEditing,
      editContractData,
      addContract,
      editContract,
      updateContract,
      deleteContract,
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

.contracts-table {
  width: 100%;
  border-collapse: collapse;
}

.contracts-table th,
.contracts-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.contracts-table th {
  background-color: #2c5282;
  color: white;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
}

.contracts-table td {
  color: #4a5568;
  font-size: 14px;
}

.contracts-table tr:hover td {
  background-color: #ebf8ff;
}

.loading-state {
  text-align: center;
  color: #1a202c;
  font-size: 16px;
  font-weight: bold;
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

/* Enhanced Buttons */
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

/* Enhanced Modal */
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

.modal-actions button {
  padding: 8px 16px;
  font-size: 14px;
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
</style>