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
        <h1 class="title">Post Qualification</h1>
        <p class="subtitle">Evaluate and manage post-qualification processes.</p>
      </div>

      <div class="card-content">
        <!-- Post Qualification Form -->
        <form @submit.prevent="submitPostQualification" class="form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Supplier Name</label>
              <input v-model="postQualification.supplierName" type="text" class="input-field" placeholder="Enter supplier name" required />
            </div>
            <div class="form-group">
              <label class="form-label">Evaluation Score</label>
              <input v-model="postQualification.evaluationScore" type="number" class="input-field" placeholder="Enter evaluation score" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Remarks</label>
            <textarea v-model="postQualification.remarks" class="input-field" placeholder="Enter remarks" required></textarea>
          </div>
          <button type="submit" class="btn-primary">Submit</button>
        </form>

        <!-- Post Qualification List -->
        <div v-if="postQualifications.length" class="table-container">
          <table class="post-qualification-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Evaluation Score</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="qualification in postQualifications" :key="qualification.id">
                <td>{{ qualification.supplierName }}</td>
                <td>{{ qualification.evaluationScore }}</td>
                <td>{{ qualification.remarks }}</td>
                <td>
                  <button @click="editQualification" class="btn-link">Edit</button>
                  <button @click="deleteQualification" class="btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="loading-state">No post-qualification records available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const postQualifications = ref([]);
    const postQualification = ref({
      supplierName: "",
      evaluationScore: "",
      remarks: "",
    });

    const submitPostQualification = () => {
      // Logic to submit post-qualification data
    };

    const editQualification = () => {
      // Logic to edit post-qualification data
    };

    const deleteQualification = () => {
      // Logic to delete post-qualification data
    };

    return {
      postQualifications,
      postQualification,
      submitPostQualification,
      editQualification,
      deleteQualification,
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

/* Form Styling */
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
}

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

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 5px;
  display: block;
}

.input-field::placeholder {
  color: #a0aec0;
  font-size: 14px;
}

/* Table Styling */
.table-container {
  overflow-x: auto;
}

.post-qualification-table {
  width: 100%;
  border-collapse: collapse;
}

.post-qualification-table th,
.post-qualification-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.post-qualification-table th {
  background-color: #2c5282;
  color: white;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
}

.post-qualification-table td {
  color: #4a5568;
  font-size: 14px;
}

.post-qualification-table tr:hover td {
  background-color: #ebf8ff;
}

/* Buttons */
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

/* Loading State */
.loading-state {
  text-align: center;
  color: #1a202c;
  font-size: 16px;
  font-weight: bold;
}
</style>
