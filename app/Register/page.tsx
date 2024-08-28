import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { auth } from '@/auth/auth';

const RegisterPage: React.FC = async () => {
 
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: '#e7e8fc',
          
          margin: '0'
        }}
      >
        <div className="flex flex-col justify-center items-center m-0 translate-y-16">
          <RegistrationForm />
          
        </div>
      </div>
      
    </>
  );
};

export default RegisterPage;