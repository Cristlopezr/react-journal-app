// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = getEnvironments();

// Your web app's Firebase configuration
//Dev/Prod
const firebaseConfig = {
	apiKey: env.VITE_FIREBASE_API_KEY,
	authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: env.VITE_FIREBASSE_STORAGE_BUCKET,
	messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: env.VITE_FIREBASES_APP_ID,
};

//Testing
/* const firebaseConfig = {
	apiKey: 'AIzaSyDO6Z6VGzld3yN2lx7-0LKadJ4LqG8jpIk',
	authDomain: 'testing-firebase-46b27.firebaseapp.com',
	projectId: 'testing-firebase-46b27',
	storageBucket: 'testing-firebase-46b27.appspot.com',
	messagingSenderId: '137067942451',
	appId: '1:137067942451:web:64630536a8b0369682c946',
}; */

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
