import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const saveProgress = async (uid, progressData) => {
  try {
    await setDoc(doc(db, "userProgress", uid), {
      progress: progressData,
    });
  } catch (error) {
    console.error("Помилка збереження прогресу:", error);
  }
};


export const getProgress = async (uid) => {
  try {
    const docRef = doc(db, "userProgress", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().progress : null;
  } catch (error) {
    console.error("Помилка отримання прогресу:", error);
  }
};


export const resetUserProgressFromFirestore = async (uid) => {
  try {
    await setDoc(doc(db, "userProgress", uid), { progress: {} });
    console.log("Прогрес скинуто з Firestore");
  } catch (error) {
    console.error("Помилка при скиданні прогресу:", error);
    throw error;
  }
};


export const saveUserProfile = async (uid, profileData) => {
  try {
    await setDoc(doc(db, "userProfiles", uid), profileData);
  } catch (error) {
    console.error("Помилка збереження профілю:", error);
  }
};


export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, "userProfiles", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Помилка отримання профілю:", error);
  }
};
