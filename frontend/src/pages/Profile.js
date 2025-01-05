import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    preferences: user.preferences || {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled
          />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.preferences.emailNotifications}
                onChange={(e) => setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences,
                    emailNotifications: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Email notifications
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;