// ViewWorks.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewWorks.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewWorks = () => {
  const [works, setWorks] = useState([]);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    chief_engineer_zone: "",
    circle: "",
    division_name: "",
    name_of_agency: "",
    place_of_work: "",
    item_of_work: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/works")
      .then((response) => {
        setWorks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the works!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredWorks = works.filter((work) => {
    const workDate = work.date ? new Date(work.date) : null;
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;

    // Normalize the time part of dates to midnight for comparison
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
    }
    if (endDate) {
      endDate.setHours(23, 59, 59, 999);
    }
    if (workDate) {
      workDate.setHours(0, 0, 0, 0);
    }

    return (
      (!startDate || !workDate || workDate >= startDate) &&
      (!endDate || !workDate || workDate <= endDate) &&
      (work.chief_engineer_zone?.toLowerCase() || "").includes(
        filter.chief_engineer_zone.toLowerCase()
      ) &&
      (work.circle?.toLowerCase() || "").includes(
        filter.circle.toLowerCase()
      ) &&
      (work.division_name?.toLowerCase() || "").includes(
        filter.division_name.toLowerCase()
      ) &&
      (work.name_of_agency?.toLowerCase() || "").includes(
        filter.name_of_agency.toLowerCase()
      ) &&
      (work.place_of_work?.toLowerCase() || "").includes(
        filter.place_of_work.toLowerCase()
      ) &&
      (work.item_of_work?.toLowerCase() || "").includes(
        filter.item_of_work.toLowerCase()
      )
    );
  });

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredWorks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Works");
    XLSX.writeFile(wb, "works.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Project Status Report", 14, 15);

    doc.setFontSize(14);
    doc.text("Project Information", 14, 30);
    doc.setFontSize(11);
    doc.text(`Project Name: Project Exclusive`, 14, 38);
    doc.text(`Project Manager: Mr. Marcus Frost`, 14, 46);
    doc.text(
      `Reporting Period From: ${filter.startDate || "N/A"} To: ${
        filter.endDate || "N/A"
      }`,
      14,
      54
    );

    doc.setFontSize(14);
    doc.text("Project Status Summary", 14, 70);
    doc.setFontSize(11);
    doc.text("Completed Work", 14, 78);
    doc.text(
      "1) Literature review and defining questions\n2) Setting a hypothesis and research design\n3) Data collection and preparation\n4) Production of basic summary reports",
      14,
      84
    );

    doc.setFontSize(11);
    doc.text("Planned Work", 14, 110);

    const tableColumn = ["Action Items", "Status", "Due"];
    const tableRows = filteredWorks.map((work) => [
      work.item_of_work || "",
      "Status", // Replace with actual status if available
      formatDisplayDate(work.date),
    ]);

    doc.autoTable({
      startY: 120,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
    });

    doc.save("works.pdf");
  };

  return (
    <div className="view-works-container">
      <h2 className="view-works-title">View Works</h2>
      <div className="filters">
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={filter.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={filter.endDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="chief_engineer_zone"
          placeholder="Filter by Chief Engineer Zone"
          value={filter.chief_engineer_zone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="circle"
          placeholder="Filter by Circle"
          value={filter.circle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="division_name"
          placeholder="Filter by Division Name"
          value={filter.division_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name_of_agency"
          placeholder="Filter by Name of Agency"
          value={filter.name_of_agency}
          onChange={handleChange}
        />
        <input
          type="text"
          name="place_of_work"
          placeholder="Filter by Place of Work"
          value={filter.place_of_work}
          onChange={handleChange}
        />
        <input
          type="text"
          name="item_of_work"
          placeholder="Filter by Item of Work"
          value={filter.item_of_work}
          onChange={handleChange}
        />
      </div>
      <div className="download-buttons">
        <button onClick={downloadExcel}>Download Excel</button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
      <div className="table-container">
        <table className="works-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Chief Engineer Zone</th>
              <th>Circle</th>
              <th>Division Name</th>
              <th>Name of Agency</th>
              <th>Place of Work</th>
              <th>Item of Work</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorks.map((work) => (
              <tr key={work.id}>
                <td>{work.date ? formatDisplayDate(work.date) : ""}</td>
                <td>{work.chief_engineer_zone || ""}</td>
                <td>{work.circle || ""}</td>
                <td>{work.division_name || ""}</td>
                <td>{work.name_of_agency || ""}</td>
                <td>{work.place_of_work || ""}</td>
                <td>{work.item_of_work || ""}</td>
                <td>{work.quantity || ""}</td>
                <td>{work.unit || ""}</td>
                <td>{work.rate || ""}</td>
                <td>{work.amount || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatDisplayDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default ViewWorks;
