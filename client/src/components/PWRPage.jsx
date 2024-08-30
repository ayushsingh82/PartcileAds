import React, { useState } from 'react';

const PWRPage = () => {
  const [funds, setFunds] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = () => {
    console.log('Transferring funds:', funds);
    console.log('With message:', message);
    // Add logic to handle the transfer
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-slate-300 p-8 rounded-lg shadow-lg w-full max-w-md h-[450px]"> {/* Increased height */}
        <h1 className="text-2xl font-bold mb-4 text-center">Transfer Funds</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Connect PWR Wallet
            </button>
            <img 
              src="data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20id%3D%22WOM-Logo%22%3E%3Cpath%20id%3D%22Vector%22%20d%3D%22M59.92%205H10.019l11.269%2020.348L7%2049.734%2021.246%2074l14.126-24.426-14.045-24.186H48.25L35.372%2049.574h24.549L73%2025.388%2059.92%205Z%22%20fill%3D%22%23000%22%20stroke%3D%22%23fff%22%20stroke-miterlimit%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              alt="PWR Logo"
              className="w-10 h-10"
            />
          </div>
          <input
            type="number"
            placeholder="Enter amount of funds"
            value={funds}
            onChange={(e) => setFunds(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleTransfer}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWRPage;
