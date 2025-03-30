"use client"; 

import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // Fetch users on component mount
  useEffect(() => {
    axios.get("/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Add user
  const handleAddUser = async () => {
    try {
      await axios.post("/api/users", newUser);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Soft delete user
  const handleSoftDelete = async (id) => {
    try {
      await axios.patch(`/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error soft deleting user:", error);
    }
  };

  return (
    <div>
      <h1>Users List</h1>
      
      {/* Form to Add User */}
      <div>
        <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      
      {/* Display Users */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>{user.name} - {user.email}</p>
            <button onClick={() => handleSoftDelete(user._id)}>Soft Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
