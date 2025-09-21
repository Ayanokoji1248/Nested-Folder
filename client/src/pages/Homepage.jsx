import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BACKEND_URL } from "..";
import { useNavigate } from "react-router-dom";

const Homepage = ({ currentFolderId }) => {
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Fetch folders based on currentFolderId
  async function getAllFolder() {
    try {
      const parentQuery = currentFolderId || "null";
      const response = await axios.get(
        `${BACKEND_URL}/folder?parent=${parentQuery}`
      );
      setFolders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFolder();
  }, [currentFolderId]);

  // Create folder inside current folder
  async function createFolder() {
    if (!newFolderName) return;
    try {
      const response = await axios.post(`${BACKEND_URL}/folder/create`, {
        folderName: newFolderName,
        parentFolder: currentFolderId, // important: set parentFolder
      });
      setFolders((prev) => [...prev, response.data.folder]);
      setNewFolderName("");
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Navigate into a folder
  const navigate = useNavigate();
  const enterFolder = (folderId) => {
    navigate(`/folder/${folderId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 p-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Folders</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + New Folder
        </button>
      </div>

      {/* Folder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
            onClick={() => enterFolder(folder._id)} // click to enter folder
          >
            <div className="text-6xl mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] animate-pulse">
              📁
            </div>
            <span className="text-lg font-semibold text-center truncate">
              {folder.folderName}
            </span>
          </div>
        ))}
      </div>

      {/* Modal for creating folder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-80 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Create New Folder</h2>
            <input
              type="text"
              placeholder="Folder Name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={createFolder}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
