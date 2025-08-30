"use client";

import { useState, useEffect } from "react";
import { User } from "@/app/lib/data";

// We need a version of the User type without the password
type SafeUser = Omit<User, "password">;

export default function UsersPage() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users. Are you an admin?");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    try {
        const res = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to update role');
        }

        // Update the user's role in the local state
        setUsers(users.map(user =>
            user.id === userId ? { ...user, role: newRole } : user
        ));
        alert('Role updated successfully!');
    } catch (err) {
        alert(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.provider}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {user.provider === 'credentials' ? (
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'user')}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span>{user.role}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
