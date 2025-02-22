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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Consistent with App.tsx */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Uni Hall Events
            </h1>
            {/* Navigation links */}
            <nav className="flex gap-6">
              <a
                href="/"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                Events
              </a>
              <a
                href="/welfare"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                Welfare
              </a>
            </nav>
          </div>
          
          {/* User section */}
          <div className="flex items-center gap-4">
            <span className="text-white">
              Welcome, <span className="font-medium">{user.name}</span>
            </span>
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                       transition-colors duration-200 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Your Profile
            </h2>
            <p className="text-gray-600">Manage your events and activities</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 font-bold text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              <div>
                <label className="text-sm text-gray-500">User ID</label>
                <p className="font-medium text-gray-900">{user.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Sections */}
        <div className="space-y-12">
          {/* Upcoming Events */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 
                            overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>Date: {event.date}</p>
                      <p>Location: {event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Past Events */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 
                            overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>Date: {event.date}</p>
                      <p>Location: {event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Uni Hall Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;