import React from 'react';
import { Lock } from 'lucide-react';

interface PrivacyPageProps {
  isDarkMode: boolean;
}

export default function PrivacyPage({ isDarkMode }: PrivacyPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-12">
          <Lock className="h-8 w-8 text-[#1875c7] mr-3" />
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Privacy Policy
          </h1>
        </div>

        <div className={`max-w-3xl space-y-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (username, email)</li>
              <li>Content you create and upload</li>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To detect and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}