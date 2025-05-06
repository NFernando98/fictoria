import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification as sendVerification
} from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const signUp = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send verification email immediately after signup
    await sendVerification(user);
    
    // Create user document in Firestore
    await createUserDocument(user.uid, {
      email,
      username,
      bio: '',
      avatarUrl: '',
      bannerColor: '#1875c7',
      socialLinks: [],
      followersCount: 0,
      followingCount: 0,
      friendsCount: 0,
      createdAt: new Date().toISOString(),
      bookmarkFolders: []
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createUserDocument = async (userId: string, userData: any) => {
  try {
    // Create the main user document
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData);

    // Create initial bookmark folder to initialize the subcollection
    const initialFolderRef = doc(collection(db, `users/${userId}/bookmarkFolders`));
    await setDoc(initialFolderRef, {
      id: initialFolderRef.id,
      name: 'My Bookmarks',
      description: 'Default bookmark folder',
      works: [],
      createdAt: new Date().toISOString()
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('No user is currently signed in');

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      throw new Error('Current password is incorrect');
    }
    throw new Error(error.message);
  }
};

export const updateUserEmail = async (newEmail: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user is currently signed in');

  try {
    await updateEmail(user, newEmail);
    // Update email in Firestore as well
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { email: newEmail }, { merge: true });
  } catch (error: any) {
    if (error.code === 'auth/requires-recent-login') {
      throw new Error('Please sign in again to change your email');
    }
    throw new Error(error.message);
  }
};

export const sendEmailVerification = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user is currently signed in');

  try {
    await sendVerification(user);
  } catch (error: any) {
    throw new Error(error.message);
  }
};