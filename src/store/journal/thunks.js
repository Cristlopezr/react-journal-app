import { collection, doc, setDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
	addNewEmptyNote,
	deleteNoteById,
	savingNewNote,
	setActiveNote,
	setImageToActiveNote,
	setNotes,
	setSaving,
	updateNote,
} from './';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		//uid
		dispatch(savingNewNote());
		const { uid } = getState().auth;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
			imageUrls: [],
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

export const startUploadingFiles = (files = []) => {
	return async dispatch => {
		dispatch(setSaving());

		/* await fileUpload(files[0]); */

		const fileUploadPromises = [];

		for (const file of files) {
			//No estamos disparando la promesa, no estamos usando el .then
			//Solo estamos guardando la promesa en el array
			fileUploadPromises.push(fileUpload(file));
		}

		const imageUrls = await Promise.all(fileUploadPromises);
		dispatch(setImageToActiveNote(imageUrls));
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await deleteDoc(docRef);

		dispatch(deleteNoteById(note.id));
	};
};
