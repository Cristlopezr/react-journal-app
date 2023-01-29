// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAdCuIwQod7sGxJE7UAl8khjta4LtOoCy8',
	authDomain: 'react-journal-app-b4409.firebaseapp.com',
	projectId: 'react-journal-app-b4409',
	storageBucket: 'react-journal-app-b4409.appspot.com',
	messagingSenderId: '634532173984',
	appId: '1:634532173984:web:f5012196c216f0a573d1c5',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
