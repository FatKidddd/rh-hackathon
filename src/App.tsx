import React, { useState, useEffect } from "react";
import { EventContract } from "./lib/utils";

interface EventDetails {
  contractAddress: string;
  name: string;
  description: string;
  maxCapacity: number;
  signupStartTime: Date;
  signupEndTime: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  rewardCost: number;
  attendeeCount: number;
}

function App() {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Sign-up modal states
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);

  // Auth states
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserSignupModal, setShowUserSignupModal] = useState(false);

  // Create event states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");

  // ----------------------
  //  1. Fetch Active Events (On-Chain or Mock)
  // ----------------------
  useEffect(() => {
    async function fetchEvents() {
      try {
        const activeContracts = await EventContract.getActiveContracts();
        const eventDetailsPromises = activeContracts.map(async (contractInstance: any) => {
          const details = await contractInstance.getDetails();
          return {
            ...details,
            contractAddress: contractInstance.address,
          } as EventDetails;
        });

        const fetchedEvents = await Promise.all(eventDetailsPromises);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // ----------------------
  //  2. Sign-Up Logic
  // ----------------------
  const handleSignupOpen = (event: EventDetails) => {
    setSelectedEvent(event);
    setShowSignupModal(true);
  };

  const handleSignupClose = () => {
    setShowSignupModal(false);
    setSelectedEvent(null);
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEvent) return;

    try {
      const eventContract = await EventContract.getContract(selectedEvent.contractAddress);
      const hasSignedUp = await eventContract.hasSignedUp();
      if (hasSignedUp) {
        alert("You have already signed up for this event.");
        return;
      }

      await eventContract.signUp("User metadata");
      alert("Successfully signed up for the event!");
      setShowSignupModal(false);
    } catch (error) {
      console.error("Failed to sign up for the event:", error);
      alert("Failed to sign up for the event.");
    }
  };

  // ----------------------
  //  3. Create New Event Logic (Mocked)
  // ----------------------
  const handleCreateModalOpen = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleCreateEventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventLocation) return;

    const newMockEvent: EventDetails = {
      contractAddress: "mock_contract_address_" + (events.length + 1),
      name: newEventTitle,
      description: newEventLocation,
      maxCapacity: 100,
      signupStartTime: new Date(),
      signupEndTime: new Date(newEventDate),
      eventStartTime: new Date(newEventDate),
      eventEndTime: new Date(newEventDate),
      rewardCost: 0,
      attendeeCount: 0,
    };

    setEvents([...events, newMockEvent]);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventLocation("");
    setShowCreateModal(false);
  };

  // ----------------------
  //  4. Auth Logic
  // ----------------------
  const handleLoginOpen = () => setShowLoginModal(true);
  const handleLoginClose = () => setShowLoginModal(false);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ id: "user_12345", name: "John Doe" });
    setShowLoginModal(false);
  };

  const handleUserSignupOpen = () => setShowUserSignupModal(true);
  const handleUserSignupClose = () => setShowUserSignupModal(false);

  const handleUserSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ id: "user_54321", name: "Jane Doe" });
    setShowUserSignupModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // ----------------------
  //  Loading State
  // ----------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Loading events...
      </div>
    );
  }

  // ----------------------
  //  Render
  // ----------------------
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-wide">
            Uni Hall Events
          </h1>
          <div className="space-x-4">
            {user ? (
              <>
                <span className="text-white">
                  Logged in as{" "}
                  <a
                    href="/profile"
                    className="underline font-medium hover:text-gray-200"
                  >
                    {user.id}
                  </a>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginOpen}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Login
                </button>
                <button
                  onClick={handleUserSignupOpen}
                  className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            Upcoming Events
          </h2>
          <button
            onClick={handleCreateModalOpen}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
          >
            Create Event
          </button>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.contractAddress + event.name}
              className="relative flex flex-col bg-white border-l-4 border-blue-500 rounded-md shadow-sm p-4 
                        transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-md"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {event.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-tight mb-2">
                {event.description}
              </p>

              {/* Info Block */}
              <div className="text-sm text-gray-600 space-y-1">
                <p><b>Capacity</b>: {event.attendeeCount} / {event.maxCapacity}</p>
                <p><b>Signups</b>: {event.signupStartTime.toLocaleString()} – {event.signupEndTime.toLocaleString()}</p>
                <p><b>Events</b>: {event.eventStartTime.toLocaleString()} – {event.eventEndTime.toLocaleString()}</p>
                <p><b>Reward Cost</b>: {event.rewardCost}</p>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={() => handleSignupOpen(event)}
                className="mt-4 inline-block px-4 py-2 text-sm bg-blue-500 
                          text-white rounded hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
            </div>
          ))}
          </div>
        )}
      </main>

      {/* FOOTER (Optional) */}
      <footer className="bg-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Uni Hall Events
        </div>
      </footer>

      {/* -------------------- Modals Below -------------------- */}
      {showSignupModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleSignupClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-2">Sign Up for {selectedEvent.name}</h2>
            <p className="text-sm text-gray-600 mb-4">
              Event starts on {selectedEvent.eventStartTime.toLocaleString()}
            </p>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleCreateModalClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Create New Event</h2>
            <form onSubmit={handleCreateEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleLoginClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {showUserSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleUserSignupClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleUserSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;