import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:4000/api/users";

const Example = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
  });

  // GET USERS - return data instead of setting state directly
  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      return res.data.users;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  // POST USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(url, formData);

      // refresh list after adding
      const users = await fetchData();
      setUsers(users);

      // clear form
      setFormData({
        firstName: "",
        lastName: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
    useEffect(() => {
      let isMounted = true;

      fetchData().then((data) => {
        if (isMounted) setUsers(data);
      });

      return () => {
        isMounted = false;
      };
    }, []);



  return (
    <div style={{ padding: "20px" }}>
      <h2>Create User</h2>

      {/* POST FORM */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Contact"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
        />
        <br />

        <button type="submit">Add User</button>
      </form>

      <hr />

      {/* DISPLAY USERS */}
      <h2>Users List</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <b>Name:</b> {user.firstName} {user.lastName}
            </p>
            <p>
              <b>Contact:</b> {user.contact}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Example;