import React from 'react';
import { Heart } from 'lucide-react';

interface AboutPageProps {
  isDarkMode: boolean;
}

export default function AboutPage({ isDarkMode }: AboutPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className={`text-4xl font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          About Fictoria
        </h1>

        <div className={`max-w-3xl space-y-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Mission
            </h2>
            <p className="mb-4">
              Fictoria was created with a singular vision: to provide artists, writers, and creators with a platform that truly understands and serves their needs. We believe that creativity thrives when given the right environment, tools, and community support.
            </p>
            <p>
              Our platform is designed to break down the barriers between creators and their audience, offering a seamless experience for sharing manga, manhwa, novels, light novels, and artwork. We're committed to fostering a supportive community where creativity can flourish and artists can receive the recognition they deserve.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Coming Soon
            </h2>
            <div className="grid gap-6">
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Enhanced Features
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Advanced creator analytics and insights</li>
                  <li>Collaborative tools for team projects</li>
                  <li>Improved content discovery algorithms</li>
                  <li>Custom reader themes and preferences</li>
                  <li>Enhanced mobile reading experience</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Content Expansion
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Partnership with popular manga and manhwa publishers</li>
                  <li>Integration of manhua content</li>
                  <li>Exclusive original series</li>
                  <li>Professional translation services</li>
                  <li>Cross-cultural collaboration projects</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Community Features
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creator mentorship programs</li>
                  <li>Virtual events and workshops</li>
                  <li>Community challenges and competitions</li>
                  <li>Enhanced social features</li>
                  <li>Creator merchandise support</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Support Fictoria
            </h2>
            <p className="mb-6">
              Fictoria is made possible by the support of our amazing community. Your contributions help us maintain and improve the platform, develop new features, and support creators.
            </p>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className={`text-xl font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Support Our Mission
              </h3>
              <p className="mb-6">
                Help us build the future of digital storytelling and art sharing.
              </p>
              <a 
                href="https://support.fictoria.com/donate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#1875c7] text-white rounded-lg hover:bg-[#145fa3] transition-colors"
              >
                Make a Donation
              </a>
            </div>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Thank You
            </h2>
            <p>
              We want to express our deepest gratitude to our community of creators and readers. Your passion, creativity, and support drive us to make Fictoria better every day. Together, we're building more than just a platform - we're creating a home for storytellers and artists around the world.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}