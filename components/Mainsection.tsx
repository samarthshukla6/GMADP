import React from "react";
import LoginForm from "./Login";
import Image from "next/image";

const MainSection: React.FC = () => {
  return (
    <>
      <div
        className="flex flex-col sm:flex-row justify-center items-center p-10"
        style={{ height: "92vh" }}
      >
        {/* left section */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <h1 className="pacifico-regular p-1 justify-center items-center">
              GMADP Donations
            </h1>
          </div>
          <h3 className="hind-regular">&quot; गण गण गणात बोते &quot;</h3>
          <div className="rounded-full bg-blue-500 h-16 w-16 flex hidden sm:block">
     <Image
       src="/gajanan maharaj.jpg"
       width={64}
       height={64}
       alt="Picture of the author"
       className="h-16 w-16 object-cover rounded-full"
     />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default MainSection;


