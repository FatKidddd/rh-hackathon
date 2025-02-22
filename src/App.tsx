import React, { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

function App() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "Welcome Party", date: "2025-03-01", location: "Main Hall" },
    { id: 2, title: "Karaoke Night", date: "2025-03-05", location: "Music Hall" },
    { id: 3, title: "Board Game Marathon", date: "2025-03-10", location: "Community Room" },
    { id: 4, title: "Open Mic Night", date: "2025-03-15", location: "Cafeteria Stage" },
  ]);

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");

  const handleSignupOpen = (event: Event) => {
    setSelectedEvent(event);
    setShowSignupModal(true);
  };

  const handleSignupClose = () => {
    setShowSignupModal(false);
    setSelectedEvent(null);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signed up for event:", selectedEvent);
    setShowSignupModal(false);
  };

  const handleCreateModalOpen = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventLocation) return;

    const newEvent: Event = {
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
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Uni Hall Events</h1>
        <button
          onClick={handleCreateModalOpen}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create Event
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500">Date: {event.date}</p>
                <p className="text-sm text-gray-500">Location: {event.location}</p>
              </div>
              <button
                onClick={() => handleSignupOpen(event)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          ))}
        </div>
      </main>

      {showSignupModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={handleSignupClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
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
            <h3 className="text-xl font-bold mb-4">Sign Up for {selectedEvent?.title}</h3>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={handleCreateModalClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
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
            <h3 className="text-xl font-bold mb-4">Create New Event</h3>
            <form onSubmit={handleCreateEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  required
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
