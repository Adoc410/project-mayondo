// Default today’s date
    document.getElementById("attendance-date").value = new Date().toISOString().split('T')[0];

    // Capture time when clicking check in/out
    document.querySelectorAll(".checkin").forEach(btn => {
      btn.addEventListener("click", function() {
        const row = this.closest("tr");
        const now = new Date().toLocaleTimeString();
        row.querySelector(".timein").innerText = now;
      });
    });

    document.querySelectorAll(".checkout").forEach(btn => {
      btn.addEventListener("click", function() {
        const row = this.closest("tr");
        const now = new Date().toLocaleTimeString();
        row.querySelector(".timeout").innerText = now;
      });
    });

    function saveAttendance() {
      const date = document.getElementById("attendance-date").value;
      const rows = document.querySelectorAll("#attendance-body tr");
      let records = [];

      rows.forEach(row => {
        const name = row.cells[1].innerText;
        const status = row.querySelector("select").value;
        const timein = row.querySelector(".timein").innerText;
        const timeout = row.querySelector(".timeout").innerText;
        records.push({ name, status, timein, timeout });
      });

      // Save to localStorage by date
      localStorage.setItem("attendance_" + date, JSON.stringify(records));

      console.log("Attendance on " + date, records);

      document.getElementById("message").innerText = "Attendance saved for " + date + " ✅";
    }

    function loadAttendance() {
      const date = document.getElementById("attendance-date").value;
      const saved = localStorage.getItem("attendance_" + date);

      if (saved) {
        const records = JSON.parse(saved);
        const rows = document.querySelectorAll("#attendance-body tr");

        rows.forEach((row, index) => {
          row.querySelector("select").value = records[index].status;
          row.querySelector(".timein").innerText = records[index].timein || "";
          row.querySelector(".timeout").innerText = records[index].timeout || "";
        });

        document.getElementById("message").innerText = "Loaded saved attendance for " + date + " 📌";
      }
    }

    // Reload attendance when date changes
    document.getElementById("attendance-date").addEventListener("change", loadAttendance);

    // Load for today's date by default
    window.onload = loadAttendance;