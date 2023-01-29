import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
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

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
	try {
		const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

		const { uid, photoURL } = resp.user;
		//uid y photoURL vienen como propiedades en la respuesta, en este caso photoURL viene como undefined

		//Necesitamos actualizar el displayName del usuario porque tambien esta undefined en las propiedades del objecto

		//Usamos la función updateProfile de firebase/auth y le pasamos el currentUser
		//El currentUser es el usuario recientemente creado, ya que al crearlo con createUserWithEmailAndPassword, este automaticamente tambien se logea
		await updateProfile(FirebaseAuth.currentUser, {
			displayName,
		});
		return {
			ok: true,
			uid,
			photoURL,
			email,
			displayName,
		};
	} catch (error) {
		const errorMessage = error.message;
		console.log(errorMessage);
		return {
			ok: false,
			errorMessage,
		};
	}
};
