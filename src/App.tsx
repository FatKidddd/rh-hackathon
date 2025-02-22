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
  const [newEventTime, setNewEventTime] = useState("");
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
    if (!newEventTitle || !newEventDate || !newEventTime || !newEventLocation) return;

    const eventDateTime = new Date(`${newEventDate}T${newEventTime}`);
    
    const newMockEvent: EventDetails = {
      contractAddress: "mock_contract_address_" + (events.length + 1),
      name: newEventTitle,
      description: newEventLocation,
      maxCapacity: 100,
      signupStartTime: new Date(),
      signupEndTime: eventDateTime,
      eventStartTime: eventDateTime,
      eventEndTime: new Date(eventDateTime.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      rewardCost: 0,
      attendeeCount: 0,
    };

    setEvents([...events, newMockEvent]);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventTime("");
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
      {/* Header - Updated styling */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Uni Hall Events
          </h1>
          <div className="space-x-4">
            {user ? (
              <>
                <div className="text-white flex items-center gap-3">
                  <span>Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                             transition-colors duration-200 text-sm font-medium"
                  >
                    Logout
                  </button>
                  <a 
                    href="/profile" 
                    className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
                    title="View Profile"
                  >
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginOpen}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                           transition-colors duration-200 text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleUserSignupOpen}
                  className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 
                           transition-colors duration-200 text-sm font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Updated styling */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Upcoming Events
            </h2>
            <p className="text-gray-600">Join our exciting community events</p>
          </div>
          <button
            onClick={handleCreateModalOpen}
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white 
                     text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </button>
        </div>

        {/* Events Grid - Updated styling */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found.</p>
            <p className="text-gray-400">Check back later for upcoming events!</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.contractAddress + event.name}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 
                          overflow-hidden border border-gray-100"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.name}
                  </h3>
                  <p className="text-gray-600">
                    {event.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{event.attendeeCount} / {event.maxCapacity} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.eventStartTime.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.eventStartTime.toLocaleTimeString()} - {event.eventEndTime.toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSignupOpen(event)}
                    className="w-full px-4 py-3 text-sm bg-purple-600 text-white rounded-lg 
                              hover:bg-purple-700 transition-colors duration-200 font-medium"
                  >
                    Sign Up for Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Updated Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Uni Hall Events. All rights reserved.</p>
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
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full border border-gray-300 rounded px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
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