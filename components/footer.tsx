import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-gray-900    border-gray-100">
        <footer className="bg-transparent p-4 my-0 flex justify-center items-center">
          <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center">
            <div className="text-black flex justify-center items-center">
              <p className="text-sm text-white">© 2024 GMADP Donations</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;

