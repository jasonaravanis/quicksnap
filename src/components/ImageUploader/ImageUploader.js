import React, { useState, useEffect } from "react";

import Exit from "../../images/SVG/Exit";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Media from "../../images/SVG/Media";

import useComponentVisible from "../../hooks/useComponentVisible/useComponentVisible";
import useIsFirstRender from "../../hooks/useIsFirstRender/useIsFirstRender";

function ImageUploader({ exit, currentPage, setCurrentPage }) {
  const isFirstRender = useIsFirstRender();
  const [returnRef] = useState(currentPage);
  const [image, setImage] = useState(null);
  const [storedImages, setStoredImages] = useState(() => {
    const localData = localStorage.getItem("images");
    return localData ? JSON.parse(localData) : [];
  });
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const handleExit = () => {
    setCurrentPage(returnRef);
    exit();
  };

  const { ref, isComponentVisible } = useComponentVisible(true, handleExit);

  useEffect(() => {
    setCurrentPage("add");
  }, []);

  const handleButtonClick = () => {
    document.querySelector("#file-input").click();
  };

  const handleImageSelection = () => {
    const chosenImage = document.querySelector("#file-input").files[0];
    setImage(chosenImage);
  };

  const handleSubmission = () => {
    setStoredImages([
      ...storedImages,
      {
        name: image.name,
        type: image.type,
        size: image.size,
      },
    ]);
    setImage(null);
    setSubmissionComplete(true);
  };

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem("images", JSON.stringify(storedImages));
    }
  }, [storedImages]);

  useEffect(() => {
    if (!isFirstRender && submissionComplete) {
      handleExit();
    }
  });

  return (
    <div ref={ref} className="w-1/2 h-1/2">
      {isComponentVisible && (
        <div
          className="bg-white border rounded-md border-gray-300 w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="relative border-b border-gray-300 flex items-center justify-center py-2">
              <span className="font-semibold text-sm">New Post</span>
              <div
                className="mx-2 w-7 absolute right-0 cursor-pointer"
                onClick={() => handleExit()}
              >
                <Exit />
              </div>
            </div>
            {!image && (
              <div className="flex flex-col h-full justify-center items-center">
                <div className="mx-2 w-20">
                  <Media />
                </div>
                <span className="mt-3 mb-2">Drag photos and videos here.</span>
                <div
                  id="file-upload-button"
                  onClick={() => handleButtonClick()}
                  data-testid="test-file-upload-button"
                >
                  <Button>Select From Computer</Button>
                </div>
              </div>
            )}
            {image && (
              <div className="flex flex-col h-full justify-center items-center">
                <div
                  className="w-1/3 flex items-center justify-center"
                  data-testid="test-image-preview"
                >
                  <img src={URL.createObjectURL(image)} alt="preview" />
                </div>
                <div className="flex">
                  <div className="m-2" onClick={() => handleButtonClick()}>
                    <ButtonSecondary>Change Image</ButtonSecondary>
                  </div>
                  <div className="m-2" onClick={() => handleSubmission()}>
                    <Button>Share</Button>
                  </div>
                </div>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              id="file-input"
              onChange={() => handleImageSelection()}
              data-testid="test-file-input"
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;