// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const getUserRole = async (uid) => {
  const userDoc = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data().role;
  } else {
    await setDoc(userDoc, { role: 'user' });
    return 'user';
  }
};

const createDefaultAdmin = async () => {
  try {
    const adminEmail = 'admin@gmaill.com';
    const adminPassword = 'admin123'; // In production, use a secure password and don't hardcode

    const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    const adminUid = userCredential.user.uid;

    await setDoc(doc(db, 'users', adminUid), { role: 'admin' });

    console.log('Default admin created successfully:', adminEmail);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin user already exists. Setting role...');
      const userDoc = doc(db, 'users', adminEmail); // Note: Use email as ID or find by email
      await setDoc(doc(db, 'admins', 'default'), { email: adminEmail, role: 'admin' });
    } else {
      console.error('Error creating default admin:', error);
    }
  }
};

export { auth, db, googleProvider, githubProvider, getUserRole, createDefaultAdmin };