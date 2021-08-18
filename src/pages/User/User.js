import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import getLikedPosts from "./getLikedPosts/getLikedPosts";
import getUserPosts from "./getUserPosts/getUserPosts";

function User() {
  const { name, displayImage, postCount, followerCount, followingCount } =
    useContext(UserContext);
  const [userPosts, setUserPosts] = useState(getUserPosts());
  const [likedPosts, setLikedPosts] = useState(getLikedPosts());
  const [grid, setGrid] = useState("posts");
  return (
    <div className="flex flex-col h-full">
      {/* Top Section */}
      <div className="grid grid-cols-3 grid-rows-1 my-6 justify-items-center items-center">
        {/* Profile Image */}
        <div className=" h-36 w-36 border rounded-full overflow-hidden col-start-1 col-span-1">
          <img src={displayImage} alt="chosen display for current user" />
        </div>
        {/* User Information */}
        <div className="col-start-2 col-span-2">
          {/* Container for user name, edit profile and log out buttons */}
          <div className="flex items-center">
            <span className="font-roboto text-3xl font-light mr-6">{name}</span>
            <button className="border border-gray-300 rounded-md py-1 px-2 m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner">
              Edit Profile
            </button>
            <button className="border border-gray-300 rounded-md py-1 px-2 m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner">
              Log Out
            </button>
          </div>
          {/* Container for counts of posts, followers, and following */}
          <div className="mt-6">
            <span className="mr-4" data-testid="test-posts">
              <span className="font-semibold">{postCount}</span> posts
            </span>
            <span className="mr-4" data-testid="test-followers">
              <span className="font-semibold">{followerCount}</span> followers
            </span>
            <span className="mr-4" data-testid="test-following">
              <span className="font-semibold">{followingCount}</span> following
            </span>
          </div>
        </div>
      </div>
      {/* Subsection selector */}
      <div className="border-t border-gray-300 grid place-items-center">
        <div className=" flex justify-between items-center w-1/3 font-roboto text-sm">
          <div
            className={`p-3 cursor-pointer ${
              grid === "posts"
                ? "text-black border-t border-black relative -top-px"
                : "text-gray-400"
            }`}
            onClick={() => setGrid("posts")}
            data-testid="test-show-posts-button"
          >
            <span>POSTS</span>
          </div>
          <div
            className={`p-3 cursor-pointer ${
              grid === "liked"
                ? "text-black border-t border-black relative -top-px"
                : "text-gray-400"
            }`}
            onClick={() => setGrid("liked")}
            data-testid="test-show-liked-button"
          >
            <span>LIKED</span>
          </div>
        </div>
      </div>
      {/* Image Grid Container */}
      <div className="flex-grow">
        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-6 auto-rows-auto">
          {grid === "posts" &&
            userPosts &&
            userPosts.map((image) => {
              return (
                <div
                  className="inline-block relative overflow-hidden"
                  key={image.id}
                  data-testid={image.id}
                >
                  {/* TODO: Remove comment below */}
                  {/* To handle non-square images: https://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout */}
                  <div style={{ marginTop: "100%" }}></div>
                  <img
                    src={image.file}
                    className="absolute top-0 left-0 right-0 bottom-0"
                    alt="one of the current user posts"
                  />
                </div>
              );
            })}
          {grid === "liked" &&
            likedPosts &&
            likedPosts.map((image) => {
              return (
                <div
                  className="inline-block relative overflow-hidden"
                  key={image.id}
                  data-testid={image.id}
                >
                  {/* TODO: Remove comment below */}
                  {/* To handle non-square images: https://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout */}
                  <div style={{ marginTop: "100%" }}></div>
                  <img
                    src={image.file}
                    className="absolute top-0 left-0 right-0 bottom-0"
                    alt="one of the current user posts"
                  />
                </div>
              );
            })}
        </div>
      </div>

      <footer>FOOTER</footer>
    </div>
  );
}

export default User;