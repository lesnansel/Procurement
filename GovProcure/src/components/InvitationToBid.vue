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
        <h1 class="title">Invitation to Bid</h1>
        <p class="subtitle">Create and manage invitations to bid for procurement projects.</p>
      </div>

      <div class="card-content">
        <!-- Create Invitation Form -->
        <form @submit.prevent="createInvitation" class="form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Project Name</label>
              <input v-model="newInvitation.projectName" type="text" class="input-field" placeholder="Enter project name" required />
            </div>
            <div class="form-group">
              <label class="form-label">Deadline</label>
              <input v-model="newInvitation.deadline" type="date" class="input-field" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea v-model="newInvitation.description" class="input-field" placeholder="Enter description" required></textarea>
          </div>
          <button type="submit" class="btn-primary">Create Invitation</button>
        </form>

        <!-- Invitations List -->
        <div v-if="invitations.length" class="table-container">
          <table class="invitations-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Deadline</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(invitation, index) in invitations" :key="invitation.id">
                <td>{{ invitation.projectName }}</td>
                <td>{{ formatDate(invitation.deadline) }}</td>
                <td>{{ invitation.description }}</td>
                <td>
                  <button @click="editInvitation(index)" class="btn-link">Edit</button>
                  <button @click="deleteInvitation(invitation.id)" class="btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="loading-state">No invitations available.</p>

        <!-- Edit Invitation Modal -->
        <div v-if="isEditing" class="modal-overlay">
          <div class="modal">
            <h3 class="modal-title">Edit Invitation</h3>
            <form @submit.prevent="updateInvitation">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Project Name</label>
                  <input v-model="editInvitationData.projectName" type="text" class="input-field" placeholder="Enter project name" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Deadline</label>
                  <input v-model="editInvitationData.deadline" type="date" class="input-field" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea v-model="editInvitationData.description" class="input-field" placeholder="Enter description" required></textarea>
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
    const invitations = ref([]);
    const newInvitation = ref({ projectName: "", deadline: "", description: "" });
    const isEditing = ref(false);
    const editInvitationData = ref({});
    const editInvitationIndex = ref(null);

    const fetchInvitations = async () => {
      const querySnapshot = await getDocs(collection(db, "invitations"));
      invitations.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    const createInvitation = async () => {
      try {
        await addDoc(collection(db, "invitations"), newInvitation.value);
        alert("Invitation created successfully");
        newInvitation.value = { projectName: "", deadline: "", description: "" };
        fetchInvitations();
      } catch (error) {
        console.error("Error creating invitation:", error);
        alert("Failed to create invitation. Please try again.");
      }
    };

    const editInvitation = (index) => {
      editInvitationIndex.value = index;
      editInvitationData.value = { ...invitations.value[index] };
      isEditing.value = true;
    };

    const updateInvitation = async () => {
      try {
        const invitationRef = doc(db, "invitations", editInvitationData.value.id);
        await updateDoc(invitationRef, {
          projectName: editInvitationData.value.projectName,
          deadline: editInvitationData.value.deadline,
          description: editInvitationData.value.description,
        });
        alert("Invitation updated successfully");
        isEditing.value = false;
        fetchInvitations();
      } catch (error) {
        console.error("Error updating invitation:", error);
        alert("Failed to update invitation. Please try again.");
      }
    };

    const deleteInvitation = async (id) => {
      if (confirm("Are you sure you want to delete this invitation?")) {
        try {
          await deleteDoc(doc(db, "invitations", id));
          alert("Invitation deleted successfully");
          fetchInvitations();
        } catch (error) {
          console.error("Error deleting invitation:", error);
          alert("Failed to delete invitation. Please try again.");
        }
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    onMounted(fetchInvitations);

    return {
      invitations,
      newInvitation,
      isEditing,
      editInvitationData,
      createInvitation,
      editInvitation,
      updateInvitation,
      deleteInvitation,
      formatDate,
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

.invitations-table {
  width: 100%;
  border-collapse: collapse;
}

.invitations-table th,
.invitations-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.invitations-table th {
  background-color: #2b6cb0;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.invitations-table td {
  color: #2d3748;
  font-size: 14px;
}

.invitations-table tr:hover td {
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

/* Enhanced Table Design */
.invitations-table th {
  background-color: #2c5282;
  color: white;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
}

.invitations-table td {
  font-size: 14px;
  color: #4a5568;
}

.invitations-table tr:hover td {
  background-color: #ebf8ff;
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
.invitations-table th,
.invitations-table td {
  text-align: center;
}
</style>