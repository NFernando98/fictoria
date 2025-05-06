import React from 'react';

interface CreateNovelPageProps {
  isDarkMode: boolean;
}

function CreateNovelPage({ isDarkMode }: CreateNovelPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b] text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium mb-8">Create Novel</h1>
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Enter novel title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Enter novel description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Genre</label>
              <select
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
              >
                <option value="">Select genre</option>
                <option value="fantasy">Fantasy</option>
                <option value="scifi">Science Fiction</option>
                <option value="romance">Romance</option>
                <option value="mystery">Mystery</option>
                <option value="horror">Horror</option>
                <option value="thriller">Thriller</option>
                <option value="historical">Historical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                rows={12}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Write your novel content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Enter tags (comma separated)"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className={`px-6 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#1875c7] text-white rounded-lg hover:bg-[#145fa3]"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNovelPage;