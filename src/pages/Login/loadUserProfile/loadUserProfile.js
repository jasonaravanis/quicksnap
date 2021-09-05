import { firestore } from "../../../firebase/firebase";
import generateProfileImage from "../../../utils/generateProfileImage/generateProfileImage";

async function loadUserProfile(user) {
  try {
    const docRef = firestore.collection("users").doc(user.uid);
    const doc = await docRef.get();
    if (doc.exists) {
      return;
    } else {
      return await docRef.set({
        customProfileImage: false,
        fullName: user.displayName,
        followers: [],
        following: [],
        followerCount: 0,
        followingCount: 0,
        postCount: 0,
        profileImage: generateProfileImage(user.displayName),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default loadUserProfile;