import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("affiliate");

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 mb-3">
      <div className="flex justify-start gap-3 items-start text-gray-600">
        <button
          className={`p-2 ${activeTab === "affiliate" ? "text-black" : ""}`}
          onClick={() => setActiveTab("affiliate")}
        >
          Affiliate Links
        </button>
        <button
          className={`p-2 ${activeTab === "bnpl" ? "text-black" : ""}`}
          onClick={() => setActiveTab("bnpl")}
        >
          BNPL Payments
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "affiliate" && (
          <div>
            <h2 className="text-xl font-bold">Affiliate Links</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Link</th>
                  <th className="py-2 px-4 border-b">Clicks</th>
                  <th className="py-2 px-4 border-b">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {/* Add your affiliate links data here */}
                <tr>
                  <td className="py-2 px-4 border-b">https://gebeya.com/link1</td>
                  <td className="py-2 px-4 border-b">100</td>
                  <td className="py-2 px-4 border-b">50 Br</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">https://gebeya.com/link2</td>
                  <td className="py-2 px-4 border-b">200</td>
                  <td className="py-2 px-4 border-b">100 Br</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "bnpl" && (
          <div>
            <h2 className="text-xl font-bold">BNPL Payments</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Order ID</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Add your BNPL payments data here */}
                <tr>
                  <td className="py-2 px-4 border-b">12345</td>
                  <td className="py-2 px-4 border-b">500 Br</td>
                  <td className="py-2 px-4 border-b">Paid</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">67890</td>
                  <td className="py-2 px-4 border-b">300 Br</td>
                  <td className="py-2 px-4 border-b">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;