'use client';

import { useState } from 'react';
import { useSettingsStore } from '@/stores/useSettingsStore';

const avatarOptions = [
  '/avatars/default.png',
  '/avatars/avatar-1.png',
  '/avatars/avatar-2.png',
  '/avatars/avatar-3.png',
];

export function ProfileSection() {
  const profile = useSettingsStore((state) => state.user.profile);
  const setName = useSettingsStore((state) => state.setName);
  const setEmail = useSettingsStore((state) => state.setEmail);
  const setAvatar = useSettingsStore((state) => state.setAvatar);

  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNameChange = (value: string) => {
    if (value.length < 2) {
      setValidationErrors((prev) => ({
        ...prev,
        name: 'Name must be at least 2 characters',
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, name: undefined }));
    }
    setEmail(value);
  };

  const handleEmailChange = (value: string) => {
    if (!validateEmail(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, email: undefined }));
    }
    setEmail(value);
  };

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Profile Information
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Update your personal details
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Avatar
          </label>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-2xl font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                {avatarOptions.map((avatar, index) => (
                  <button
                    key={avatar}
                    onClick={() => setAvatar(avatar)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                      profile.avatar === avatar
                        ? 'border-2 border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                        : 'border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={profile.name}
            onChange={(e) => handleNameChange(e.target.value)}
            disabled={!isEditing}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              validationErrors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700'
            } bg-white text-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-500`}
          />
          {validationErrors.name && (
            <p className="mt-1 text-xs text-red-500">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            disabled={!isEditing}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              validationErrors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700'
            } bg-white text-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-500`}
          />
          {validationErrors.email && (
            <p className="mt-1 text-xs text-red-500">{validationErrors.email}</p>
          )}
        </div>
      </div>
    </section>
  );
}
