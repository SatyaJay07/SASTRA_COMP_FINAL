import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import credentials from './cred';
import icon from './wtsp.png';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filters, setFilters] = useState({
    role: '',
    building: '',
    category: '',
    date: '',
  });

  const formatDate = (dateStr, format = 'dd-MM-yyyy') => {
    const date = new Date(dateStr);
    if (format === 'dd-MM-yyyy') {
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    }
    // Add more date format cases if needed
  };
  

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = credentials.users.find((u) => u.username === userId && u.password === password);

    if (user) {
      console.log('Authentication successful:', user);
      setIsAuthenticated(true);
      fetchData();
    } else {
      console.error('Authentication failed: Invalid credentials');
    }
  };

  const fetchData = () => {
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const markProblemAsResolved = (id) => {
    console.log(`Marking problem as resolved: ${id}`);
    // Make an API call to mark the problem as resolved
    axios.post('http://localhost:5000/api/mark-resolved', { id })
      .then((response) => {
        console.log(response.data);
        // Refresh the data after marking as resolved
        fetchData();
      })
      .catch((error) => {
        console.error('Error marking as resolved:', error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  
  const handleAnalyticsClick = () => {
    // Navigate to the "Analytics" page when the button is clicked
    navigate('/analytics');
  };

  const navigateHome = () => {
    navigate(-1);
  };
  
  const shareDataOnWhatsApp = () => {
    const sharedMessage = `Complaint Details:\n${filteredData
      .map((item, index) => `${index + 1}. Name: ${item.name}, Role: ${item.role}, Building: ${item.building}, Room Number: ${item.roomNumber}, Category: ${item.category}, Date: ${item.date}, Description: ${item.description}`)
      .join('\n')}`;
  
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(sharedMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredData = data.filter((item) => {
    const isRoleMatch = !filters.role || item.role === filters.role;
    const isBuildingMatch = !filters.building || item.building === filters.building;
    const isCategoryMatch = !filters.category || item.category === filters.category;
    const isDateMatch = !filters.date ? true : formatDate(item.date) === formatDate(filters.date, 'dd-MM-yyyy');

  
    return isRoleMatch && isBuildingMatch && isCategoryMatch && isDateMatch;
  });
  
  
  

  return (
    <div>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputContainerStyle}>
            <input
              type="text"
              placeholder="Username"
              value={userId}
              onChange={handleUserIdChange}
              style={inputStyle}
            />
          </div>
          <div style={inputContainerStyle}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={applyHoverStyle}
            onMouseLeave={removeHoverStyle}
          >
            Submit
          </button>
        </form>
        <div>
          <button onClick={navigateHome} style={homeButtonStyle}>
            Home
          </button>
          
        </div>
      </div>

      {isAuthenticated && (
        <>
          <div className="whatsapp-icon-container">
            <img
                src={icon}
                alt="WhatsApp"
                className="whatsapp-icon"
                onClick={shareDataOnWhatsApp}
            />
          </div>
          <div style={analyticsButtonContainerStyle}>
          <button onClick={handleAnalyticsClick} style={analyticsButtonStyle}>
            Analytics
          </button>
        </div>

          <div className="filter-container">
            <label style={{ color: 'black' }}>Filter by Role:</label>
            <select name="role" value={filters.role} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="faculty">Faculty</option>
              <option value="non-faculty">Non Faculty</option>
              <option value="student">Student</option>
            </select>
            <label style={{ color: 'black' }}>Filter by Building:</label>
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
            <label style={{ color: 'black' }}>Filter by Category:</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="carpentry">Carpentry</option>
              <option value="it-services">IT Services</option>
              <option value="civil-services">Civil Services</option>
             {/* Add more category options here */}
            </select>
            <label style={{ color: 'black' }}>Filter by Date:</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
        </>
      )}

      {isAuthenticated && filteredData.length > 0 && (
        <div>
          <h2>Complaint Details:</h2>
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
            <th>Action</th>
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
              <td>
                {item.status !== 'resolved' && (
                  <button
                  onClick={() => markProblemAsResolved(item.id)} // Pass the problem's id to the function
                  className="mark-resolved-button"
                >
                  Resolved
                </button>
                
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      )}
    </div>
  );
};

export default Login;

const formContainerStyle = {
  backgroundColor: "#ccffcc",
  padding: '50px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const analyticsButtonContainerStyle = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: '9999',
};


const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  width: '100%',
  border: 'none',
  borderBottom: '1px solid lightblue',
  borderRadius: '5px',
};

const buttonStyle = {
  display: 'block',
  width: '90%',
  margin: '10px 0',
  backgroundColor: 'lightblue',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  padding: '10px',
  transition: 'background-color 0.3s',
  cursor: 'pointer',
};

const homeButtonStyle = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  backgroundColor: "#6699ff",
  borderRadius: "5px",
  color: "white",
  transform: 'translateX(-50%)',
};

const analyticsButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: '#6699ff',
  borderRadius: '5px',
  color: 'white',
  padding: '10px',
  cursor: 'pointer',
};

const buttonHoverStyle = {
  backgroundColor: '#6699ff',
};

const applyHoverStyle = (e) => {
  e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
};

const removeHoverStyle = (e) => {
  e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
};
