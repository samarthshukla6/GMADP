'use client'
import { useState } from 'react';
import axios from 'axios';

const fieldOptions = [
  { label: 'Name', value: 'name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
  { label: 'Purpose', value: 'purpose' },
  { label: 'Donation Type', value: 'donationType' },
  { label: 'Amount (Greater Than)', value: 'greaterThanAmount' },
  { label: 'Amount (Less Than)', value: 'lessThanAmount' },
  { label: 'Donation Number', value: 'donationNumber' },
  { label: 'Email', value: 'email' }
];

const excludedFields = ['_id', '__v', 'updatedAt'];

const SearchDonations: React.FC = () => {
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/search', {
        params: { field, value },
      });
      if (response.data.success) {
        setResults(response.data.data);
        setError(null);
      } else {
        setError(response.data.error);
        setResults([]);
      }
    } catch (err) {
      setError('An error occurred while searching.');
      setResults([]);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Donations</h1>
      <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-4">
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        >
          <option value="" disabled>Select field</option>
          {fieldOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-6">
        {results.length > 0 ? (
          results.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 rounded-lg shadow-xl bg-white p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {Object.keys(item)
                  .filter(field => !excludedFields.includes(field))
                  .map((field) => (
                    <div key={field} className="flex flex-col">
                      <span className="font-semibold text-gray-700 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-gray-600 break-words bg-gray-100 p-2 rounded-lg shadow-sm">
                        {item[field]}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDonations;

