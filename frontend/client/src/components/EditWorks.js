import React, { useState, useEffect } from "react";
import axios from "axios";

const EditWorks = () => {
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

  const [currentWork, setCurrentWork] = useState(null);

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

  const handleUpdate = (id, updatedWork) => {
    console.log("Updating work with ID:", id);
    console.log("Updated work data:", JSON.stringify(updatedWork, null, 2)); // Log payload

    axios
      .put(`http://localhost:3001/api/works/${id}`, updatedWork)
      .then((response) => {
        alert("Work updated successfully!");
        setWorks(works.map((work) => (work.id === id ? updatedWork : work)));
        setCurrentWork(null);
      })
      .catch((error) => {
        console.error("There was an error updating the work!", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/works/${id}`)
      .then((response) => {
        alert("Work deleted successfully!");
        setWorks(works.filter((work) => work.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the work!", error);
      });
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

  const handleEditClick = (work) => {
    setCurrentWork({
      ...work,
      date: work.date ? formatDate(work.date) : "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    const updatedWork = { ...currentWork, [name]: value };

    if (name === "quantity" || name === "rate") {
      updatedWork.amount = updatedWork.quantity * updatedWork.rate;
    }

    setCurrentWork(updatedWork);
  };

  const handleEditSubmit = () => {
    if (currentWork) {
      handleUpdate(currentWork.id, currentWork);
    }
  };

  const handleCancel = () => {
    setCurrentWork(null);
  };

  return (
    <div className="view-works-container">
      <h2 className="view-works-title">Edit Works</h2>
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
              <th>Actions</th>
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
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(work)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(work.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentWork && (
        <div className="edit-form">
          <h3>Edit Work</h3>
          <input
            type="date"
            name="date"
            value={currentWork?.date || ""}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="chief_engineer_zone"
            value={currentWork.chief_engineer_zone}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="circle"
            value={currentWork.circle}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="division_name"
            value={currentWork.division_name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="name_of_agency"
            value={currentWork.name_of_agency}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="place_of_work"
            value={currentWork.place_of_work}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="item_of_work"
            value={currentWork.item_of_work}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="quantity"
            value={currentWork.quantity}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="unit"
            value={currentWork.unit}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="rate"
            value={currentWork.rate}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="amount"
            value={currentWork.amount}
            onChange={handleEditChange}
            readOnly
          />
          <button className="save-btn" onClick={handleEditSubmit}>
            Save
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default EditWorks;
