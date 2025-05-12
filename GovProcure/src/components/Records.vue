<template>
  <div class="records-container">
    <h1>Records Management</h1>
    <div class="actions">
      <label class="custom-file-upload">
        <input type="file" @change="importExcel" accept=".xlsx, .xls" />
        <span>Import Excel</span>
      </label>
      <button class="action-button export" @click="exportExcel">Export Excel</button>
      <button class="action-button detect" @click="detectDelays">Detect Delays</button>
      <button class="action-button add" @click="addNewRow">Add New Row</button>
    </div>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              <input v-model="data[rowIndex][cellIndex]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="delays.length">Delays Detected: {{ delays.length }}</p>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import dayjs from "dayjs";

export default {
  name: "RecordsManagement",
  data() {
    return {
      headers: [],
      data: [],
      delays: [],
    };
  },
  methods: {
    importExcel(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        this.headers = jsonData[0];
        this.data = jsonData.slice(1).map((row) => {
          return row.map((cell, index) => {
            if (this.isDateColumn(index)) {
              if (typeof cell === "number") {
                // Convert Excel serial number to date
                return dayjs("1899-12-30").add(cell, "day").format("MMM-DD");
              } else if (typeof cell === "string" && dayjs(cell, ["MMM-DD", "MMMM D, YYYY"], true).isValid()) {
                // Parse date-like strings
                return dayjs(cell, ["MMM-DD", "MMMM D, YYYY"], true).format("MMM-DD");
              }
            } 
            return cell;
          });
        });
        this.ensureDataConsistency(); // Ensure data consistency after importing
      };
      reader.readAsBinaryString(file);
    },
    isDateColumn(index) {
      // Check if the header at the given index indicates a date column
      const dateKeywords = ["date", "deadline", "due"];
      return dateKeywords.some((keyword) =>
        this.headers[index]?.toLowerCase().includes(keyword)
      );
    },
    exportExcel() {
      const worksheet = XLSX.utils.aoa_to_sheet([this.headers, ...this.data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "exported_data.xlsx");
    },
    detectDelays() {
      const today = dayjs();
      this.delays = this.data.filter((row) => {
        const dateIndex = this.headers.indexOf("Date");
        if (dateIndex !== -1) {
          const date = dayjs(row[dateIndex]);
          return today.diff(date, "day") > 10;
        }
        return false;
      });
      console.log("Delays Detected:", this.delays);
    },
    async saveToFirestore() {
      const file = new Blob([JSON.stringify({ headers: this.headers, data: this.data })], {
        type: "application/json",
      });
      const storageRef = ref(storage, `excel-files/records_${Date.now()}.json`);
      try {
        await uploadBytes(storageRef, file);
        alert("File saved to Firestore successfully!");
      } catch (error) {
        console.error("Error saving file to Firestore:", error);
      }
    },
    addNewRow() {
      const newRow = Array(this.headers.length).fill(""); // Ensure the new row matches the number of headers
      this.data.push(newRow);
      this.ensureDataConsistency(); // Ensure data consistency after adding a new row
    },
    ensureDataConsistency() {
      // Ensure all rows have the same number of cells as headers
      this.data = this.data.map((row) => {
        const adjustedRow = Array(this.headers.length).fill("");
        row.forEach((cell, index) => {
          if (index < this.headers.length) {
            adjustedRow[index] = cell;
          }
        });
        return adjustedRow;
      });

      // Ensure all columns have the same number of rows
      const maxRows = this.data.length;
      while (this.data.length < maxRows) {
        this.data.push(Array(this.headers.length).fill(""));
      }
    },
  },
  mounted() {
    this.ensureDataConsistency();
  },
  watch: {
    data: {
      handler() {
        // Removed ensureDataConsistency to prevent recursive updates
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.records-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 1rem;
  text-align: center;
}

.actions {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

/* Hide the default file input */
input[type="file"] {
  display: none;
}

/* Custom file upload button */
.custom-file-upload {
  display: inline-block;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.1s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.custom-file-upload:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.custom-file-upload:active {
  transform: translateY(1px);
}

/* Action buttons */
.action-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.1s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  text-align: center;
}

.action-button:hover {
  transform: translateY(-1px);
}

.action-button:active {
  transform: translateY(1px);
}

.export {
  background-color: #2196F3;
}

.export:hover {
  background-color: #0b7dda;
}

.detect {
  background-color: #ff9800;
}

.detect:hover {
  background-color: #e68a00;
}

.add {
  background-color: #673AB7;
}

.add:hover {
  background-color: #5e35b1;
}

/* Table responsive container */
.table-responsive {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1rem;
}

/* Keep original table styling exactly as it was */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}

/* Media queries for responsive design */
@media screen and (max-width: 992px) {
  .actions {
    justify-content: center;
  }
  
  .custom-file-upload,
  .action-button {
    flex: 1 1 auto;
    min-width: 120px;
    max-width: 200px;
  }
}

@media screen and (max-width: 768px) {
  .records-container {
    padding: 15px;
  }
  
  .custom-file-upload,
  .action-button {
    flex: 1 1 40%;
  }
}

@media screen and (max-width: 480px) {
  .records-container {
    padding: 10px;
  }
  
  .custom-file-upload,
  .action-button {
    flex: 1 1 100%;
  }
}
</style>
