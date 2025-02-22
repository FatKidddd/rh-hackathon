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
  // Mock user - in a real app, you'd retrieve this from context or props
  const [user] = useState<User>({
    id: "user_54321",
    name: "Jane Doe",
    email: "jane.doe@example.com",
  });

  // Mock upcoming events the user signed up for
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

  // Mock past events the user participated in
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

  // Optional: On component mount, call your RPC or API to fetch user info & events
  useEffect(() => {
    // Example:
    // fetchUserData(user.id).then(data => setUser(data))
    // fetchUserEvents(user.id).then(events => { setUpcomingEvents(...); setPastEvents(...); })
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">User Profile</h1>
          {/* Link back to the landing page or logout - up to you */}
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

        {/* Upcoming Events */}
        <section className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded p-4">
                  <h3 className="font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600">Date: {event.date}</p>
                  <p className="text-sm text-gray-600">Location: {event.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming events found.</p>
          )}
        </section>

        {/* Past Events */}
        <section className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Past Events</h2>
          {pastEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {pastEvents.map((event) => (
                <div key={event.id} className="border rounded p-4">
                  <h3 className="font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600">Date: {event.date}</p>
                  <p className="text-sm text-gray-600">Location: {event.location}</p>
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
