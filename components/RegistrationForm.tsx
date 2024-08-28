'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Footer from './footer';

const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        let form = document.getElementById('form') as HTMLFormElement;
        let page = document.getElementById('page') as HTMLFormElement;
        page.insertAdjacentHTML(
          'beforeend',
          '<div class="mt-4 p-4 text-lg text-green-600 bg-green-100 rounded shadow-md">User registration Successful!</div>'
        );
        form.reset();
        alert('User Registered Successfully!');
      } else {
        alert('User Registration Failed!');
        let form = document.getElementById('form') as HTMLFormElement;
        let page = document.getElementById('page') as HTMLFormElement;
        page.insertAdjacentHTML(
          'afterend',
          '<div class="mt-4 p-4 text-lg text-red-600 bg-red-100 rounded shadow-md">User registration failed!</div>'
        );
        form.reset();
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div id="page" className="flex flex-col justify-center items-center h-auto py-10 px-4 m-0">
      <div className="mt-16 flex flex-col justify-center items-center">
        <Image
          src="/namaste.png"
          width={100}
          height={100}
          alt="namaste"
          className="h-24 w-24 object-cover rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 mt-5">Please add the new user</h1>
      </div>
      <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md mt-10">
        <form
          id="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-gray-700 text-lg font-semibold mb-1"
            >
              Name
            </label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="my-2">
            <label
              className="block text-gray-700 text-lg font-semibold mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              type="email"
              name="email"
              id="email"
              required
            />
          </div>

          <div className="my-2">
            <label
              className="block text-gray-700 text-lg font-semibold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <button
            id="submit"
            type="submit"
            className={`bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <img src="/sp.svg" alt="Loading..." className="h-6 w-6" />
              </div>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
    <div className='w-full '>
      < Footer/>
    </div>
      </>
  );
};

export default RegistrationForm;
