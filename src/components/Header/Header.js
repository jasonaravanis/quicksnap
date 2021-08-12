import React from "react";
import { Link } from "react-router-dom";
import Add from "../../images/SVG/Add/Add";
import Eye from "../../images/SVG/Eye/Eye";
import Heart from "../../images/SVG/Heart/Heart";
import Home from "../../images/SVG/Home/Home";
import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import Profile from "../../images/SVG/Profile/Profile";
import Camera from "../../images/SVG/Camera";

function Header({ currentPage, setCurrentPage }) {
  return (
    <>
      {/* Mobile Header */}
      <nav className="flex md:hidden justify-between items-center w-full bg-white border-b border-gray-300 py-1">
        <div className="w-7 m-2">
          <Camera />
        </div>
        <h1 className="font-curly text-4xl">QuickSnap</h1>
        <div className="w-7 m-2">
          <PaperAirplane />
        </div>
      </nav>
      {/* Desktop Header */}
      <nav className="hidden md:flex justify-center w-full bg-white border-b border-gray-300 py-1">
        <div className="flex items-center justify-between w-2/3 md:max-w-4xl">
          <h1 className=" font-curly text-4xl">QuickSnap</h1>
          <form>
            <input
              className=" w-4/5 mx-3.5 border border-gray-300 rounded-sm p-1 bg-gray-50 text-center"
              type="text"
              placeholder="Search"
            />
          </form>
          <div className="flex">
            <Link to="/" onClick={() => setCurrentPage("home")}>
              <div className="w-7 m-2">
                <Home currentPage={currentPage} />
              </div>
            </Link>
            <Link
              to="/messenger"
              onClick={() => setCurrentPage("messenger")}
              data-testid="messenger-icon"
            >
              <div className="w-7 m-2">
                <PaperAirplane currentPage={currentPage} />
              </div>
            </Link>
            <Link
              to="/add"
              onClick={() => setCurrentPage("add")}
              data-testid="add-icon"
            >
              <div className="w-7 m-2">
                <Add currentPage={currentPage} />
              </div>
            </Link>
            <Link
              to="/liked"
              onClick={() => setCurrentPage("liked")}
              data-testid="heart-icon"
            >
              <div className="w-7 m-2">
                <Heart currentPage={currentPage} />
              </div>
            </Link>
            <Link
              to="/explore"
              onClick={() => setCurrentPage("explore")}
              data-testid="eye-icon"
            >
              <div className="w-7 m-2">
                <Eye currentPage={currentPage} />
              </div>
            </Link>
            <Link
              to="/explore"
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
    </>
  );
}

export default Header;