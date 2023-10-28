import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    email: "",
  });
 

  const [isCreateMode, setCreateMode] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [emailError, setEmailError] = useState("");
 const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userid: getNextUserId(),
    }));
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:9900/getAll");
      setUsers(response.data);
    } catch (error) {
      toast.error('Unable to fetch User Api failed', {
        position: toast.POSITION.TOP_CENTER
    });
    }
  };

  const handleSearch = (searchText) => setSearchText(searchText);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });

  };
  const validateEmailAndPassword = (email, password) => {
    const errors = {};
  
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }
  

    if (!password) {
      errors.password = "Password is required";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/.test(password)) {
      errors.password = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be 8-15 characters long";
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleInsertOrUpdate = () => {

     validateEmailAndPassword();
  
    if (!emailError && !passwordError) {
    const apiUrl = isCreateMode ? "insert" : "update";
    const method = isCreateMode ? axios.post : axios.put;

    method(`http://localhost:9900/${apiUrl}`, formData)
      .then(() => {
        setFormData({ userid: "", password: "", email: "" });
        fetchUsers();
        toast.success(`User ${isCreateMode ? "created" : "updated"} successfully.`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setCreateMode(true);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:9900/delete?uid=${userId}`)
      .then(() => {
        setFormData({ userid: "", password: "", email: "" });
        setCreateMode(true);
        setSelectedUserId(null);
        fetchUsers();
        toast.success('User Deleted Successfully', {
          position: toast.POSITION.TOP_CENTER
      });
        
      })
      .catch((error) => {
        toast.error('Deletion failed', {
          position: toast.POSITION.TOP_CENTER
      });
      });
  };

  const getNextUserId = () => {
    if (users.length === 0) {
      return "1";
    }

    const maxUserID = Math.max(...users.map((user) => +user.userid));
    return (maxUserID + 1).toString();
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.userid === userId);
    if (userToEdit) {
      setSelectedUserId(userId);
      setSelectedUserData(userToEdit);
      setFormData(userToEdit);
      setCreateMode(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchText.toLowerCase();
    return (
      (user.userid &&
        user.userid.toString().toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toString().toLowerCase().includes(searchLower))
    );
  });

  function renderPasswordCircles(password) {
    const circle = "⚫";
    return circle.repeat(password.length);
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
    <div className=" w-auto bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-3xl font-bold mb-6">User Form</h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="userid" className="mb-2">
          User ID
        </label>
        <input
          type="text"
          name="userid"
          placeholder="User ID"
          value={formData.userid}
          onChange={(e) => handleFieldChange("userid", e.target.value)}
          className="border border-gray-300 rounded-md p-3"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className="border border-gray-300 rounded-md p-3"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleFieldChange("password", e.target.value)}
          className="border border-gray-300 rounded-md p-3"
        />
      </div>
      <button
        onClick={handleInsertOrUpdate}
        className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4"
      >
        {isCreateMode ? "Create User" : "Update User"}
      </button>
      <h2 className="text-3xl font-bold mb-6">User Search</h2>
      <input
        type="text"
        placeholder="Search by User ID or Email"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        className="border border-gray-300 rounded-md p-3 mb-4 w-9/12" 
      />
      <h2 className="text-3xl font-bold mb-6">User List</h2>
      <table className="border border-gray-600 mb-4">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-4 py-2">User ID</th>
            <th className="border-b border-gray-300 px-4 py-2">Email</th>
            <th className="border-b border-gray-300 px-4 py-2">Password</th>
            <th className="border-b border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userid}>
              <td className="border-b border-gray-300 px-4 py-2">{user.userid}</td>
              <td className="border-b border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border-b border-gray-300 px-4 py-2">{renderPasswordCircles(user.password)}</td>
              <td className="border-b border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    window.alert("The Data of User ID: " + user.userid + "\nEmail: " + user.email + "\nPassword: " + user.password);
                  }}
                  className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2"
                >
                  Read
                </button>
                <button
                  onClick={() => handleEdit(user.userid)}
                  className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.userid)}
                  className="bg-red-500 text-white rounded-md px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default App;
