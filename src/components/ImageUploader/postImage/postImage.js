import { storage, firestore, timestamp } from "../../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export default async function postImage(user, image) {
  try {
    const nameOld = image.name;
    const suffix = nameOld.match(/\.[0-9a-z]+$/i)[0];
    const nameNew = `${uuidv4()}${suffix}`;

    const storageRef = storage.ref().child(`${user.uid}/posts/${nameNew}`);
    await storageRef.put(image);
    const imageURL = await storageRef.getDownloadURL();

    await firestore.collection("posts").add({
      author: {
        name: user.name,
        profileImage: user.profileImage,
        id: user.uid,
      },
      timestamp: timestamp(),
      image: imageURL,
      likeCount: 0,
      comments: [],
      likedBy: [],
      fileName: nameNew,
    });
    // Firebase takes a few moments to add the new post to the feed of the user,
    // so adding a bit of a delay here to hide that lag
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve("success");
      }, 2000)
    );
  } catch (err) {
    console.log(err);
    return "failure";
  }
}
