import { collection, doc, setDoc, addDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './';
import { loadNotes } from '../../helpers';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		//uid
		dispatch(savingNewNote());
		const { uid } = getState().auth;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		// Firebase method
		/* const docRef = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote); */

		//Metodo Mio, es lo mismo que firebase, pero separamos la referencia a la colección en una variable
		/*  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
		const docRef = await addDoc(collectionRef, newNote); */

		//Metodo fernando herrera, se crea la referencia a la coleccón, luego con doc se crea la referencia a un documento,
		//que si no existe, se crea.
		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const notes = await loadNotes(uid);

		dispatch(setNotes(notes));
	};
};

export const startSaveNote = () => {
	return async (dispatch, getState) => {

		dispatch(setSaving());

		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const noteToFireStore = { ...note };
		delete noteToFireStore.id;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await setDoc(docRef, noteToFireStore, { merge: true });

		dispatch(updateNote(note));
	};
};
