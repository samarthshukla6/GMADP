import React from 'react';
import { generateReceiptPDF } from '../utils/pdfGenerator'; 

const ReceiptButton = ({ name, city, state, amount, receiptDate, donationDate, purpose, donationType }) => {
    const handleDownload = () => {
        generateReceiptPDF(name, city, state, amount, receiptDate, donationDate, purpose, donationType);
    };

    return (
        <button onClick={handleDownload} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out">
            Download Receipt
        </button>
    );
};

export default ReceiptButton;
