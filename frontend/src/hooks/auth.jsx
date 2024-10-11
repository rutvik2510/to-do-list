import { useState, useEffect } from "react";
import axios from "axios";
// import { toast } from "react-toastify";


const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState();
    const [task, setTask] = useState({});

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     localStorage.setItem("token", token);
  //   } 
  //   if(!token){
  //       console.log("No token Found");
  //   }
  //   else {
  //     localStorage.removeItem("token");
  //   }
  // }, [token]);

  async function getUserInfo() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5012/api/auth/getUserById/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User Info:", response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(
        "Error fetching user info:",
        error.response ? error.response.data : error.message
      );
    }
  }
  async function gettask() {
    try {
      const response = await axios.post(
        "http://localhost:5012/api/task/getalltask",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Task:", response.data);
      setTask(response.data);
    } catch (error) {
      console.error(
        "Error fetching task :",
        error.response ? error.response.data : error.message
      );
    }
  }
    
  
  const logout = () => {
    setToken(null);
    setUser(null);
  };
  return {
    user,
    token,
    task,
    gettask,
    getUserInfo,
    logout,
  };
};

export default useAuth;