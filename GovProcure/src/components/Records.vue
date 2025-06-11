<template>
  <div class="records-container">
    <h1>Records Management</h1>
    <div class="actions">
      <label class="custom-file-upload">
        <input type="file" @change="importExcel" accept=".xlsx, .xls" />
        <span>Import Excel</span>
      </label>
      <button class="action-button export" @click="exportExcel">Export Excel</button>
      <button class="action-button add" @click="addNewRow">Add New Row</button>
      <button class="action-button save" @click="saveToFirestore">Save</button>
    </div>
    <div class="summary-bar">
      <div class="summary-item">
        <span class="summary-label">Total Records</span>
        <span class="summary-value">{{ data.length }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Delays Detected</span>
        <span class="summary-value">{{ delays.length }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Overdue Steps</span>
        <span class="summary-value">{{ overdueCount }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">On Time</span>
        <span class="summary-value">{{ onTimeCount }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Avg. Process Time</span>
        <span class="summary-value">{{ avgProcessTime }} days</span>
      </div>
    </div>
    <div class="table-responsive zoom-container" :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left', width: `${100 / zoomLevel}%` }">
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              <input v-model="data[rowIndex][cellIndex]" />
            </td>
            <td>
              <span v-if="row._overdueSteps && row._overdueSteps.length" class="overdue">
                Overdue: {{ row._overdueSteps.join('; ') }}
              </span>
              <span v-else class="on-time">On Time</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="zoom-bar">
      <label for="zoom-slider">Zoom:</label>
      <span>{{ Math.round(zoomLevel * 100) }}%</span>
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
      zoomLevel: 1,
    };
  },
  computed: {
    onTimeCount() {
      if (!this.headers.length) return 0;
      // Only count rows that do NOT have overdue steps
      return this.data.filter(row => !row._overdueSteps || row._overdueSteps.length === 0).length;
    },
    avgProcessTime() {
      if (!this.headers.length) return 0;
      const dateIndex = this.headers.findIndex(h => {
        const header = (h || '').toLowerCase();
        return header.includes('date') || header.includes('deadline') || header.includes('due');
      });
      if (dateIndex === -1 || !this.data.length) return 0;
      const today = dayjs();
      const daysArr = this.data.map(row => {
        const date = dayjs(row[dateIndex]);
        return date.isValid() ? today.diff(date, 'day') : null;
      }).filter(days => days !== null && days >= 0);
      if (!daysArr.length) return 0;
      const avg = daysArr.reduce((a, b) => a + b, 0) / daysArr.length;
      return Math.round(avg);
    },
    overdueCount() {
      return this.data.filter(row => row._overdueSteps && row._overdueSteps.length).length;
    },
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
                return dayjs("1899-12-30").add(cell, "day").format("YYYY-MM-DD");
              } else if (typeof cell === "string") {
                const parsed = dayjs(cell, ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD", "YYYY/MM/DD", "MMM-DD", "MMMM D, YYYY"], true);
                if (parsed.isValid()) {
                  return parsed.format("YYYY-MM-DD");
                }
              }
            } 
            return cell;
          });
        });
        this.ensureDataConsistency();
        this.detectDelays();
        this.detectOverdueSteps();
      };
      reader.readAsBinaryString(file);
    },
    isDateColumn(index) {
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
      const currentYear = today.year();
      const dateIndex = this.headers.findIndex(h =>
        (h || "").toLowerCase().includes("as of")
      );
      if (dateIndex === -1) {
        this.delays = [];
        return;
      }
      this.delays = this.data.filter(row => {
        let raw = (row[dateIndex] || "").toString().trim();
        if (/^[A-Za-z]{3,}[.\-\s]?\d{1,2}$/.test(raw)) {
          raw = raw.replace(/[.\-\s]+/g, " ");
          raw = `${raw}, ${currentYear}`;
        }
        let date = dayjs(raw, ["MMM D, YYYY", "MMM D YYYY", "YYYY-MM-DD"], true);
        if (!date.isValid()) {
          date = dayjs(raw);
        }
        return date.isValid() && today.diff(date, "day") > 10;
      });
      if (this.delays.length > 0) {
        alert(`⚠ ${this.delays.length} record(s) are delayed (over 10 days from 'AS OF' date).`);
      } else {
        alert("✅ No delays detected.");
      }
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
      // Add a new row as an array of empty strings, matching the headers length
      const newRow = Array(this.headers.length).fill("");
      this.data.push(newRow);
    },
    ensureDataConsistency() {
      this.data = this.data.map((row) => {
        const adjustedRow = Array(this.headers.length).fill("");
        row.forEach((cell, index) => {
          if (index < this.headers.length) {
            adjustedRow[index] = cell;
          }
        });
        return adjustedRow;
      });
      const maxRows = this.data.length;
      while (this.data.length < maxRows) {
        this.data.push(Array(this.headers.length).fill(""));
      }
    },
    detectOverdueSteps() {
      const steps = [
        "RET TO BAC",
        "FORWARDED TO END USER",
        "RET TO BAC.1",
        "FORWARDED TO END USER.1",
        "RET TO BAC.2",
        "FORWARDED TO END USER.2",
        "RET TO BAC.3",
        "FORWARDED TO END USER.3",
        "PO/CONTRACT & NTP POSTED (50K above)"
      ];
      function parseDate(val) {
        if (!val) return null;
        const d = new Date(val);
        return isNaN(d.getTime()) ? null : d;
      }
      this.data.forEach(function (record) {
        record._overdueSteps = [];
        for (let i = 0; i < steps.length - 1; i++) {
          const currDate = parseDate(record[steps[i]]);
          const nextDate = parseDate(record[steps[i + 1]]);
          if (currDate) {
            if (!nextDate) {
              record._overdueSteps.push(steps[i + 1] + " missing after " + steps[i]);
            } else {
              const diff = (nextDate - currDate) / (1000 * 60 * 60 * 24);
              if (diff > 10) {
                record._overdueSteps.push(steps[i + 1] + " late by " + Math.floor(diff - 10) + " days");
              }
            }
          }
        }
      });
    },
    handleZoomKeys(e) {
      if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2);
      } else if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.2);
      }
    },
  },
  mounted() {
    this.ensureDataConsistency();
    window.addEventListener('keydown', this.handleZoomKeys);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleZoomKeys);
  },
  watch: {
    data: {
      handler() {
        this.detectDelays();
        this.detectOverdueSteps();
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

input[type="file"] {
  display: none;
}

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

.save {
  background-color: #009688;
}

.save:hover {
  background-color: #00796b;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  color: #222;
  font-size: 14px;
  font-weight: 500;
}

th {
  background-color: #f4f4f4;
  font-weight: 700;
}

.overdue {
  color: red;
  font-weight: bold;
}
.on-time {
  color: green;
  font-weight: bold;
}

.summary-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  gap: 20px;
  flex-wrap: wrap;
}

.summary-item {
  color: #222;
  padding: 8px 18px 0 18px;
  border-radius: 4px 4px 0 0;
  min-width: 120px;
  text-align: center;
  position: relative;
  font-size: 15px;
  font-weight: 500;
}

.summary-label {
  display: block;
  font-size: 15px;
  margin-bottom: 2px;
}

.summary-value {
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: -8px;
}

.zoom-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  margin-left: 0;
  justify-content: center;
  font-size: 18px;
}

.zoom-bar label, .zoom-bar span {
  color: #222;
  font-size: 18px;
  font-weight: 600;
}

#zoom-slider {
  accent-color: #2196F3;
  width: 200px;
  height: 6px;
  margin: 0 10px;
}

.zoom-container {
  transition: transform 0.2s;
}

@media screen and (max-width: 768px) {
  .summary-bar {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
  .summary-item {
    min-width: unset;
    border-radius: 4px 4px 0 0;
  }
}

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
