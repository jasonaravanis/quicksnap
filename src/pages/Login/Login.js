import React, { useState, useEffect } from "react";
import ImageBanner from "../../components/ImageBanner/ImageBanner";
import GlassBox from "../../components/GlassBox/GlassBox";

import google from "../../images/login-auth-icons/google.svg";
import facebook from "../../images/login-auth-icons/facebook.png";
import apple from "../../images/login-auth-icons/apple.svg";
import github from "../../images/login-auth-icons/github.png";

import { auth, firestore } from "../../firebase/firebase";
import firebase from "firebase/app";

import generateProfileImage from "../../utils/generateProfileImage/generateProfileImage";
import loadUserProfile from "./loadUserProfile/loadUserProfile";
import handleErrorCode from "./handleErrorCode";

function Login({ setUID }) {
  const [modal, setModal] = useState("login");
  const [loginPrompt, setLoginPrompt] = useState(null);
  const [signUpPrompt, setSignUpPrompt] = useState(null);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await loadUserProfile(user);
        setUID(user.uid);
      }
    });
    return () => unlisten();
  }, [setUID]);

  const handleSignIn = async (providerID) => {
    let provider;
    switch (providerID) {
      case "google":
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case "facebook":
        // provider = new firebase.auth.FacebookAuthProvider();
        alert(
          "This sign in method has not been implemented. Try to log in with Google!"
        );
        break;
      case "apple":
        // provider = new firebase.auth.OAuthProvider("apple.com");
        alert(
          "This sign in method has not been implemented. Try to log in with Google!"
        );
        break;
      case "github":
        // provider = new firebase.auth.GithubAuthProvider();
        alert(
          "This sign in method has not been implemented. Try to log in with Google!"
        );
        break;
      default:
    }
    if (provider) {
      auth.signInWithPopup(provider).catch((err) => {
        setLoginPrompt(err.message);
      });
    }
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pw = e.target[1].value;

    auth.signInWithEmailAndPassword(email, pw).catch((err) => {
      const message = handleErrorCode(err.code);
      setLoginPrompt(message);
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const fullName = e.target[1].value;
    const name = e.target[2].value;
    const pw = e.target[3].value;
    const uid = await auth
      .createUserWithEmailAndPassword(email, pw)
      .then((cred) => {
        firestore
          .collection("users")
          .doc(cred.user.uid)
          .set({
            name: String(name),
            fullName,
            followerCount: 0,
            followingCount: 0,
            followers: [cred.user.uid],
            following: [cred.user.uid],
            postCount: 0,
            profileImage: generateProfileImage(fullName),
            customProfileImage: false,
            searches: [],
          })
          .then(() => {
            return cred.user.uid;
          });
      })
      .catch((err) => {
        console.log(err);
        const message = handleErrorCode(err.code);
        setSignUpPrompt(message);
      });
    setUID(uid);
  };

  const detectFullNameValid = (e) => {
    const input = e.target;
    if (input.validity.patternMismatch) {
      input.setCustomValidity("Please enter a first and last name");
    } else {
      input.setCustomValidity("");
    }
  };

  const handleDemoAccount = () => {
    // TODO: Create demo account in firebase
    auth.signInWithEmailAndPassword("demo@demo.com", "demo123").catch((err) => {
      const message = handleErrorCode(err.code);
      setLoginPrompt(message);
    });
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="h-full grid place-items-center">
        <GlassBox>
          <div className="w-80">
            <h1 className="font-curly text-6xl m-4 text-center">QuickSnap</h1>
            {modal === "login" && (
              <form
                id="login-form"
                className="flex items-center flex-col"
                onSubmit={(e) => handleEmailSignIn(e)}
              >
                <input
                  className=" w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                  placeholder="Email"
                  required
                />
                <input
                  className="w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                  type="password"
                  placeholder="Password"
                  required
                />
                <input
                  value="Log In"
                  type="submit"
                  className="bg-blue-500 my-3 p-1 w-full border-0 rounded-sm text-white hover:shadow-inner hover:bg-blue-400 cursor-pointer"
                />
                {loginPrompt && (
                  <span className="text-xs text-center m-2 text-red-500">
                    {loginPrompt}
                  </span>
                )}
                <div className="flex m-1 w-full items-center">
                  <div className="w-full h-px bg-gray-400"></div>
                  <span className="whitespace-nowrap mx-4 text-gray-400 font-semibold">
                    {" "}
                    OR{" "}
                  </span>
                  <div className="w-full h-px bg-gray-400"></div>
                </div>
                <div className="mx-1 w-full flex">
                  <div
                    className="auth-button bg-white border-gray-200"
                    onClick={() => handleSignIn("google")}
                  >
                    <img className="m-1 h-7" src={google} alt="Google logo" />
                  </div>
                  <div
                    className="auth-button bg-blue-600 border-blue-600 hover:bg-blue-500"
                    onClick={() => handleSignIn("facebook")}
                  >
                    <img
                      className="m-1 h-7"
                      src={facebook}
                      alt="Facebook logo"
                    />
                  </div>
                  <div
                    className="auth-button bg-black border-black hover:bg-gray-800"
                    onClick={() => handleSignIn("apple")}
                  >
                    <img className="m-1 h-7" src={apple} alt="Apple logo" />
                  </div>
                  <div
                    className="auth-button bg-white border-gray-200"
                    onClick={() => handleSignIn("github")}
                  >
                    <img className="m-1 h-7" src={github} alt="GitHub logo" />
                  </div>
                </div>
                <div className="w-full my-3 h-px bg-gray-400"></div>
                <div className="my-1">
                  <span>Don't have an account? </span>
                  <span
                    className=" text-blue-500 font-semibold cursor-pointer"
                    onClick={() => setModal("signup")}
                  >
                    Sign up
                  </span>
                </div>

                <span
                  className=" text-gray-400 cursor-pointer text-xs mt-1"
                  onClick={() => handleDemoAccount()}
                >
                  Try a demo account
                </span>
              </form>
            )}
            {modal === "signup" && (
              <form
                id="signup-form"
                className="flex items-center flex-col"
                onSubmit={(e) => handleSignUp(e)}
              >
                <input
                  className=" w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  className=" w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                  type="text"
                  placeholder="Full Name"
                  required
                  pattern="\w+\s\w+"
                  onChange={(e) => detectFullNameValid(e)}
                />
                <input
                  className=" w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                  type="text"
                  placeholder="Username"
                  required
                />
                <input
                  className="w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                  type="password"
                  placeholder="Password"
                  required
                />
                <input
                  value="Sign Up"
                  type="submit"
                  className="bg-blue-500 my-3 p-1 w-full border-0 rounded-sm text-white hover:shadow-inner hover:bg-blue-400 cursor-pointer"
                />
                {signUpPrompt && (
                  <span className="text-xs text-center m-2 text-red-500">
                    {signUpPrompt}
                  </span>
                )}
                <div className="w-full my-3 h-px bg-gray-400"></div>
                <div className="my-1">
                  <span>Already have an account?</span>
                  <span
                    className=" text-blue-500 font-semibold cursor-pointer"
                    onClick={() => setModal("login")}
                  >
                    {" "}
                    Log in
                  </span>
                </div>
              </form>
            )}
          </div>
        </GlassBox>
        <ImageBanner />
      </div>
    </div>
  );
}

export default Login;
