import React from 'react';
import { Copyright } from 'lucide-react';

interface CopyrightPageProps {
  isDarkMode: boolean;
}

export default function CopyrightPage({ isDarkMode }: CopyrightPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-12">
          <Copyright className="h-8 w-8 text-[#1875c7] mr-3" />
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Copyright Policy
          </h1>
        </div>

        <div className={`max-w-3xl space-y-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Copyright Protection
            </h2>
            <p className="mb-4">
              All content on Fictoria is protected by copyright laws. Users must respect intellectual property rights and only upload content they own or have permission to use.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              DMCA Compliance
            </h2>
            <p className="mb-4">
              We comply with the Digital Millennium Copyright Act (DMCA) and respond to notices of alleged copyright infringement. If you believe your work has been copied in a way that constitutes copyright infringement, please provide us with the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Description of the copyrighted work</li>
              <li>Location of the infringing material on our site</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief</li>
              <li>A statement of accuracy under penalty of perjury</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Content Removal
            </h2>
            <p className="mb-4">
              Upon receiving a valid DMCA notice, we will:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remove or disable access to the infringing material</li>
              <li>Notify the content provider of the removal</li>
              <li>Provide information about filing a counter-notice</li>
              <li>Take appropriate action for repeat infringers</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Fair Use
            </h2>
            <p>
              We respect fair use principles as established by copyright law. This includes use of copyrighted material for purposes such as criticism, commentary, news reporting, teaching, scholarship, or research.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}