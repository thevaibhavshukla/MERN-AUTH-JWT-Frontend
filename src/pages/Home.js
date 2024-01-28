
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const getData = async () => {
    toast.loading();
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get("https://mern-auth-jwt-backend.onrender.com/api/user/get-user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const response = await axios.get("http://localhost:5000/api/user/get-user-info", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const response = await axios.get("/api/user/get-user-info", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      toast.dismiss();
      if (response.data.success) {
        setUserInfo(response.data.data);
      } else {
        localStorage.removeItem("user");
        navigate("/login");
        toast.error("Something went wrong");
      }
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (userInfo == null) {
      return () => {getData()};
    }
  }, [userInfo]);


  return (
    userInfo !== null && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col space-y-5">
          <h1 className="text-5xl font-semibold text-primary">
            {userInfo?.name}
          </h1>
          <h1 className="text-5xl font-semibold text-primary">
            {userInfo?.email}
          </h1>
          <button
            className="border border-primary px-10 py-2 text-primary max-w-max"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    )
  );
}

export default Home;
