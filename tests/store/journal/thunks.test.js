import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import { startNewNote } from '../../../src/store/journal';
import {
	addNewEmptyNote,
	savingNewNote,
	setActiveNote,
} from '../../../src/store/journal/journalSlice';
jest.setTimeout(6000);
describe('Pruebas en journal thunks', () => {
	const dispatch = jest.fn();
	const getState = jest.fn();
	beforeEach(() => jest.clearAllMocks());

	test('startNewNote debe de crear una nueva nota en blanco', async () => {
		//Mock return value retorna el valor inmediatamente cuando se llame
		//Mock resolved value es para las promesas
		const uid = 'TEST-UID';
		getState.mockReturnValue({ auth: { uid: uid } });

		await startNewNote()(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(savingNewNote());
		expect(dispatch).toHaveBeenCalledWith(
			addNewEmptyNote({
				title: '',
				body: '',
				date: expect.any(Number),
				imageUrls: [],
				id: expect.any(String),
			})
		);
		expect(dispatch).toHaveBeenCalledWith(
			setActiveNote({
				title: '',
				body: '',
				date: expect.any(Number),
				imageUrls: [],
				id: expect.any(String),
			})
		);

		// Borrar de firebase
		const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
		const docs = await getDocs(collectionRef);

		const deletePromises = [];
		docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

		await Promise.all(deletePromises);
	});
});
