'use client';
// components/Form.tsx
'use client';
import React, { useState, useEffect } from 'react';

const Form: React.FC = () => {
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

    console.log('Form submission started');

    try {
      const formData = new FormData(event.currentTarget);

      const donationDate = formData.get('donationDate') as string;
      const name = formData.get('name') as string;
      const city = formData.get('city') as string;
      const state = formData.get('state') as string;
      const purpose = formData.get('purpose') as string;
      const donationType = formData.get('donationType') as string;
      const amount = Number(formData.get('amount'));
      const remarks = formData.get('remarks') as string;
      const email = formData.get('email') as string;

      // Validation
      if (!name || isNaN(amount) || amount <= 0) {
        alert('Name and Amount are required. Amount must be a positive number.');
        setIsLoading(false);
        return;
      }

      console.log('Form data:', {
        donationDate,
        name,
        city,
        state,
        purpose,
        donationType,
        amount,
        remarks,
        email,
      });

      const response = await fetch('/api/saveReceipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationDate,
          name,
          city,
          state,
          purpose,
          donationType,
          amount,
          remarks,
          email,
        }),
      });

      const result = await response.json();

      console.log('Response status:', response.status);
      console.log('Response result:', result);

      const form = document.getElementById('form') as HTMLFormElement;
      if (response.status <= 201) {
        form.reset();
        alert('Data added successfully!');
      } else {
        console.error('Error:', result.error);
        alert('Data addition failed!');
      }
    } catch (e) {
      console.error('Exception:', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-green-100">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-3xl transform transition-transform hover:scale-105 translate-y-11 md:translate-y-12 mx-6   ">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Donations Form</h2>
        <form id="form" className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="col-span-1">
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">Name:</label>
            <input type="text" id="name" name="name" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" />
          </div>
          <div className="col-span-1">
            <label htmlFor="amount" className="block text-lg font-semibold text-gray-700 mb-2">Amount:</label>
            <input type="number" id="amount" name="amount" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" min="0" />
          </div>
          <div className="col-span-1">
            <label htmlFor="donationType" className="block text-lg font-semibold text-gray-700 mb-2">Type of Donation:</label>
            <select id="donationType" name="donationType" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div className="col-span-1">
            <label htmlFor="donationDate" className="block text-lg font-semibold text-gray-700 mb-2">Date:</label>
            <input type="date" id="donationDate" name="donationDate" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" />
          </div>
          <div className="col-span-1">
            <label htmlFor="city" className="block text-lg font-semibold text-gray-700 mb-2">City:</label>
            <input type="text" id="city" name="city" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" />
          </div>
          <div className="col-span-1">
            <label htmlFor="state" className="block text-lg font-semibold text-gray-700 mb-2">State (USA):</label>
            <select id="state" name="state" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
              {/* State options */}
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AL">Alabama</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="col-span-1">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email ID:</label>
            <input type="email" id="email" name="email" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" />
          </div>
          <div className="col-span-1">
            <label htmlFor="purpose" className="block text-lg font-semibold text-gray-700 mb-2">Purpose:</label>
            <select id="purpose" name="purpose" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className="col-span-1">
            <label htmlFor="remarks" className="block text-lg font-semibold text-gray-700 mb-2">Remarks:</label>
            <textarea id="remarks" name="remarks" className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
