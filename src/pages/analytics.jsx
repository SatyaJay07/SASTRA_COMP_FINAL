import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';


const Analytics = () => {
  const [resolvedData, setResolvedData] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    building: '',
    category: '',
    date: '',
  });

  useEffect(() => {
    // Fetch resolved data from the server or load it from a local file
    axios.get('http://localhost:5000/api/resolved-data')
      .then((response) => {
        setResolvedData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching resolved data:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const formatDate = (dateStr, format = 'dd-MM-yyyy') => {
    const date = new Date(dateStr);
    if (format === 'dd-MM-yyyy') {
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    }
    // Handle other date formats here if needed
  };
  

  const filteredData = resolvedData.filter((item) => {
    const isRoleMatch = !filters.role || item.role === filters.role;
    const isBuildingMatch = !filters.building || item.building === filters.building;
    const isCategoryMatch = !filters.category || item.category === filters.category;
    const isDateMatch = !filters.date ? true : formatDate(item.date, 'dd-MM-yyyy') === formatDate(filters.date, 'dd-MM-yyyy');
  
    return isRoleMatch && isBuildingMatch && isCategoryMatch && isDateMatch;
  });
  

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Complaints');
    const excelFileName = 'resolved_complaints.xlsx';

    XLSX.writeFile(workbook, excelFileName);
  };

  return (
    <div className="analytics">
      <h2>Resolved Complaints</h2>
      <div className="filter-container">
        <label>Filter by Role:</label>
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="faculty">Faculty</option>
          <option value="non-faculty">Non Faculty</option>
          <option value="student">Student</option>
        </select>
        <label>Filter by Building:</label>
        <select name="building" value={filters.building} onChange={handleFilterChange}>
        <option value="">All</option>
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
          {/* Add more building options here */}
        </select>
        <label>Filter by Category:</label>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="carpentry">Carpentry</option>
          <option value="it-services">IT Services</option>
          <option value="civil-services">Civil Services</option>
          {/* Add more category options here */}
        </select>
        <label>Filter by Date:</label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Building</th>
            <th>Room Number</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.building}</td>
              <td>{item.roomNumber}</td>
              <td>{item.category}</td>
              <td>
  {new Date(item.date).getDate().toString().padStart(2, '0')}-{(new Date(item.date).getMonth() + 1).toString().padStart(2, '0')}-{new Date(item.date).getFullYear()}
</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="export-button" onClick={exportToExcel}>
        Export to Excel
      </button>
    </div>
  );
};

export default Analytics;
