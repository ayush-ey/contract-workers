// AddWork.js
import React, { useState } from "react";
import axios from "axios";
import "./AddWork.css"; // Import the CSS file

const AddWork = () => {
  const [formData, setFormData] = useState({
    date: "",
    chief_engineer_zone: "",
    circle: "",
    division_name: "",
    name_of_agency: "",
    place_of_work: "",
    item_of_work: "",
    quantity: "",
    unit: "",
    rate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/add", formData)
      .then((response) => {
        alert("Work added successfully!");
        setFormData({
          date: "",
          chief_engineer_zone: "",
          circle: "",
          division_name: "",
          name_of_agency: "",
          place_of_work: "",
          item_of_work: "",
          quantity: "",
          unit: "",
          rate: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the work!", error);
      });
  };

  return (
    <div className="add-work-container">
      <h2>Add New Work</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <select
          name="chief_engineer_zone"
          value={formData.chief_engineer_zone}
          onChange={handleChange}
          required
        >
          <option value="">Select Chief Engineer Zone</option>
          <option value="Zone 1">Zone 1</option>
          <option value="Zone 2">Zone 2</option>
          <option value="Zone 3">Zone 3</option>
          <option value="Zone 4">Zone 4</option>
        </select>
        <select
          name="circle"
          value={formData.circle}
          onChange={handleChange}
          required
        >
          <option value="">Select Circle</option>
          <option value="Circle 1">Circle 1</option>
          <option value="Circle 2">Circle 2</option>
          <option value="Circle 3">Circle 3</option>
          <option value="Circle 4">Circle 4</option>
        </select>
        <select
          name="division_name"
          value={formData.division_name}
          onChange={handleChange}
          required
        >
          <option value="">Select Division Name</option>
          <option value="Division 1">Division 1</option>
          <option value="Division 2">Division 2</option>
          <option value="Division 3">Division 3</option>
          <option value="Division 4">Division 4</option>
        </select>
        <select
          name="name_of_agency"
          value={formData.name_of_agency}
          onChange={handleChange}
          required
        >
          <option value="">Select Name of Agency</option>
          <option value="Agency 1">Agency 1</option>
          <option value="Agency 2">Agency 2</option>
          <option value="Agency 3">Agency 3</option>
          <option value="Agency 4">Agency 4</option>
        </select>
        <input
          type="text"
          name="place_of_work"
          placeholder="Place of Work"
          value={formData.place_of_work}
          onChange={handleChange}
          required
        />
        <textarea
          name="item_of_work"
          placeholder="Item of Work"
          value={formData.item_of_work}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rate"
          placeholder="Rate"
          value={formData.rate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Work</button>
      </form>
    </div>
  );
};

export default AddWork;
