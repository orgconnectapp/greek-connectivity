
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="relative w-full h-32 bg-gradient-to-r from-blue-600 to-blue-500 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center bg-cover mix-blend-overlay opacity-20"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container h-full flex items-end pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">AXA Phi Alpha Zeta</h1>
          </div>
        </div>
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
