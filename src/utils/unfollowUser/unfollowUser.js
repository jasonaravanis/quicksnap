import { firestore, FieldValue } from "../../firebase/firebase";

// TODO: Consider replacing the follower update below with a cloud function that is triggered when a users following array is updated
// this might be better for security, as it would be difficult to control user access to edit the followers of other users via security rules

const unfollowUser = async (userID, followerID) => {
  const userRef = firestore.collection("users").doc(userID);
  const targetRef = firestore.collection("users").doc(followerID);
  const promises = [];
  const followingUpdate = userRef.update({
    following: FieldValue.arrayRemove(followerID),
  });
  promises.push(followingUpdate);
  const followersUpdate = targetRef.update({
    followers: FieldValue.arrayRemove(userID),
  });
  promises.push(followersUpdate);
  await Promise.all(promises);
};

export default unfollowUser;