import React, { useState } from 'react';
import axios from 'axios';
import './Homepage.css';
import { v4 as uuidv4 } from 'uuid';


const Homepage = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    building: '',
    roomNumber: '',
    category: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const isEmpty = Object.values(formData).some((val) => val === '');
    if (isEmpty) {
      alert('Please fill in all fields');
    } else {
      // Capture the current date and time
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
  
      // Add a leading zero to the day if it's between 1 and 9
      const formattedDay = day <= 9 ? `0${day}` : day;
  
      // Construct the date string in YYYY-MM-DD format
      formData.date = `${year}-${month}-${formattedDay}`;
  
      // Generate a unique ID for the complaint
      formData.id = uuidv4();
  
      const jsonData = JSON.stringify(formData);
  
      // Log the JSON data to the console
      console.log('JSON Data:', jsonData);
  
      axios.post('http://localhost:5000/api/save-data', { data: jsonData })
        .then((response) => {
          alert('Congrats! The complaint is filed, and will be resolved soon!!');
          // Reset the form fields
          setFormData({
            name: '',
            role: '',
            building: '',
            roomNumber: '',
            category: '',
            description: '',
          });
        })
        .catch((error) => {
          alert('Error submitting the form. Please try again later.');
        });
    }
  };
  
  
  


  return (
    <div className="homepage">
      <a href="/admin" className="admin-link">
        Admin
      </a>
      <div className="background-image">
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="faculty">Faculty</option>
              <option value="non-faculty">Non Faculty</option>
              <option value="student">Student</option>
            </select>
          </label>
          <label>
            Building:
            <select
              name="building"
              value={formData.building}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Building</option>
              <option value="VKJ">VKJ</option>
              <option value="ASK I">ASK I</option>
              <option value="ASK II">ASK II</option>
              <option value="LTC">LTC</option>
              <option value="SOC">SOC</option>
              <option value="Tifac">Tifac</option>
              <option value="CTV">CTV</option>
              <option value="VV">VV</option>
              <option value="VDV">VDV</option>
              <option value="SCBT">SCBT</option>
              <option value="NMV">NMV</option>
              <option value="Ananda Vihar">Ananda Vihar</option>
              <option value="Kamadhenu">Kamadhenu</option>
              <option value="Vasishta">Vasishta</option>
              <option value="Vinaya Block 1">Vinaya Block 1</option>
              <option value="Vinaya Block 2">Vinaya Block 2</option>
              <option value="Vinaya Block 3">Vinaya Block 3</option>
              <option value="Arunthati">Arunthati</option>
              <option value="Ahalya">Ahalya</option>
              <option value="SN OLD">SN OLD</option>
              <option value="SN NEW">SN NEW</option>
              <option value="Anasuya">Anasuya</option>
              <option value="VC Office">VC Office</option>
              <option value="Registrar Office">Registrar Office</option>
              <option value="GNV">GNV</option>
            </select>
          </label>
          <label>
            Room Number:
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="carpentry">Carpentry</option>
              <option value="it-services">IT Services</option>
              <option value="civil-services">Civil Services</option>
            </select>
          </label>
          <label>
            Brief Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <label className="room-number-note">
          * Enter NA if room number is unavailable
        </label>
      </div>
    </div>
  );
};

export default Homepage;
