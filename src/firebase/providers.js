import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);

		//Credenciales
		/* const credentials = GoogleAuthProvider.credentialFromResult(result); */

		const user = result.user;
		const { displayName, email, photoURL, uid } = user;

		return {
			//Este ok es algo personalizado
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
		};
	}
};
