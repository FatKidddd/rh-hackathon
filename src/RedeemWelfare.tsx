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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Welfare Benefits</h1>
          <a
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* User Info Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8 transform hover:scale-[1.01] transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-6 text-blue-600">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="font-medium">{user.id}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Available Welfare Items */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-blue-600">Available Benefits</h2>
          {welfareItems.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {welfareItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg p-6 transition-all duration-200 flex flex-col h-full ${
                    item.redeemed 
                      ? "bg-gray-50 border border-gray-200" 
                      : "bg-white shadow-md hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    {item.redeemed && (
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                        Redeemed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">{item.description}</p>
                  <button
                    onClick={() => handleRedeem(item.id)}
                    disabled={item.redeemed}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                      item.redeemed
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white transform hover:-translate-y-1"
                    }`}
                  >
                    {item.redeemed ? "Already Redeemed" : "Redeem Now"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No available welfare items at the moment.</p>
            </div>
          )}

          {/* Notification Toast */}
          {showNotification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
              {notificationMessage}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default WelfareRedemptionProfile;
