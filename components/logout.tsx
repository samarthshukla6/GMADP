import React from "react";
import { doLogout } from "@/app/actions/index";

const Logout: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doLogout(); // Call the doLogout function
  };

  return (
    <form onSubmit={handleSubmit}>
      <button 
        className="button shadow-2xl p-2 m-1 rounded-2xl bg-red-500 hover:bg-gray-200 hover:text-black" 
        type="submit"
      >
        Sign Out
        <div className="rectangle"></div>
      </button>
    </form>
  );
};

export default Logout;
