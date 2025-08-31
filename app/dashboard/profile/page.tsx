"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (user?.provider !== "credentials") {
      setMessage("Cannot update profile for Google users.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          firstName,
          lastName,
        }),
      });

      if (res.ok) {
        setMessage("Profile updated successfully!");
        // Update the session to reflect the name change
        await update({
          ...session,
          user: {
            ...session?.user,
            name: `${firstName} ${lastName}`,
          },
        });
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
      console.error("Error updating profile:", error);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Provider:</strong> {user?.provider}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={user?.provider === 'google'}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={user?.provider === 'google'}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
            />
          </div>
          {user?.provider === 'credentials' && (
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Profile
              </button>
            </div>
          )}
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
        {user?.provider === 'google' && (
            <p className="mt-4 text-center text-sm text-gray-500">
                Profile editing is disabled for users who signed in with Google.
            </p>
        )}
      </div>
    </div>
  );
}
