import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "..";

const Homepage = () => {
  async function getAllFolder() {
    try {
      const response = await axios.get(`${BACKEND_URL}/folder`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFolder();
  }, []);
  return (
    <div className="w-full h-screen bg-zinc-950  text-white">Homepage</div>
  );
};

export default Homepage;
