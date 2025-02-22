import React, { useState, useEffect } from "react";
import { EventContract } from "./lib/utils";

/** 
 * Extended interface to match what your contract returns.
 * Make sure to include contractAddress since you need it for sign-up calls.
 */
interface EventDetails {
  contractAddress: string;  // <- Important for handleSignupSubmit
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
  //  1. Fetch Active Events from On-Chain
  // // ----------------------
  useEffect(() => {
    async function fetchEvents() {
      try {
        const activeContracts = await EventContract.getActiveContracts();
        // For each contract, fetch the event details
        const eventDetailsPromises = activeContracts.map(async (contractInstance: any) => {
          const details = await contractInstance.getDetails();
          
          // Make sure 'details' matches the EventDetails interface
          // For example, if getDetails() returns something like:
          // {
          //   name,
          //   description,
          //   maxCapacity,
          //   signupStartTime,
          //   signupEndTime,
          //   eventStartTime,
          //   eventEndTime,
          //   rewardCost,
          //   attendeeCount
          // }
          // then we also add the contract's address so we can sign up later
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
  //  2. Sign-Up Modal Logic
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
      // Retrieve the contract using the selected event's address
      const eventContract = await EventContract.getContract(selectedEvent.contractAddress);

      const hasSignedUp = await eventContract.hasSignedUp();
      if (hasSignedUp) {
        alert("You have already signed up for this event.");
        return;
      }

      // Pass in user details or relevant metadata
      await eventContract.signUp("User metadata");
      alert("Successfully signed up for the event!");
      setShowSignupModal(false);
    } catch (error) {
      console.error("Failed to sign up for the event:", error);
      alert("Failed to sign up for the event.");
    }
  };

  // ----------------------
  //  3. Create New Event Modal Logic (Mock / Partial)
  //     In a real app, you'd call a contract function like:
  //     await EventContract.createEvent(...required params...)
  // ----------------------
  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
  };

  const handleCreateEventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventLocation) return;

    // In reality, you'd do something like:
    // await EventContract.createEvent({
    //   name: newEventTitle,
    //   description: "",
    //   ...
    // });
    // For now, just mock push:
    const newMockEvent: EventDetails = {
      contractAddress: "mock_contract_address_" + (events.length + 1),
      name: newEventTitle,
      description: newEventLocation,
      maxCapacity: 100,
      signupStartTime: new Date(),
      signupEndTime: new Date(newEventDate),  // example
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">Uni Hall Events</h1>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">
                Logged in as{" "}
                <a href="/profile" className="underline text-blue-500 hover:text-blue-700">
                  <strong>{user.id}</strong>
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

        {/* Events Grid */}
        {events.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {events.map((event) => (
              <div
                key={event.contractAddress + event.name}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <h3 className="text-md font-semibold mb-2">{event.name}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  Description: {event.description}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Capacity: {event.attendeeCount} / {event.maxCapacity}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Signups: {event.signupStartTime.toLocaleString()} -{" "}
                  {event.signupEndTime.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Event: {event.eventStartTime.toLocaleString()} -{" "}
                  {event.eventEndTime.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Reward Cost: {event.rewardCost}
                </p>

                <button
                  onClick={() => handleSignupOpen(event)}
                  className="px-3 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* -------------------- Modals -------------------- */}

      {/* 1) Sign-up Modal */}
      {showSignupModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleSignupClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Sign Up for {selectedEvent.name}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Event starts on {selectedEvent.eventStartTime.toLocaleString()}
            </p>
            <form onSubmit={handleSignupSubmit} className="space-y-4 mt-4">
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

      {/* 2) Create Event Modal (mock) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleCreateModalClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* 3) Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleLoginClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* 4) User Signup Modal */}
      {showUserSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={handleUserSignupClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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