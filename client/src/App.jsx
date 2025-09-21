import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Homepage from "./pages/Homepage";

const FolderPage = () => {
  const { folderId } = useParams();
  return <Homepage currentFolderId={folderId || null} />;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage currentFolderId={null} />} />
        <Route path="/folder/:folderId" element={<FolderPage />} />
      </Routes>
    </>
  );
};

export default App;
