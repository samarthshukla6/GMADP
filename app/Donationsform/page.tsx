import React from "react";
import Form from "@/components/form";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { auth } from "@/auth/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Donationsform: React.FC = async () => {

    const notify = (message: string, type: 'success' | 'error') => {
        if (type === 'success') {
          toast.success(message);
        } else {
          toast.error(message);
        }
      };
    return (
        <>
        <div className="bg-cover bg-center" >
            <div>
                <Navbar />
            </div>
            <div>
                <Form />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    </>
    );
};

export default Donationsform;
