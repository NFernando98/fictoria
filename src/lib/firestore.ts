import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  increment,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import type { UserData, Work, BookmarkFolder } from "../types/firebase";

// User Operations
export const getUserById = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as UserData) : null;
};

export const searchUsers = async (searchQuery: string) => {
  const q = query(
    collection(db, "users"),
    where("username", ">=", searchQuery),
    where("username", "<=", searchQuery + "\uf8ff"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as UserData)
  );
};

// Bookmark Folder Operations
export const getBookmarkFolders = async (userId: string) => {
  try {
    const foldersRef = collection(db, `users/${userId}/bookmarkFolders`);
    const querySnapshot = await getDocs(foldersRef);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id, // This was missing - we need to include the document ID!
          ...doc.data(),
        } as BookmarkFolder)
    );
  } catch (error) {
    console.error("Error fetching bookmark folders:", error);
    throw new Error("Failed to fetch bookmark folders. Please try again.");
  }
};

export const createBookmarkFolder = async (
  userId: string,
  folderData: Omit<BookmarkFolder, "id" | "createdAt">
) => {
  // Check if there's a currently authenticated user
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be signed in to create folders");
  }

  // Verify the userId matches the current user's ID
  if (currentUser.uid !== userId) {
    throw new Error("Missing or insufficient permissions");
  }

  try {
    const folderRef = doc(collection(db, `users/${userId}/bookmarkFolders`));
    const newFolder: BookmarkFolder = {
      id: folderRef.id,
      ...folderData,
      works: [],
      createdAt: new Date().toISOString(),
    };

    await setDoc(folderRef, newFolder);
    return newFolder;
  } catch (error) {
    console.error("Error creating bookmark folder:", error);
    throw new Error("Failed to create bookmark folder. Please try again.");
  }
};

export const updateBookmarkFolder = async (
  userId: string,
  folderId: string,
  updates: Partial<BookmarkFolder>
) => {
  // Check if there's a currently authenticated user
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be signed in to update folders");
  }

  // Verify the userId matches the current user's ID
  if (currentUser.uid !== userId) {
    throw new Error("Missing or insufficient permissions");
  }

  try {
    const folderRef = doc(db, `users/${userId}/bookmarkFolders`, folderId);
    await updateDoc(folderRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating bookmark folder:", error);
    throw new Error("Failed to update bookmark folder. Please try again.");
  }
};

export const deleteBookmarkFolder = async (
  userId: string,
  folderId: string
) => {
  // Check if there's a currently authenticated user
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be signed in to delete folders");
  }

  // Verify the userId matches the current user's ID
  if (currentUser.uid !== userId) {
    throw new Error("Missing or insufficient permissions");
  }

  try {
    const folderRef = doc(db, `users/${userId}/bookmarkFolders`, folderId);
    await deleteDoc(folderRef);
  } catch (error) {
    console.error("Error deleting bookmark folder:", error);
    throw new Error("Failed to delete bookmark folder. Please try again.");
  }
};

export const addWorkToFolder = async (
  userId: string,
  folderId: string,
  workId: string
) => {
  if (!userId || !folderId || !workId) {
    throw new Error("User ID, folder ID, and work ID are required");
  }

  // Check if there's a currently authenticated user
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be signed in to modify folders");
  }

  // Verify the userId matches the current user's ID
  if (currentUser.uid !== userId) {
    throw new Error("Missing or insufficient permissions");
  }

  try {
    const folderRef = doc(db, `users/${userId}/bookmarkFolders`, folderId);
    const folderSnap = await getDoc(folderRef);

    if (!folderSnap.exists()) {
      throw new Error("Folder not found");
    }

    const folderData = folderSnap.data() as BookmarkFolder;
    if (!folderData.works.includes(workId)) {
      await updateDoc(folderRef, {
        works: [...folderData.works, workId],
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error adding work to folder:", error);
    throw new Error("Failed to add work to folder. Please try again.");
  }
};

export const removeWorkFromFolder = async (
  userId: string,
  folderId: string,
  workId: string
) => {
  if (!userId || !folderId || !workId) {
    throw new Error("User ID, folder ID, and work ID are required");
  }

  // Check if there's a currently authenticated user
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be signed in to modify folders");
  }

  // Verify the userId matches the current user's ID
  if (currentUser.uid !== userId) {
    throw new Error("Missing or insufficient permissions");
  }

  try {
    const folderRef = doc(db, `users/${userId}/bookmarkFolders`, folderId);
    const folderSnap = await getDoc(folderRef);

    if (!folderSnap.exists()) {
      throw new Error("Folder not found");
    }

    const folderData = folderSnap.data() as BookmarkFolder;
    await updateDoc(folderRef, {
      works: folderData.works.filter((id) => id !== workId),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error removing work from folder:", error);
    throw new Error("Failed to remove work from folder. Please try again.");
  }
};

// Work Operations
export const getWorks = async (type?: string) => {
  const worksRef = collection(db, "works");
  const q = type
    ? query(worksRef, where("type", "==", type), orderBy("createdAt", "desc"))
    : query(worksRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Work)
  );
};

export const getWorkById = async (workId: string) => {
  const docRef = doc(db, "works", workId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as Work) : null;
};

export const createWork = async (
  work: Omit<Work, "id" | "createdAt" | "updatedAt">
) => {
  const now = new Date().toISOString();
  const workData = {
    ...work,
    createdAt: now,
    updatedAt: now,
    likes: 0,
    views: 0,
  };

  const docRef = await addDoc(collection(db, "works"), workData);
  return { id: docRef.id, ...workData } as Work;
};

export const updateWork = async (workId: string, updates: Partial<Work>) => {
  const workRef = doc(db, "works", workId);
  await updateDoc(workRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};

export const deleteWork = async (workId: string) => {
  await deleteDoc(doc(db, "works", workId));
};

// User Interactions
export const toggleLike = async (workId: string, userId: string) => {
  const likeRef = doc(db, "likes", `${workId}_${userId}`);
  const likeDoc = await getDoc(likeRef);

  if (likeDoc.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(doc(db, "works", workId), {
      likes: increment(-1),
    });
    return false;
  } else {
    await setDoc(likeRef, {
      userId,
      workId,
      createdAt: new Date().toISOString(),
    });
    await updateDoc(doc(db, "works", workId), {
      likes: increment(1),
    });
    return true;
  }
};

export const addView = async (workId: string) => {
  const workRef = doc(db, "works", workId);
  await updateDoc(workRef, {
    views: increment(1),
  });
};
