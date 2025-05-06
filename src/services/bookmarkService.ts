import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";

/**
 * Interface for a bookmark folder
 */
export interface BookmarkFolder {
  id: string;
  name: string;
  isPublic: boolean;
  works: string[];
  createdAt?: string;
}

/**
 * Interface for creating a new bookmark folder
 */
export interface NewBookmarkFolder {
  name: string;
  isPublic: boolean;
  works: string[];
}

/**
 * Fetch all bookmark folders for a user
 *
 * @param userId - The user ID to fetch folders for
 * @returns Array of bookmark folders
 */
export const getBookmarkFolders = async (
  userId: string
): Promise<BookmarkFolder[]> => {
  try {
    const foldersRef = collection(db, "users", userId, "bookmarkFolders");
    const snapshot = await getDocs(foldersRef);

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as BookmarkFolder)
    );
  } catch (error) {
    console.error("Error fetching bookmark folders:", error);
    throw new Error("Failed to fetch bookmark folders");
  }
};

/**
 * Create a new bookmark folder for a user
 *
 * @param userId - The user ID to create the folder for
 * @param folderData - The folder data to create
 * @returns The created folder with ID
 */
export const createBookmarkFolder = async (
  userId: string,
  folderData: NewBookmarkFolder
): Promise<BookmarkFolder> => {
  try {
    // Check if folder with same name already exists
    const foldersRef = collection(db, "users", userId, "bookmarkFolders");
    const q = query(foldersRef, where("name", "==", folderData.name));
    const existingFolders = await getDocs(q);

    if (!existingFolders.empty) {
      throw new Error("A folder with this name already exists");
    }

    // Create the new folder with timestamp
    const folderWithTimestamp = {
      ...folderData,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(foldersRef, folderWithTimestamp);

    // Return the created folder with its ID
    return {
      id: docRef.id,
      ...folderWithTimestamp,
    };
  } catch (error) {
    console.error("Error creating bookmark folder:", error);
    throw error;
  }
};

/**
 * Delete a bookmark folder
 *
 * @param userId - The user ID who owns the folder
 * @param folderId - The folder ID to delete
 */
export const deleteBookmarkFolder = async (
  userId: string,
  folderId: string
): Promise<void> => {
  try {
    const folderRef = doc(db, "users", userId, "bookmarkFolders", folderId);
    await deleteDoc(folderRef);
  } catch (error) {
    console.error("Error deleting bookmark folder:", error);
    throw new Error("Failed to delete bookmark folder");
  }
};

/**
 * Add a work to a bookmark folder
 *
 * @param userId - The user ID who owns the folder
 * @param folderId - The folder ID to add the work to
 * @param workId - The work ID to add
 */
export const addWorkToFolder = async (
  userId: string,
  folderId: string,
  workId: string
): Promise<void> => {
  try {
    const folderRef = doc(db, "users", userId, "bookmarkFolders", folderId);

    // Get the current folder data
    const folderSnapshot = await getDocs(
      query(
        collection(db, "users", userId, "bookmarkFolders"),
        where("id", "==", folderId)
      )
    );

    if (folderSnapshot.empty) {
      throw new Error("Folder not found");
    }

    const folder = folderSnapshot.docs[0].data() as BookmarkFolder;

    // Check if work already in folder
    if (folder.works.includes(workId)) {
      return; // Work already in folder, no need to update
    }

    // Add the work to the folder's works array
    folder.works.push(workId);

    // Update the folder in Firestore
    await updateDoc(folderRef, { works: folder.works });
  } catch (error) {
    console.error("Error adding work to folder:", error);
    throw error;
  }
};

/**
 * Remove a work from a bookmark folder
 *
 * @param userId - The user ID who owns the folder
 * @param folderId - The folder ID to remove the work from
 * @param workId - The work ID to remove
 */
export const removeWorkFromFolder = async (
  userId: string,
  folderId: string,
  workId: string
): Promise<void> => {
  try {
    const folderRef = doc(db, "users", userId, "bookmarkFolders", folderId);

    // Get the current folder data
    const folderSnapshot = await getDocs(
      query(
        collection(db, "users", userId, "bookmarkFolders"),
        where(doc.id, "==", folderId)
      )
    );

    if (folderSnapshot.empty) {
      throw new Error("Folder not found");
    }

    const folder = folderSnapshot.docs[0].data() as BookmarkFolder;

    // Remove the work from the folder's works array
    const updatedWorks = folder.works.filter((id) => id !== workId);

    // Update the folder in Firestore
    await updateDoc(folderRef, { works: updatedWorks });
  } catch (error) {
    console.error("Error removing work from folder:", error);
    throw error;
  }
};

/**
 * Update a bookmark folder (name or visibility)
 *
 * @param userId - The user ID who owns the folder
 * @param folderId - The folder ID to update
 * @param updates - The properties to update
 */
export const updateBookmarkFolder = async (
  userId: string,
  folderId: string,
  updates: { name?: string; isPublic?: boolean }
): Promise<void> => {
  try {
    // If name is being updated, check for duplicates
    if (updates.name) {
      const foldersRef = collection(db, "users", userId, "bookmarkFolders");
      const q = query(foldersRef, where("name", "==", updates.name));
      const existingFolders = await getDocs(q);

      if (!existingFolders.empty && existingFolders.docs[0].id !== folderId) {
        throw new Error("A folder with this name already exists");
      }
    }

    const folderRef = doc(db, "users", userId, "bookmarkFolders", folderId);
    await updateDoc(folderRef, updates);
  } catch (error) {
    console.error("Error updating bookmark folder:", error);
    throw error;
  }
};
