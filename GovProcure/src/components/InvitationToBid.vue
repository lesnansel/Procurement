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
        <!-- Search and Filter Bar -->
        <div class="action-bar">
          <div class="search-container">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search invitations..." 
              class="search-input"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <button @click="showCreateForm = !showCreateForm" class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
            {{ showCreateForm ? 'Hide Form' : 'New Invitation' }}
          </button>
        </div>

        <!-- Create Invitation Form -->
        <div v-if="showCreateForm" class="form-container">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Create New Invitation
          </h3>
          <form @submit.prevent="createInvitation" class="form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  Project Name
                </label>
                <input v-model="newInvitation.projectName" type="text" class="input-field" placeholder="Enter project name" required />
              </div>
              <div class="form-group">
                <label class="form-label">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Deadline
                </label>
                <input v-model="newInvitation.deadline" type="date" class="input-field" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                Description
              </label>
              <textarea v-model="newInvitation.description" class="input-field textarea" placeholder="Enter description" required></textarea>
            </div>
            <div class="form-actions">
              <button type="button" @click="resetForm" class="btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                Reset
              </button>
              <button type="submit" class="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                Create Invitation
              </button>
            </div>
          </form>
        </div>

        <!-- Invitations List -->
        <div class="section-header">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            Current Invitations
          </h3>
          <div class="status-count">
            <span>Total: {{ filteredInvitations.length }}</span>
          </div>
        </div>
        
        <div v-if="filteredInvitations.length" class="table-container">
          <table class="invitations-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Deadline</th>
                <th>Description</th>
                <th class="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invitation in filteredInvitations" :key="invitation.id" class="table-row">
                <td>{{ invitation.projectName }}</td>
                <td>
                  <span class="deadline-badge" :class="isDeadlineSoon(invitation.deadline) ? 'deadline-soon' : ''">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {{ formatDate(invitation.deadline) }}
                  </span>
                </td>
                <td class="description-cell">{{ invitation.description }}</td>
                <td>
                  <div class="actions-container">
                    <div class="action-buttons">
                      <button @click="handleEdit(invitation)" class="action-btn edit" title="Edit Invitation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button @click="handleDelete(invitation.id)" class="action-btn delete" title="Delete Invitation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                      <button @click="handleView(invitation)" class="action-btn view" title="View Details">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="!invitations.length" class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 0-2 2"></path><path d="M8 6h3a1 1 0 0 1 1 1v9"></path><path d="M8 22h4a2 2 0 0 0 2-2v-7"></path><path d="M2 19h5"></path><path d="M18 5V3c0-.6-.4-1-1-1h-4a1 1 0 0 0-1 1v2"></path><path d="M10 5V3c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v2"></path></svg>
          <p class="empty-text">No invitations available.</p>
          <p class="empty-subtext">Create your first invitation to get started.</p>
        </div>
        <div v-else class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>
          <p class="empty-text">No matching invitations found.</p>
          <p class="empty-subtext">Try adjusting your search criteria.</p>
        </div>

        <!-- Edit Invitation Modal -->
        <div v-if="isEditing" class="modal-overlay" @click.self="closeEditModal">
          <div class="modal">
            <div class="modal-header">
              <h3 class="modal-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit Invitation
              </h3>
              <button @click="closeEditModal" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            </div>
            <form @submit.prevent="updateInvitation">
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                      Project Name
                    </label>
                    <input v-model="editInvitationData.projectName" type="text" class="input-field" placeholder="Enter project name" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      Deadline
                    </label>
                    <input v-model="editInvitationData.deadline" type="date" class="input-field" required />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                    Description
                  </label>
                  <textarea v-model="editInvitationData.description" class="input-field textarea" placeholder="Enter description" required></textarea>
                </div>
              </div>
              <div class="modal-actions">
                <button type="button" @click="closeEditModal" class="btn-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  Cancel
                </button>
                <button type="submit" class="btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- View Invitation Modal -->
        <div v-if="isViewing" class="modal-overlay" @click.self="closeViewModal">
          <div class="modal">
            <div class="modal-header">
              <h3 class="modal-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Invitation Details
              </h3>
              <button @click="closeViewModal" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            </div>
            <div class="modal-body">
              <!-- Grouped Details Layout -->
              <div class="detail-group">
                <h3 class="detail-title">Project Information</h3>
                <div class="detail-row">
                  <span class="detail-label">Project Name:</span>
                  <span class="detail-value">{{ viewInvitationData.projectName }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Deadline:</span>
                  <span class="detail-value">
                    <span :class="isDeadlineSoon(viewInvitationData.deadline) ? 'deadline-soon' : ''">
                      {{ formatDate(viewInvitationData.deadline) }}
                    </span>
                  </span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Days Remaining:</span>
                  <span class="detail-value">
                    <span :class="getDaysRemaining(viewInvitationData.deadline) <= 7 ? 'deadline-soon' : ''">
                      {{ getDaysRemaining(viewInvitationData.deadline) }} days
                    </span>
                  </span>
                </div>
              </div>
              <div class="detail-group">
                <h3 class="detail-title">Description</h3>
                <div class="detail-row">
                  <span class="detail-label">Details:</span>
                  <span class="detail-value description">{{ viewInvitationData.description }}</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="handleEditFromView" class="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit
              </button>
              <button type="button" @click="handleDeleteFromView" class="btn-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Delete
              </button>
              <button type="button" @click="closeViewModal" class="btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                Close
              </button>
            </div>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="isDeleting" class="modal-overlay" @click.self="closeDeleteModal">
          <div class="modal delete-modal">
            <div class="modal-header">
              <h3 class="modal-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Confirm Deletion
              </h3>
            </div>
            <div class="modal-body">
              <p class="delete-message">Are you sure you want to delete this invitation? This action cannot be undone.</p>
            </div>
            <div class="modal-actions">
              <button type="button" @click="closeDeleteModal" class="btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                Cancel
              </button>
              <button type="button" @click="confirmDeleteInvitation" class="btn-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { db } from "@/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default {
  setup() {
    const invitations = ref([]);
    const newInvitation = ref({ projectName: "", deadline: "", description: "" });
    const isEditing = ref(false);
    const isViewing = ref(false);
    const isDeleting = ref(false);
    const editInvitationData = ref({});
    const viewInvitationData = ref({});
    const deleteId = ref(null);
    const searchQuery = ref("");
    const showCreateForm = ref(false);

    const fetchInvitations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "invitations"));
        invitations.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching invitations:", error);
        showNotification("Failed to fetch invitations. Please try again.", "error");
      }
    };

    const filteredInvitations = computed(() => {
      if (!searchQuery.value) return invitations.value;
      
      const query = searchQuery.value.toLowerCase();
      return invitations.value.filter(invitation => 
        invitation.projectName.toLowerCase().includes(query) ||
        invitation.description.toLowerCase().includes(query)
      );
    });

    const createInvitation = async () => {
      try {
        await addDoc(collection(db, "invitations"), newInvitation.value);
        showNotification("Invitation created successfully!");
        resetForm();
        showCreateForm.value = false;
        fetchInvitations();
      } catch (error) {
        console.error("Error creating invitation:", error);
        showNotification("Failed to create invitation. Please try again.", "error");
      }
    };

    const resetForm = () => {
      newInvitation.value = { projectName: "", deadline: "", description: "" };
    };

    const getInvitationIndex = (id) => {
      return invitations.value.findIndex(inv => inv.id === id);
    };

    // Enhanced action handlers for the new UI
    const handleEdit = (invitation) => {
      editInvitationData.value = { ...invitation };
      isEditing.value = true;
      isViewing.value = false;
    };

    const handleDelete = (id) => {
      deleteId.value = id;
      isDeleting.value = true;
      
      // Close other modals
      isViewing.value = false;
      isEditing.value = false;
    };

    const handleView = (invitation) => {
      viewInvitationData.value = { ...invitation };
      isViewing.value = true;
    };

    const handleEditFromView = () => {
      editInvitationData.value = { ...viewInvitationData.value };
      isEditing.value = true;
      isViewing.value = false;
    };

    const handleDeleteFromView = () => {
      deleteId.value = viewInvitationData.value.id;
      isDeleting.value = true;
      isViewing.value = false;
    };

    const closeEditModal = () => {
      isEditing.value = false;
    };

    const closeViewModal = () => {
      isViewing.value = false;
    };

    const closeDeleteModal = () => {
      isDeleting.value = false;
      deleteId.value = null;
    };

    const updateInvitation = async () => {
      try {
        const invitationRef = doc(db, "invitations", editInvitationData.value.id);
        await updateDoc(invitationRef, {
          projectName: editInvitationData.value.projectName,
          deadline: editInvitationData.value.deadline,
          description: editInvitationData.value.description,
        });
        showNotification("Invitation updated successfully!");
        isEditing.value = false;
        
        // Update view modal if it's the same invitation
        if (isViewing.value && viewInvitationData.value.id === editInvitationData.value.id) {
          viewInvitationData.value = { ...editInvitationData.value };
        }
        
        fetchInvitations();
      } catch (error) {
        console.error("Error updating invitation:", error);
        showNotification("Failed to update invitation. Please try again.", "error");
      }
    };

    const confirmDeleteInvitation = async () => {
      if (!deleteId.value) return;
      
      try {
        await deleteDoc(doc(db, "invitations", deleteId.value));
        showNotification("Invitation deleted successfully!");
        isDeleting.value = false;
        deleteId.value = null;
        
        // Close view modal if it's the same invitation
        if (isViewing.value && viewInvitationData.value.id === deleteId.value) {
          isViewing.value = false;
        }
        
        fetchInvitations();
      } catch (error) {
        console.error("Error deleting invitation:", error);
        showNotification("Failed to delete invitation. Please try again.", "error");
      }
    };

    const formatDate = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const isDeadlineSoon = (dateStr) => {
      if (!dateStr) return false;
      const deadline = new Date(dateStr);
      const today = new Date();
      const diffTime = deadline - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    };

    const getDaysRemaining = (dateStr) => {
      if (!dateStr) return 0;
      const deadline = new Date(dateStr);
      const today = new Date();
      const diffTime = deadline - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const showNotification = (message, type = "success") => {
      // Simple notification implementation
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add("show");
      }, 10);
      
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    };

    onMounted(fetchInvitations);

    return {
      invitations,
      filteredInvitations,
      newInvitation,
      isEditing,
      isViewing,
      isDeleting,
      editInvitationData,
      viewInvitationData,
      deleteId,
      searchQuery,
      showCreateForm,
      createInvitation,
      handleEdit,
      handleDelete,
      handleView,
      handleEditFromView,
      handleDeleteFromView,
      updateInvitation,
      confirmDeleteInvitation,
      closeEditModal,
      closeViewModal,
      closeDeleteModal,
      resetForm,
      formatDate,
      isDeadlineSoon,
      getDaysRemaining,
      getInvitationIndex
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

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 10px 15px 10px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 30px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f2942;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-count {
  font-size: 14px;
  color: #64748b;
}

/* Form Container */
.form-container {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #e2e8f0;
  animation: fadeIn 0.3s ease-out;
}

/* Form Styling */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 250px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-field {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  background-color: white;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

/* Table Design */
.table-container {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.invitations-table {
  width: 100%;
  border-collapse: collapse;
}

.invitations-table th,
.invitations-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.invitations-table th {
  background-color: #0f2942;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.actions-header {
  text-align: center;
  width: 150px;
}

.invitations-table td {
  color: #2d3748;
  font-size: 14px;
}

.table-row {
  transition: background-color 0.2s;
}

.table-row:hover td {
  background-color: #f8fafc;
}

.description-cell {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Actions Container */
.actions-container {
  display: flex;
  justify-content: center;
}

.action-buttons {
  display: flex;
  gap: 8px;
  background-color: #0f2942;
  border-radius: 8px;
  padding: 4px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.action-btn.edit {
  color: #60a5fa;
}

.action-btn.delete {
  color: #f87171;
}

.action-btn.view {
  color: #a5b4fc;
}

/* Deadline Badge */
.deadline-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f1f5f9;
  color: #475569;
}

.deadline-soon {
  color: #ef4444;
  font-weight: 600;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  color: #94a3b8;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.empty-subtext {
  font-size: 14px;
  color: #64748b;
}

/* Button Styles */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
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
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

.modal {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

.delete-modal {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  color: #0f2942;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.close-button {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.modal-body {
  padding: 20px;
}

.detail-row {
  display: flex;
  margin-bottom: 16px;
}

.detail-label {
  width: 140px;
  font-weight: 600;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-value {
  flex: 1;
  color: #1e293b;
}

.detail-value.description {
  white-space: pre-wrap;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.delete-message {
  color: #1e293b;
  font-size: 16px;
  text-align: center;
  margin: 10px 0;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Notification */
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0f2942;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
}

.notification.show {
  transform: translateY(0);
  opacity: 1;
}

.notification.error {
  background-color: #ef4444;
}

.notification.success {
  background-color: #10b981;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
  }
  
  .search-container {
    width: 100%;
  }
  
  .detail-row {
    flex-direction: column;
  }
  
  .detail-label {
    margin-bottom: 4px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal-actions button {
    width: 100%;
  }
}

.detail-group {
  margin-bottom: 24px;
}
.detail-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #edf2f7;
}
.detail-row {
  display: flex;
  margin-bottom: 8px;
}
.detail-label {
  width: 140px;
  font-weight: 500;
  color: #4a5568;
  flex-shrink: 0;
}
.detail-value {
  color: #2d3748;
  flex: 1;
}
.detail-value.description {
  white-space: pre-wrap;
}
.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>