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
        <h1 class="title">Approved Purchases</h1>
        <p class="subtitle">View and manage approved purchase requests</p>
      </div>

      <div class="card-content">
        <!-- Search and Filter Controls -->
        <div class="controls-container">
          <div class="search-container">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by item name or ID..." 
              class="search-input"
              aria-label="Search purchases"
            />
            <button class="search-button" @click="handleSearch" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
          
          <div class="filter-container">
            <div class="filter-group">
              <label for="dateFilter" class="filter-label">Date Range:</label>
              <select id="dateFilter" v-model="dateFilter" class="filter-select">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="sortBy" class="filter-label">Sort By:</label>
              <select id="sortBy" v-model="sortBy" class="filter-select">
                <option value="dateDesc">Date (Newest First)</option>
                <option value="dateAsc">Date (Oldest First)</option>
                <option value="nameAsc">Item Name (A-Z)</option>
                <option value="nameDesc">Item Name (Z-A)</option>
                <option value="quantityDesc">Quantity (High-Low)</option>
                <option value="quantityAsc">Quantity (Low-High)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading approved purchases...</p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="error-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <p>{{ error }}</p>
          <button @click="fetchApprovedPurchases" class="retry-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path></svg>
            Retry
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="filteredPurchases.length === 0" class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <p v-if="searchQuery">No approved purchases match your search criteria.</p>
          <p v-else>No approved purchases available.</p>
          <button @click="resetFilters" class="reset-button">Reset Filters</button>
        </div>

        <!-- Approved Purchases Table -->
        <div v-else class="table-container">
          <table class="purchases-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Approved By</th>
                <th>Date Approved</th>
                <th>Bid Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="purchase in paginatedPurchases" :key="purchase.id">
                <td class="id-cell">
                  <span class="id-badge">{{ purchase.requestId || purchase.id.substring(0, 8) }}</span>
                </td>
                <td>{{ purchase.itemName }}</td>
                <td>{{ purchase.category || 'N/A' }}</td>
                <td>{{ purchase.quantity }}</td>
                <td>{{ purchase.approvedBy || 'System' }}</td>
                <td>{{ formatDate(purchase.dateApproved || purchase.updatedAt) }}</td>
                <td>
                  <span :class="['bid-status', getBidStatusClass(purchase)]">
                    {{ getBidStatusText(purchase) }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button 
                      @click="viewPurchaseDetails(purchase)" 
                      class="action-button view"
                      aria-label="View details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                    <button 
                      @click="navigateToSubmitBid(purchase)" 
                      class="action-button bid"
                      aria-label="Submit bid"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </button>
                    <button 
                      @click="downloadPDF(purchase)" 
                      class="action-button download"
                      aria-label="Download PDF"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Pagination -->
          <div class="pagination">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1" 
              class="pagination-button"
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages" 
              class="pagination-button"
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Purchase Details Modal -->
    <div v-if="selectedPurchase" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Purchase Details</h2>
          <button @click="closeModal" class="close-button" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="detail-group">
            <h3 class="detail-title">Request Information</h3>
            <div class="detail-row">
              <span class="detail-label">Request ID:</span>
              <span class="detail-value">{{ selectedPurchase.requestId || selectedPurchase.id.substring(0, 8) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value status-badge approved">Approved</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date Submitted:</span>
              <span class="detail-value">{{ formatDate(selectedPurchase.createdAt) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date Approved:</span>
              <span class="detail-value">{{ formatDate(selectedPurchase.dateApproved || selectedPurchase.updatedAt) }}</span>
            </div>
          </div>
          
          <div class="detail-group">
            <h3 class="detail-title">Item Details</h3>
            <div class="detail-row">
              <span class="detail-label">Item Name:</span>
              <span class="detail-value">{{ selectedPurchase.itemName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Category:</span>
              <span class="detail-value">{{ selectedPurchase.category || 'N/A' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Quantity:</span>
              <span class="detail-value">{{ selectedPurchase.quantity }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Description:</span>
              <span class="detail-value">{{ selectedPurchase.description || 'No description provided' }}</span>
            </div>
            <div class="detail-row" v-if="selectedPurchase.estimatedCost">
              <span class="detail-label">Estimated Cost:</span>
              <span class="detail-value">₱{{ selectedPurchase.estimatedCost.toLocaleString() }}</span>
            </div>
          </div>
          
          <div class="detail-group">
            <h3 class="detail-title">Approval Information</h3>
            <div class="detail-row">
              <span class="detail-label">Approved By:</span>
              <span class="detail-value">{{ selectedPurchase.approvedBy || 'System' }}</span>
            </div>
            <div class="detail-row" v-if="selectedPurchase.approvalNotes">
              <span class="detail-label">Approval Notes:</span>
              <span class="detail-value">{{ selectedPurchase.approvalNotes }}</span>
            </div>
          </div>

          <!-- Bid Attachments Section -->
          <div class="detail-group">
            <h3 class="detail-title">Bid Attachments</h3>
            <div v-if="selectedPurchase.bidAttachments && selectedPurchase.bidAttachments.length > 0">
              <div v-for="(attachment, index) in selectedPurchase.bidAttachments" :key="index" class="attachment-item">
                <div class="attachment-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="attachment-icon"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  <div>
                    <div class="attachment-name">{{ attachment.fileName }}</div>
                    <div class="attachment-meta">
                      <span>{{ formatFileSize(attachment.fileSize) }}</span>
                      <span>•</span>
                      <span>{{ formatDate(attachment.uploadedAt) }}</span>
                    </div>
                  </div>
                </div>
                <button @click="downloadAttachment(attachment)" class="attachment-download">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
              </div>
            </div>
            <div v-else class="no-attachments">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              <p>No bid attachments yet</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="navigateToSubmitBid(selectedPurchase)" class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Submit Bid
          </button>
          <button @click="downloadPDF(selectedPurchase)" class="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download PDF
          </button>
          <button @click="closeModal" class="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { db } from "@/firebase";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  Timestamp 
} from "firebase/firestore";
import { useRouter } from 'vue-router';

export default {
  name: "ApprovedPurchases",
  
  setup() {
    const router = useRouter();
    
    // State variables
    const approvedPurchases = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const searchQuery = ref("");
    const dateFilter = ref("all");
    const sortBy = ref("dateDesc");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const selectedPurchase = ref(null);
    
    // Updated fetch function with debug logging
    const fetchApprovedPurchases = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        console.log("Fetching approved purchases...");
        
        // Query with capital "A" in "Approved"
        const q = query(
          collection(db, "purchaseRequests"),
          where("status", "==", "Approved")
        );
        
        console.log("Query created, executing...");
        const querySnapshot = await getDocs(q);
        console.log(`Query returned ${querySnapshot.size} documents`);
        
        if (querySnapshot.empty) {
          console.log("No approved purchases found");
          approvedPurchases.value = [];
        } else {
          approvedPurchases.value = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Document data:", data);
            
            // Generate a request ID if not present
            if (!data.requestId) {
              data.requestId = `PR-${doc.id.substring(0, 6).toUpperCase()}`;
            }
            
            // Handle Timestamp objects properly
            const createdAt = data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate() 
              : (data.createdAt ? new Date(data.createdAt) : new Date());
              
            const updatedAt = data.updatedAt instanceof Timestamp 
              ? data.updatedAt.toDate() 
              : (data.updatedAt ? new Date(data.updatedAt) : new Date());
              
            const approvalDate = data.approvalDate instanceof Timestamp 
              ? data.approvalDate.toDate() 
              : (data.approvalDate ? new Date(data.approvalDate) : updatedAt);
            
            return { 
              id: doc.id, 
              ...data,
              itemName: data.itemName || "Unnamed Item",
              category: data.category || "Uncategorized",
              quantity: data.quantity || 0,
              approvedBy: data.approvedBy || "System",
              createdAt: createdAt,
              updatedAt: updatedAt,
              dateApproved: approvalDate,
              bidAttachments: data.bidAttachments || []
            };
          });
          
          console.log(`Processed ${approvedPurchases.value.length} approved purchases`);
        }
      } catch (err) {
        console.error("Error fetching approved purchases:", err);
        error.value = "Failed to load approved purchases. Please try again.";
      } finally {
        loading.value = false;
      }
    };
    
    // Format date
    const formatDate = (date) => {
      if (!date) return "N/A";
      
      const dateObj = date instanceof Date ? date : new Date(date);
      
      if (isNaN(dateObj.getTime())) return "Invalid Date";
      
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
    
    // Format file size
    const formatFileSize = (bytes) => {
      if (!bytes) return "0 Bytes";
      
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    
    // Get bid status text
    const getBidStatusText = (purchase) => {
      if (!purchase.bidAttachments || purchase.bidAttachments.length === 0) {
        return "No Bids";
      } else if (purchase.bidStatus === "approved") {
        return "Bid Approved";
      } else if (purchase.bidStatus === "rejected") {
        return "Bid Rejected";
      } else {
        return `${purchase.bidAttachments.length} Bid(s)`;
      }
    };
    
    // Get bid status class
    const getBidStatusClass = (purchase) => {
      if (!purchase.bidAttachments || purchase.bidAttachments.length === 0) {
        return "no-bids";
      } else if (purchase.bidStatus === "approved") {
        return "bid-approved";
      } else if (purchase.bidStatus === "rejected") {
        return "bid-rejected";
      } else {
        return "bid-pending";
      }
    };
    
    // Filter purchases based on search query and date filter
    const filteredPurchases = computed(() => {
      let filtered = [...approvedPurchases.value];
      
      // Apply search filter
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim();
        filtered = filtered.filter(purchase => 
          purchase.itemName?.toLowerCase().includes(query) || 
          purchase.requestId?.toLowerCase().includes(query) ||
          purchase.id.toLowerCase().includes(query)
        );
      }
      
      // Apply date filter
      if (dateFilter.value !== "all") {
        const now = new Date();
        let startDate;
        
        switch (dateFilter.value) {
          case "today": {
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          }
          case "week": {
            startDate = new Date(now.setDate(now.getDate() - now.getDay()));
            break;
          }
          case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          }
          case "quarter": {
            const quarter = Math.floor(now.getMonth() / 3);
            startDate = new Date(now.getFullYear(), quarter * 3, 1);
            break;
          }
          case "year": {
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
          }
          default: {
            startDate = new Date(0); // Default to epoch start
          }
        }
        
        filtered = filtered.filter(purchase => {
          const purchaseDate = purchase.dateApproved instanceof Date 
            ? purchase.dateApproved 
            : new Date(purchase.dateApproved || purchase.updatedAt || Date.now());
          return purchaseDate >= startDate;
        });
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy.value) {
          case "dateAsc": {
            return new Date(a.dateApproved || a.updatedAt || 0) - new Date(b.dateApproved || b.updatedAt || 0);
          }
          case "dateDesc": {
            return new Date(b.dateApproved || b.updatedAt || 0) - new Date(a.dateApproved || a.updatedAt || 0);
          }
          case "nameAsc": {
            return (a.itemName || "").localeCompare(b.itemName || "");
          }
          case "nameDesc": {
            return (b.itemName || "").localeCompare(a.itemName || "");
          }
          case "quantityAsc": {
            return (a.quantity || 0) - (b.quantity || 0);
          }
          case "quantityDesc": {
            return (b.quantity || 0) - (a.quantity || 0);
          }
          default: {
            return 0;
          }
        }
      });
      
      return filtered;
    });
    
    const totalPages = computed(() => {
      return Math.max(1, Math.ceil(filteredPurchases.value.length / itemsPerPage.value));
    });
    
    const paginatedPurchases = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return filteredPurchases.value.slice(startIndex, endIndex);
    });
    
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    
    // Reset to first page when filters change
    watch([searchQuery, dateFilter, sortBy], () => {
      currentPage.value = 1;
    });
    
    // Handle search
    const handleSearch = () => {
      currentPage.value = 1;
    };
    
    // Reset filters
    const resetFilters = () => {
      searchQuery.value = "";
      dateFilter.value = "all";
      sortBy.value = "dateDesc";
      currentPage.value = 1;
    };
    
    // View purchase details
    const viewPurchaseDetails = (purchase) => {
      selectedPurchase.value = purchase;
    };
    
    // Close modal
    const closeModal = () => {
      selectedPurchase.value = null;
    };
    
    // Download PDF
    const downloadPDF = (purchase) => {
      console.log("Downloading PDF for purchase:", purchase.id);
      alert(`PDF download for ${purchase.itemName} would start here.`);
    };
    
    // Navigate to Submit Bid page
    const navigateToSubmitBid = (purchase) => {
      // Store the purchase ID in localStorage or pass it as a route parameter
      localStorage.setItem('selectedPurchaseId', purchase.id);
      
      // Navigate to the SubmitBid page
      router.push({
        name: 'SubmitBid',
        params: { purchaseId: purchase.id }
      });
    };
    
    // Download attachment
    const downloadAttachment = (attachment) => {
      if (attachment.fileUrl) {
        window.open(attachment.fileUrl, '_blank');
      } else {
        alert("File URL not available");
      }
    };
    
    // Fetch data on component mount
    onMounted(fetchApprovedPurchases);
    
    return {
      approvedPurchases,
      loading,
      error,
      searchQuery,
      dateFilter,
      sortBy,
      currentPage,
      filteredPurchases,
      paginatedPurchases,
      totalPages,
      selectedPurchase,
      formatDate,
      formatFileSize,
      getBidStatusText,
      getBidStatusClass,
      fetchApprovedPurchases,
      handleSearch,
      resetFilters,
      nextPage,
      prevPage,
      viewPurchaseDetails,
      closeModal,
      downloadPDF,
      navigateToSubmitBid,
      downloadAttachment
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

/* Controls Container */
.controls-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
}

.search-container {
  display: flex;
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  background-color: #fff;
}

.search-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
}

.search-button:hover {
  color: #2d3748;
  background-color: #edf2f7;
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  white-space: nowrap;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f8fafc;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  background-color: #fff;
}

/* Table Design */
.table-container {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 16px;
}

.purchases-table {
  width: 100%;
  border-collapse: collapse;
}

.purchases-table th,
.purchases-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.purchases-table th {
  background-color: #0f2942;
  color: white;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}

.purchases-table td {
  color: #2d3748;
  font-size: 14px;
  vertical-align: middle;
}

.purchases-table tr:hover td {
  background-color: #f7fafc;
}

.purchases-table tr:last-child td {
  border-bottom: none;
}

.id-cell {
  white-space: nowrap;
}

.id-badge {
  display: inline-block;
  padding: 4px 8px;
  background-color: #ebf8ff;
  color: #2b6cb0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  font-family: monospace;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button.view {
  background-color: #ebf8ff;
  color: #2b6cb0;
}

.action-button.view:hover {
  background-color: #bee3f8;
}

.action-button.bid {
  background-color: #faf5ff;
  color: #805ad5;
}

.action-button.bid:hover {
  background-color: #e9d8fd;
}

.action-button.download {
  background-color: #e6fffa;
  color: #319795;
}

.action-button.download:hover {
  background-color: #b2f5ea;
}

/* Bid Status */
.bid-status {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.bid-status.no-bids {
  background-color: #edf2f7;
  color: #718096;
}

.bid-status.bid-pending {
  background-color: #faf5ff;
  color: #805ad5;
}

.bid-status.bid-approved {
  background-color: #c6f6d5;
  color: #2f855a;
}

.bid-status.bid-rejected {
  background-color: #fed7d7;
  color: #c53030;
}

/* Loading, Error, and Empty States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: #4a5568;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(49, 130, 206, 0.2);
  border-radius: 50%;
  border-top-color: #3182ce;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  color: #a0aec0;
  margin-bottom: 16px;
}

.error-state {
  color: #c53030;
}

.retry-button,
.reset-button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover,
.reset-button:hover {
  background-color: #edf2f7;
  color: #2d3748;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover:not(:disabled) {
  background-color: #edf2f7;
  color: #2d3748;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 14px;
  color: #4a5568;
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
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
}

.modal {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #718096;
  background-color: #f7fafc;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.approved {
  background-color: #c6f6d5;
  color: #2f855a;
}

/* Attachment Items */
.attachment-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: #f8fafc;
}

.attachment-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.attachment-icon {
  color: #4a5568;
}

.attachment-name {
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 4px;
}

.attachment-meta {
  font-size: 12px;
  color: #718096;
  display: flex;
  gap: 6px;
}

.attachment-download {
  background: none;
  border: none;
  color: #3182ce;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.attachment-download:hover {
  background-color: #ebf8ff;
}

.no-attachments {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #718096;
  background-color: #f8fafc;
  border-radius: 6px;
  border: 1px dashed #e2e8f0;
}

.no-attachments svg {
  margin-bottom: 12px;
  color: #a0aec0;
}

/* Buttons */
.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #0f2942;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #1a4971;
}

.btn-secondary {
  background-color: #edf2f7;
  color: #4a5568;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
  color: #2d3748;
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

/* Responsive Adjustments */
@media (max-width: 768px) {
  .controls-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .modal {
    width: 95%;
  }
  
  .detail-row {
    flex-direction: column;
  }
  
  .detail-label {
    margin-bottom: 4px;
  }
  
  .attachment-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .attachment-download {
    align-self: flex-end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-spinner,
  .modal,
  .modal-overlay {
    animation: none;
  }
}
</style>