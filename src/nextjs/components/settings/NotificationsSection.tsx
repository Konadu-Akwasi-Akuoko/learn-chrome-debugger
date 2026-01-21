'use client';

import { useSettingsStore } from '@/stores/useSettingsStore';
import type { NotificationFrequency } from '@/types/settings';

const frequencies: { value: NotificationFrequency; label: string; description: string }[] = [
  { value: 'instant', label: 'Instant', description: 'Get notified immediately' },
  { value: 'daily', label: 'Daily Digest', description: 'Once per day summary' },
  { value: 'weekly', label: 'Weekly Digest', description: 'Once per week summary' },
];

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description: string;
}

function ToggleSwitch({ enabled, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors ${
          enabled
            ? 'border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100'
            : 'border-zinc-400 bg-zinc-200 dark:border-zinc-500 dark:bg-zinc-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full border border-zinc-300 bg-white shadow-sm transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export function NotificationsSection() {
  const notifications = useSettingsStore((state) => state.user.notifications);
  const setEmailNotifications = useSettingsStore((state) => state.setEmailNotifications);
  const setPushNotifications = useSettingsStore((state) => state.setPushNotifications);
  const setSmsNotifications = useSettingsStore((state) => state.setSmsNotifications);
  const setNotificationFrequency = useSettingsStore((state) => state.setNotificationFrequency);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Notifications
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Choose how you want to be notified
        </p>
      </div>

      <div className="space-y-6">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          <ToggleSwitch
            enabled={notifications.email}
            onChange={setPushNotifications}
            label="Email Notifications"
            description="Receive updates via email"
          />
          <ToggleSwitch
            enabled={notifications.push}
            onChange={setPushNotifications}
            label="Push Notifications"
            description="Receive browser push notifications"
          />
          <ToggleSwitch
            enabled={notifications.sms}
            onChange={setSmsNotifications}
            label="SMS Notifications"
            description="Receive text message alerts"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Notification Frequency
          </label>
          <div className="space-y-2">
            {frequencies.map((freq) => (
              <label
                key={freq.value}
                className={`flex cursor-pointer items-center rounded-lg border p-4 transition-colors ${
                  notifications.frequency === freq.value
                    ? 'border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800'
                    : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
                }`}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={freq.value}
                  checked={notifications.frequency === freq.value}
                  onChange={() => setNotificationFrequency(freq.value)}
                  className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {freq.label}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {freq.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
