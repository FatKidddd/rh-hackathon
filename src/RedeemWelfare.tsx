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
  const handleRedeem = (id: number) => {
    setWelfareItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, redeemed: true } : item
      )
    );

    // Optionally, trigger additional action like a notification
    alert("You have successfully redeemed this welfare item!");
  };

  // Optionally: Fetch user and welfare items dynamically
  useEffect(() => {
    // Example: fetchUserProfile(user.id).then(setUserProfile);
    // Example: fetchAvailableWelfareItems().then(setWelfareItems);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Welfare Redemption</h1>
          <a
            href="/"
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Back to Home
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* User Info Section */}
        <section className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Info</h2>
          <div className="space-y-2">
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </section>

        {/* Available Welfare Items */}
        <section className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Available Welfare Items</h2>
          {welfareItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {welfareItems.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded p-4 ${
                    item.redeemed ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <h3 className="font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <button
                    onClick={() => handleRedeem(item.id)}
                    disabled={item.redeemed}
                    className={`w-full py-2 mt-4 rounded-lg ${
                      item.redeemed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition duration-200`}
                  >
                    {item.redeemed ? "Redeemed" : "Redeem"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No available welfare items.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default WelfareRedemptionProfile;
