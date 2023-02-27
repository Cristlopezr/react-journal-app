export const initialState = {
	status: 'checking', //checking - not-authenticated - authenticated
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState = {
	status: 'authenticated',
	uid: '123ABC',
	email: 'fernando@google.com',
	displayName: 'Fernando',
	photoURL: 'https://foto.jpg',
	errorMessage: null,
};

export const notAuthenticatedState = {
	status: 'not-authenticated',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: undefined,
};

export const demoUser = {
	uid: 'ABC123',
	email: 'demo@google.com',
	displayName: 'demo user',
	photoURL: 'https://demo.jpg',
};
