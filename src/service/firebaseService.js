// // src/services/firebaseService.js (Example structure)
// import firestore from "@react-native-firebase/firestore";
// import storage from "@react-native-firebase/storage";
// import auth from "@react-native-firebase/auth"; // If you installed it

// // --- Firestore Examples ---
// export const getNewsArticles = async () => {
//   try {
//     const snapshot = await firestore()
//       .collection("newsArticles")
//       .orderBy("publishedAt", "desc")
//       .get();
//     if (snapshot.empty) {
//       console.log("No matching documents.");
//       return [];
//     }
//     const articles = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return articles;
//   } catch (error) {
//     console.error("Error fetching news articles: ", error);
//     throw error; // Or handle it more gracefully
//   }
// };

// export const addNewsArticle = async (articleData) => {
//   try {
//     const docRef = await firestore()
//       .collection("newsArticles")
//       .add({
//         ...articleData,
//         publishedAt: firestore.FieldValue.serverTimestamp(), // Use server timestamp
//       });
//     console.log("Document written with ID: ", docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding document: ", error);
//     throw error;
//   }
// };

// // --- Storage Examples ---
// // `uri` should be a local file path (e.g., from an image picker)
// // `firebasePath` is the desired path in Firebase Storage (e.g., 'images/news/article_image.jpg')
// export const uploadImage = async (uri, firebasePath) => {
//   if (!uri) {
//     throw new Error("No image URI provided for upload.");
//   }
//   try {
//     const reference = storage().ref(firebasePath);
//     // For files from react-native-image-picker, uri might already be 'file://...'
//     // Ensure the path is correct and accessible
//     await reference.putFile(uri);
//     const downloadURL = await reference.getDownloadURL();
//     console.log("File uploaded successfully! Download URL:", downloadURL);
//     return downloadURL;
//   } catch (error) {
//     console.error("Error uploading image: ", error);
//     throw error;
//   }
// };

// // --- Authentication Example (Sign in Anonymously) ---
// export const signInAnonymously = async () => {
//   try {
//     const userCredential = await auth().signInAnonymously();
//     console.log("User signed in anonymously:", userCredential.user.uid);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Anonymous sign-in error:", error);
//     throw error;
//   }
// };

// // You can then import these functions in your components:
// // import { getNewsArticles, uploadImage } from './services/firebaseService';
