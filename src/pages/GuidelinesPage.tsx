import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface GuidelinesPageProps {
  isDarkMode: boolean;
}

export default function GuidelinesPage({ isDarkMode }: GuidelinesPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className={`text-4xl font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Community Guidelines
        </h1>

        <div className={`space-y-8 max-w-3xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Fair Use Policy
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Only post content that you own or have explicit permission to share</li>
              <li>Credit original creators when sharing collaborative works</li>
              <li>Do not post copyrighted material without proper authorization</li>
              <li>Respect intellectual property rights of other creators</li>
              <li>Transformative works must be substantially different from the original</li>
            </ul>
          </section>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'} flex items-start space-x-3`}>
            <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                Strict No AI Art Policy
              </h3>
              <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
                The use of AI-generated art is strictly prohibited on our platform. This includes:
              </p>
              <ul className={`list-disc pl-6 mt-2 space-y-1 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                <li>Images created by AI art generators</li>
                <li>AI-assisted artwork without substantial human input</li>
                <li>AI-modified or enhanced existing artwork</li>
                <li>Hybrid works combining AI and traditional methods</li>
              </ul>
            </div>
          </div>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Original Content Only
            </h2>
            <div className="space-y-3">
              <p>All submissions must be your original work. This means:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Content must be created entirely by you</li>
                <li>Collaborative works must clearly credit all contributors</li>
                <li>No reposts from other platforms without proof of ownership</li>
                <li>No traced or heavily referenced works without proper attribution</li>
                <li>Each submission must include a declaration of originality</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Consequences of Violation
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>First violation: Warning and content removal</li>
              <li>Second violation: Temporary account suspension (7 days)</li>
              <li>Third violation: Extended account suspension (30 days)</li>
              <li>Further violations: Permanent account termination</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}