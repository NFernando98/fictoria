import React from 'react';

interface CreateLightNovelPageProps {
  isDarkMode: boolean;
}

function CreateLightNovelPage({ isDarkMode }: CreateLightNovelPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b] text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium mb-8">Create Light Novel</h1>
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
                placeholder="Enter light novel title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Synopsis</label>
              <textarea
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Enter light novel synopsis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700' 
                  : 'border-gray-300 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#1875c7] text-white rounded-lg hover:bg-[#145fa3]"
                >
                  Upload Cover
                </label>
                <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 5MB</p>
              </div>
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
                <option value="action">Action</option>
                <option value="drama">Drama</option>
              </select>
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
                placeholder="Enter tags separated by commas"
              />
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
                placeholder="Write your light novel content here..."
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

export default CreateLightNovelPage;