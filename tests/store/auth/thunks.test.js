import {
	loginWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	signInWithGoogle,
} from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import {
	checkingAuthentication,
	startCreatingUserWithEmailPassword,
	startGoogleSignIn,
	startLoginWithEmailPassword,
	startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';
//Al no importar desde el archivo de barril, se puede hacer mock de lo se importa, si es que se necesita.
jest.mock('../../../src/firebase/providers');

describe('Pruenas en AuthThunks', () => {
	const dispatch = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('debe de invocar el checkingCredentials', async () => {
		//primero checkingAuthentication() es la llamada a la funcion
		//segundo () es el valor de retorno de checkingAuthentication(), la cual es otra función,
		//que es asincrona, y recibe el dispatch
		await checkingAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});

	test('startGoogleSignIn debe llamar checkingCredentials y login - Exito', async () => {
		const loginData = { ok: true, ...demoUser };
		await signInWithGoogle.mockResolvedValue(loginData);

		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('startGoogleSignIn debe llamar checkingCredentials y logout - Error', async () => {
		const loginData = { ok: false, errorMessage: 'Un error en google' };
		await signInWithGoogle.mockResolvedValue(loginData);

		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
	});

	test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => {
		const loginData = { ok: true, ...demoUser };
		const formData = { email: demoUser.email, password: '123ABC' };

		await loginWithEmailPassword.mockResolvedValue(loginData);

		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {
		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
		expect(dispatch).toHaveBeenCalledWith(logout());
	});

	test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - Exito', async () => {
		const loginData = { ok: true, ...demoUser };
		const formData = {
			email: demoUser.email,
			password: '123ABC',
			displayName: demoUser.displayName,
		};
		await registerUserWithEmailPassword.mockResolvedValue(loginData);

		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(demoUser));
	});

	test('startLoginWithEmailPassword debe de llamar checkingCredentials y logout - Error', async () => {
		const loginData = { ok: false, errorMessage: 'No existen las credenciales' };
		const formData = { email: demoUser.email, password: '123ABC' };

		await loginWithEmailPassword.mockResolvedValue(loginData);

		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
	});
});
