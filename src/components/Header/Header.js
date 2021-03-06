import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalBackground from "../ModalBackground";
import Add from "../../images/SVG/Add/Add";
import Home from "../../images/SVG/Home/Home";
import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import Profile from "../../images/SVG/Profile/Profile";
import ImageUploader from "../ImageUploader/ImageUploader";
import Search from "./Search/Search";
import { AnimatePresence } from "framer-motion";

function Header({ currentPage, setCurrentPage }) {
  const [uploadModal, setUploadModal] = useState(false);

  return (
    <>
      <nav className="hidden md:flex justify-center w-full bg-white border-b border-gray-300 py-1">
        <div className="relative flex items-center justify-between w-2/3 md:max-w-4xl">
          <Link to="/" onClick={() => setCurrentPage("home")}>
            <h1 className=" font-curly text-4xl">QuickSnap</h1>
          </Link>
          <Search setCurrentPage={setCurrentPage} />
          <div className="flex">
            <Link to="/" onClick={() => setCurrentPage("home")}>
              <div className="w-7 m-2">
                <Home currentPage={currentPage} />
              </div>
            </Link>
            <Link
              to="/messenger/main"
              onClick={() => setCurrentPage("messenger")}
              data-testid="messenger-icon"
            >
              <div className="w-7 m-2">
                <PaperAirplane currentPage={currentPage} />
              </div>
            </Link>
            <div
              className="w-7 m-2 cursor-pointer"
              data-testid="add-icon"
              onClick={() => setUploadModal(true)}
            >
              <Add currentPage={currentPage} />
            </div>
            <Link
              to="/user"
              onClick={() => setCurrentPage("profile")}
              data-testid="profile-icon"
            >
              <div className="w-7 m-2">
                <Profile currentPage={currentPage} />
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {uploadModal && (
          <ModalBackground exit={() => setUploadModal(false)}>
            <ImageUploader
              exit={() => setUploadModal(false)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </ModalBackground>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
