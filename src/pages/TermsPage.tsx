import React from 'react';
import { Shield } from 'lucide-react';

interface TermsPageProps {
  isDarkMode: boolean;
}

export default function TermsPage({ isDarkMode }: TermsPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-12">
          <Shield className="h-8 w-8 text-[#1875c7] mr-3" />
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Terms of Service
          </h1>
        </div>

        <div className={`max-w-3xl space-y-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using Fictoria, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              2. User Accounts
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 13 years old to create an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              3. Content Guidelines
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All content must be original or properly licensed</li>
              <li>No explicit or adult content is allowed</li>
              <li>No hate speech or discriminatory content</li>
              <li>No spam or unauthorized advertising</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              4. Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}