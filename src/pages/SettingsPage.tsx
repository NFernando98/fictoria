import React, { useState } from 'react';
import { Lock, Mail, AlertTriangle, Check } from 'lucide-react';
import { auth, updateUserEmail, updateUserPassword, sendEmailVerification } from '../lib/firebase';

interface SettingsPageProps {
  isDarkMode: boolean;
}

export default function SettingsPage({ isDarkMode }: SettingsPageProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = auth.currentUser;

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        throw new Error('Please fill in all password fields');
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error('New passwords do not match');
      }

      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }

      await updateUserPassword(currentPassword, newPassword);
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!newEmail) {
        throw new Error('Please enter a new email address');
      }

      await updateUserEmail(newEmail);
      setSuccess('Email updated successfully');
      setNewEmail('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await sendEmailVerification();
      setSuccess('Verification email sent. Please check your inbox.');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Please sign in to access settings
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Account Settings
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 text-green-500 rounded-lg flex items-center gap-2">
              <Check className="h-5 w-5" />
              {success}
            </div>
          )}

          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-[#1875c7]" />
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Change Password
                </h2>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-[#1875c7] text-white py-2 rounded-lg transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#145fa3]'
                  }`}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-6 w-6 text-[#1875c7]" />
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Email Settings
                </h2>
              </div>

              <div className="mb-6">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Current email: {user.email}
                </p>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Status: {user.emailVerified ? (
                    <span className="text-green-500">Verified</span>
                  ) : (
                    <span className="text-yellow-500">Not verified</span>
                  )}
                </p>
              </div>

              {!user.emailVerified && (
                <button
                  onClick={handleVerifyEmail}
                  disabled={isLoading}
                  className={`w-full mb-6 bg-yellow-500 text-white py-2 rounded-lg transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Verify Email'}
                </button>
              )}

              <form onSubmit={handleUpdateEmail} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    New Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-[#1875c7] text-white py-2 rounded-lg transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#145fa3]'
                  }`}
                >
                  {isLoading ? 'Updating...' : 'Update Email'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}