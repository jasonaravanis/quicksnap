import React, { useState, useContext } from "react";
import { UserContext } from "../../pages/Main";
import submitComment from "../../utils/submitComment/submitComment";
import updatePost from "../../utils/updatePost/updatePost";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";
import useGetPostHeartStatus from "../../hooks/useGetPostHeartStatus/useGetPostHeartStatus";
import likePost from "../../utils/likePost/likePost";
import unlikePost from "../../utils/unlikePost/unlikePost";
import getLikedByInfo from "../../utils/getLikedByInfo/getLikedByInfo";
import ModalBackground from "../ModalBackground";
import ThreeDots from "../../images/SVG/ThreeDots";
import Heart from "../../images/SVG/Heart/Heart";
import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import Bookmark from "../../images/SVG/Bookmark/Bookmark";
import ChevronLeft from "../../images/SVG/ChevronLeft";
import LikedByModal from "../LikedByModal/LikedByModal";
import useGetPostSaveStatus from "../../hooks/useGetPostSaveStatus/useGetPostSaveStatus";
import unsavePost from "../../utils/unsavePost/unsavePost";
import savePost from "../../utils/savePost/savePost";
import useComponentVisible from "../../hooks/useComponentVisible/useComponentVisible";
import useDeletePost from "../../hooks/useDeletePost/useDeletePost";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function ImageModal({ post, setActivePost, setCurrentPage }) {
  const { width } = useWindowSize();
  const [postInfo, setPostInfo] = useState(post);
  const { id, likeCount } = postInfo;
  const { uid, name } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [likeCountDisplay, setLikeCountDisplay] = useState(likeCount);
  const liked = useGetPostHeartStatus(uid, id);
  const saved = useGetPostSaveStatus(uid, id);
  const [showLikedByModal, setShowLikedByModal] = useState(false);
  const [likedByInfo, setLikedByInfo] = useState(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { deleteStatus, setCommenceDeletion } = useDeletePost(id);

  const handleLikeChange = async (e) => {
    e.preventDefault();
    if (liked) {
      await unlikePost(uid, id);
      setLikeCountDisplay(likeCountDisplay - 1);
    } else {
      await likePost(uid, id);
      setLikeCountDisplay(likeCountDisplay + 1);
    }
  };

  const handleSaveChange = async (e) => {
    e.preventDefault();
    if (saved) {
      await unsavePost(uid, id);
    } else {
      await savePost(uid, id);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (commentInput !== "") {
      await submitComment(id, uid, name, commentInput);
      const post = await updatePost(id);
      setPostInfo(post);
      setCommentInput("");
    }
    document.getElementById("comment-form").reset();
  };

  const exit = () => {
    setActivePost(null);
  };

  const handleShowLikedByModal = async () => {
    const info = await getLikedByInfo(id);
    setLikedByInfo(info);
    setShowLikedByModal(true);
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    setCommenceDeletion(true);
    // await deletePost(post.id);
  };

  if (!deleteStatus) {
    return (
      <>
        <ModalBackground onClick={exit}>
          <div
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={
              width >= 768
                ? "w-2/3 max-w-4xl"
                : "bg-white absolute top-0 w-full h-full flex flex-col"
            }
          >
            {width < 768 && (
              <div className="relative border-b border-gray-300 flex items-center justify-center py-2">
                <div
                  className="absolute left-0 mx-2 w-7"
                  onClick={() => exit()}
                >
                  <ChevronLeft />
                </div>
                <div className="m-1 flex items-center">
                  <img
                    className="w-8 h-8 md:border rounded-full"
                    src={post.author.profileImage}
                    alt="Author profile"
                  />
                  <span className="mx-3">{post.author.name}</span>
                </div>
              </div>
            )}
            <div
              className={
                width > 768
                  ? "grid grid-cols-3 grid-rows-1"
                  : "flex flex-col text-sm h-full flex-grow"
              }
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="col-start-1 col-span-2 min-w-full"
                style={{ maxHeight: "80vh" }}
                data-testid="test-image-modal-desktop"
                src={post.image}
                alt="Full size view of clicked thumbnail"
              />
              <div className="flex flex-col text-sm flex-grow">
                <div className="flex justify-between bg-white h-12 items-center">
                  <div className="mx-3 flex items-center">
                    <img
                      className="w-8 h-8 md:border rounded-full"
                      src={post.author.profileImage}
                      alt="Author profile"
                    />
                    <span className="mx-3">{post.author.name}</span>
                  </div>
                  <div
                    className="w-7 m-2 relative cursor-pointer"
                    ref={ref}
                    onClick={() => setIsComponentVisible(true)}
                  >
                    {post.author.id === uid && <ThreeDots />}
                    {isComponentVisible && (
                      <div className="absolute -left-20 bg-white border border-gray-300 rounded-md w-28 flex flex-col items-center">
                        <button
                          className="text-red-500 py-3 hover:bg-gray-300 w-full"
                          onClick={(e) => handleDeletePost(e)}
                        >
                          Delete Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col bg-white text-gray-700 h-full flex-grow">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div
                        className="w-8 m-2 cursor-pointer"
                        onClick={(e) => handleLikeChange(e)}
                      >
                        <Heart liked={liked} />
                      </div>
                      {uid !== postInfo.author.id && (
                        <Link
                          className="w-8 m-2"
                          to={`/messenger/${postInfo.author.id}`}
                          onClick={() => setCurrentPage("messenger")}
                        >
                          <PaperAirplane />
                        </Link>
                      )}
                    </div>
                    <div
                      className="w-8 m-2 cursor-pointer"
                      onClick={(e) => handleSaveChange(e)}
                    >
                      <Bookmark saved={saved} />
                    </div>
                  </div>
                  <div onClick={handleShowLikedByModal}>
                    {likeCountDisplay === 1 && (
                      <span className="mx-3 my-1">
                        Liked by{" "}
                        <span className="font-bold cursor-pointer">
                          {likeCountDisplay} user
                        </span>
                      </span>
                    )}
                    {likeCountDisplay > 1 && (
                      <span className="mx-3 my-1">
                        Liked by{" "}
                        <span className="font-bold cursor-pointer">
                          {likeCountDisplay} users
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="mx-3 mt-1 mb-3 flex-grow h-full overflow-y-scroll">
                    {postInfo.comments.map((comment) => (
                      <div key={comment.id}>
                        <span className="font-bold">{comment.author.name}</span>
                        <span> {comment.content}</span>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex p-1 border-t border-gray-200"
                    onSubmit={(e) => handleSubmitComment(e)}
                    id="comment-form"
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full p-2  focus:outline-none focus:ring-1 focus:border-blue-300 border-0 rounded-md"
                      value={commentInput}
                      onChange={(e) => {
                        setCommentInput(e.target.value);
                      }}
                    />
                    <button
                      className="mx-3 text-blue-500 font-semibold cursor-pointer"
                      type="submit"
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ModalBackground>
        <AnimatePresence>
          {showLikedByModal && (
            <LikedByModal
              exit={() => setShowLikedByModal(false)}
              width={width}
              likedByInfo={likedByInfo}
            />
          )}
        </AnimatePresence>
      </>
    );
  } else {
    return <div></div>;
  }
}

export default ImageModal;
