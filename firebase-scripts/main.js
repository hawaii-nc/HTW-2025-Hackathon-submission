
// Import the functions you need from the SDKs you need
// Make sure to install the Firebase SDK in your project: npm install firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// TODO: Add your Firebase project's configuration here
const firebaseConfig = {
  apiKey: "AIzaSyDAVEsmPu_-cGxXgF4DSKukAD144P3-gXM",
  authDomain: "htwearntasklist.firebaseapp.com",
  projectId: "htwearntasklist",
  storageBucket: "htwearntasklist.firebasestorage.app",
  messagingSenderId: "60450712031",
  appId: "1:60450712031:web:4d1ad94f53639d3275bc6a",
  measurementId: "G-NBK6ZC4LJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Task Management Functions ---

/**
 * Creates a new task in the 'tasks' collection in Firestore.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {number} bounty - The bounty amount for completing the task.
 * @param {string} category - The category of the task (e.g., 'tech', 'business').
 * @returns {Promise<string>} The ID of the newly created task.
 */
export async function createTask(title, description, bounty, category) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      bounty: bounty,
      category: category,
      createdAt: new Date(),
      submissions: [],
      status: 'open' // e.g., 'open', 'in_review', 'closed'
    });
    console.log("Task created with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * Retrieves all tasks from the 'tasks' collection.
 * @returns {Promise<Array<Object>>} An array of task objects, each with its ID.
 */
export async function getAllTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
}

/**
 * Retrieves a single task by its ID.
 * @param {string} taskId - The ID of the task to retrieve.
 * @returns {Promise<Object|null>} The task object, or null if not found.
 */
export async function getTaskById(taskId) {
  const docRef = doc(db, "tasks", taskId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
}


// --- Submission Management Functions ---

/**
 * Adds a new submission to a specific task.
 * @param {string} taskId - The ID of the task to submit to.
 * @param {string} submitter - The name or ID of the person submitting.
 * @param {string} submissionLink - The URL link to the submission (e.g., GitHub, Google Drive).
 * @returns {Promise<void>}
 */
export async function submitForTask(taskId, submitter, submissionLink) {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const newSubmission = {
      submitter: submitter,
      submissionLink: submissionLink,
      submittedAt: new Date(),
      status: 'pending' // e.g., 'pending', 'approved', 'rejected'
    };

    await updateDoc(taskRef, {
      submissions: arrayUnion(newSubmission)
    });
    console.log("Submission added successfully!");
  } catch (e) {
    console.error("Error adding submission: ", e);
  }
}

/**
 * Approves a submission and marks it as paid (conceptually).
 * This is a simplified example. A real system would need more robust logic.
 * @param {string} taskId - The ID of the task.
 * @param {string} submissionLinkToApprove - The unique link of the submission to approve.
 * @returns {Promise<void>}
 */
export async function approveSubmission(taskId, submissionLinkToApprove) {
    const taskRef = doc(db, "tasks", taskId);
    const taskDoc = await getDoc(taskRef);

    if (!taskDoc.exists()) {
        console.error("Task not found!");
        return;
    }

    const taskData = taskDoc.data();
    const submissions = taskData.submissions;
    let submissionUpdated = false;

    const updatedSubmissions = submissions.map(sub => {
        if (sub.submissionLink === submissionLinkToApprove && sub.status === 'pending') {
            submissionUpdated = true;
            return { ...sub, status: 'approved', paid: true }; // Mark as 'approved' and 'paid'
        }
        return sub;
    });

    if (submissionUpdated) {
        await updateDoc(taskRef, {
            submissions: updatedSubmissions,
            status: 'closed' // Optionally close the task after an approval
        });
        console.log(`Submission approved for task ${taskId}`);
    } else {
        console.log("No pending submission found with that link to approve.");
    }
}
