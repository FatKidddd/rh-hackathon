import React, { useState } from "react";
import "./App.css"; // or wherever you have your custom CSS
import "./index.css"; // Tailwind base, components, utilities

function App() {
  const [events, setEvents] = useState([
    { id: 1, title: "Welcome Party", date: "2025-03-01", location: "Main Hall" },
    { id: 2, title: "Karaoke Night", date: "2025-03-05", location: "Music Hall" },
    { id: 3, title: "Board Game Marathon", date: "2025-03-10", location: "Community Room" },
    { id: 4, title: "Open Mic Night", date: "2025-03-15", location: "Cafeteria Stage" },
  ]);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");

  const handleSignupOpen = (event: any) => {
    setSelectedEvent(event);
    setShowSignupModal(true);
  };

  const handleSignupClose = () => {
    setShowSignupModal(false);
    setSelectedEvent(null);
  };

  const handleSignupSubmit = (e: any) => {
    e.preventDefault();
    console.log("Signed up for event:", selectedEvent);
    setShowSignupModal(false);
  };

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
  };

  const handleCreateEventSubmit = (e: any) => {
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">Uni Hall Events</h1>
        <button
          onClick={handleCreateModalOpen}
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Create Event
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold mb-6">Upcoming Events</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <h3 className="text-md font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Date: {event.date}</p>
              <p className="text-sm text-gray-500 mb-4">Location: {event.location}</p>
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

      {/* Signup Modal */}
      {showSignupModal && (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">
              Sign Up for {selectedEvent?.title}
            </h2>
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

      {/* Create Event Modal */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" />
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
    </div>
  );
}

export default App;
