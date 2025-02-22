import React, { useState, useEffect } from "react";
import { EventContract } from "./lib/utils";

interface EventDetails {
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
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserSignupModal, setShowUserSignupModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const activeEvents = await EventContract.getActiveContracts();
        const eventDetailsPromises = activeEvents.map(eventContract => eventContract.getDetails());
        const eventDetails = await Promise.all(eventDetailsPromises);
        setEvents(eventDetails);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

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

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
  };

  const handleCreateEventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventLocation) return;

    const newEvent = {
      id: events.length + 1,
      title: newEventTitle,
      date: newEventDate,
      location: newEventLocation,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventLocation("");
    setShowCreateModal(false);
  };

  const handleLoginOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ id: "user_12345", name: "John Doe" });
    setShowLoginModal(false);
  };

  const handleUserSignupOpen = () => {
    setShowUserSignupModal(true);
  };

  const handleUserSignupClose = () => {
    setShowUserSignupModal(false);
  };

  const handleUserSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ id: "user_54321", name: "Jane Doe" });
    setShowUserSignupModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">Uni Hall Events</h1>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">
                Logged in as <a href="/profile"><strong>{user.id}</strong></a>
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <button
            onClick={handleCreateModalOpen}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          >
            Create Event
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <div key={event.name} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <h3 className="text-md font-semibold mb-2">{event.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Date: {event.eventStartTime.toDateString()}</p>
              <p className="text-sm text-gray-500 mb-4">Location: {event.description}</p>
              <button
                onClick={() => handleSignupOpen(event)}
                className="px-3 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modals */}
      {showSignupModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleSignupClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Sign Up for {selectedEvent.name}</h2>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
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
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleUserSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
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
