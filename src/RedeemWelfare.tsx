import React, { useState, useEffect } from "react";

// Define the interface for Welfare
interface Welfare {
  id: number;
  name: string;
  description: string;
  redeemed: boolean;
}

const WelfareRedemptionProfile: React.FC = () => {
  // Mock user profile - you can fetch this from context or props in a real app
  const [user] = useState({
    id: "user_54321",
    name: "Jane Doe",
    email: "jane.doe@example.com",
  });

  // Mock welfare items the user can redeem
  const [welfareItems, setWelfareItems] = useState<Welfare[]>([
    {
      id: 1,
      name: "Free Meal Voucher",
      description: "Redeem for a free meal at participating restaurants.",
      redeemed: false,
    },
    {
      id: 2,
      name: "Movie Ticket",
      description: "Redeem for a movie ticket to any show.",
      redeemed: false,
    },
    {
      id: 3,
      name: "Grocery Discount",
      description: "Redeem for a discount on grocery shopping.",
      redeemed: false,
    },
  ]);

  // Handle redeeming a welfare item
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRedeem = (id: number) => {
    setWelfareItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, redeemed: true } : item
      )
    );

    // Show notification instead of alert
    setNotificationMessage('You have successfully redeemed this welfare item!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
  };

  // Optionally: Fetch user and welfare items dynamically
  useEffect(() => {
    // Example: fetchUserProfile(user.id).then(setUserProfile);
    // Example: fetchAvailableWelfareItems().then(setWelfareItems);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Consistent with App.tsx */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Uni Hall Events
            </h1>
            {/* Navigation links */}
            <nav className="flex gap-6">
              <a
                href="/"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                Events
              </a>
              <a
                href="/welfare"
                className="text-white font-medium"
              >
                Welfare
              </a>
            </nav>
          </div>
          
          {/* User section - matches App.tsx */}
          <div className="flex items-center gap-4">
            <span className="text-white">
              Welcome, <span className="font-medium">{user.name}</span>
            </span>
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                       transition-colors duration-200 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Your Profile
            </h2>
            <p className="text-gray-600">Manage your welfare benefits</p>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-500">User ID</label>
              <p className="font-medium text-gray-900">{user.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="font-medium text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Welfare Items Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Available Benefits</h2>
          <p className="text-gray-600">Redeem your welfare items</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {welfareItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 
                        overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  {item.redeemed && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      Redeemed
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="p-6 mt-auto">
                <button
                  onClick={() => handleRedeem(item.id)}
                  disabled={item.redeemed}
                  className={`w-full px-4 py-3 text-sm rounded-lg font-medium transition-colors duration-200
                    ${item.redeemed 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                >
                  {item.redeemed ? 'Already Redeemed' : 'Redeem Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            {notificationMessage}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Uni Hall Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WelfareRedemptionProfile;
