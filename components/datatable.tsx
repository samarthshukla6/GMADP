'use client'
import React, { useEffect, useState } from 'react';
import { generateReceiptPDF } from '../utils/pdfGenerator'; 
import ReceiptButton from './Receipts';

// Define the TypeScript interface for the data
interface DataItem {
  _id: string;
  donationDate: string;
  name: string;
  city: string;
  state: string;
  purpose: string;
  donationType: string;
  amount: number;
  donationNumber: number;
  remarks: string;
  email: string;
  receiptDate: string;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<number>(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAllReceipts');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Define the field names with "Donation Number" first
  const fields = [
    'Donation Number',
    'Donation Date',
    'Name',
    'City',
    'State',
    'Purpose',
    'Donation Type',
    'Amount',
    'Remarks',
    'Email',
    'Receipt Date'
  ];

  // Helper function to get value by field name
  const getFieldValue = (item: DataItem, field: string) => {
    switch (field) {
      case 'Donation Number': return item.donationNumber;
      case 'Donation Date': return formatDate(item.donationDate);
      case 'Name': return item.name;
      case 'City': return item.city;
      case 'State': return item.state;
      case 'Purpose': return item.purpose;
      case 'Donation Type': return item.donationType;
      case 'Amount': return item.amount;
      case 'Remarks': return item.remarks;
      case 'Email': return item.email;
      case 'Receipt Date': return formatDate(item.receiptDate);
      default: return 'N/A';
    }
  };

  // Function to format date to dd/mm/yyyy
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  // Function to handle download action
  const handleDownload = (item: DataItem) => {
    alert(`Download functionality not implemented.`);
  };

  // Function to change page
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setPageInput(newPage); // Update input field when page changes
    }
  };

  // Function to handle page input change
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 && value <= totalPages) {
      setPageInput(value);
    }
  };

  // Function to handle "Go" button click
  const handlePageGo = () => {
    handlePageChange(pageInput);
  };

  return (
    <div className="p-6 bg-[#e7e8fc] mb-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Receipts Data</h1>
      <div className="overflow-x-auto">
        {currentItems.map((item) => (
          <div key={item._id} className="mb-6 border border-gray-300 rounded-lg shadow-xl bg-white p-6 transform hover:scale-95 transition-transform duration-300 ease-in-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
              {fields.map((field) => (
                <div key={field} className="flex flex-col">
                  <span className="font-semibold text-gray-700 mb-1">{field}</span>
                  <span className="text-gray-600 break-words bg-gray-100 p-2 rounded-lg shadow-sm">
                    {getFieldValue(item, field)}
                  </span>
                </div>
              ))}
            </div>
            <ReceiptButton
              name={item.name}
              city={item.city}
              state={item.state}
              amount={item.amount}
              receiptDate={item.receiptDate}
              donationDate={item.donationDate}
              purpose={item.purpose}
              donationType={item.donationType}  

            />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Next
        </button>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={handlePageInputChange}
          className="text-center w-20 p-1 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handlePageGo}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default DataTable;

