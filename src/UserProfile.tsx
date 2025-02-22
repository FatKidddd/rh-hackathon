import React, { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

const UserProfile: React.FC = () => {
  // Mock user
  const [user] = useState<User>({
    id: "user_54321",
    name: "Jane Doe",
    email: "jane.doe@example.com",
  });

  // Mock upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Karaoke Night",
      date: "2025-03-05",
      location: "Music Hall",
    },
    {
      id: 2,
      title: "Board Game Marathon",
      date: "2025-03-10",
      location: "Community Room",
    },
  ]);

  // Mock past events
  const [pastEvents, setPastEvents] = useState<Event[]>([
    {
      id: 3,
      title: "Welcome Party",
      date: "2025-01-10",
      location: "Main Hall",
    },
    {
      id: 4,
      title: "Open Mic Night",
      date: "2024-12-20",
      location: "Cafeteria Stage",
    },
  ]);

  useEffect(() => {
    // Future: Replace with RPC or API calls.
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">User Profile</h1>
          <a
            href="/"
            className="px-3 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 text-sm font-medium"
          >
            Back to Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* User Info Card */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            {/* You can add a placeholder avatar or user icon if you like */}
            <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
              {/* Placeholder icon, or user initials */}
              <span className="text-gray-500 font-bold text-xl">JD</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            <strong>User ID:</strong> {user.id}
          </p>
        </section>

        {/* Upcoming Events */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Upcoming Events
          </h3>
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border rounded-lg p-4 shadow-sm transition-transform duration-200 hover:scale-105"
                >
                  <h4 className="font-bold text-gray-800 mb-2">{event.title}</h4>
                  <p className="text-sm text-gray-500 mb-1">Date: {event.date}</p>
                  <p className="text-sm text-gray-500">Location: {event.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming events found.</p>
          )}
        </section>

        {/* Past Events */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Past Events
          </h3>
          {pastEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border rounded-lg p-4 shadow-sm transition-transform duration-200 hover:scale-105"
                >
                  <h4 className="font-bold text-gray-800 mb-2">{event.title}</h4>
                  <p className="text-sm text-gray-500 mb-1">Date: {event.date}</p>
                  <p className="text-sm text-gray-500">Location: {event.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No past events found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserProfile;