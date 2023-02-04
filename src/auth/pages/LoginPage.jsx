import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formValidations = {
	email: [value => value.includes('@'), 'El email debe contener un @.'],
	password: [value => value.length >= 1, 'Por favor ingrese una contraseña'],
};

export const LoginPage = () => {
	const { status, errorMessage } = useSelector(state => state.auth);

	const { email, password, onInputChange, isFormValid } = useForm(
		{
			email: '',
			password: '',
		},
		formValidations
	);

	const dispatch = useDispatch();

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const onSubmit = event => {
		event.preventDefault();
		if (!isFormValid) return;
		dispatch(startLoginWithEmailPassword({ email, password }));
	};

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title='Iniciar Sesión'>
			<form onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField label='Correo' type='email' placeholder='example@google.com' fullWidth name='email' value={email} onChange={onInputChange} />
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField label='Contraseña' type='password' placeholder='Contraseña' fullWidth name='password' value={password} onChange={onInputChange} />
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={errorMessage ? '' : 'none'}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button disabled={isAuthenticating} onClick={onGoogleSignIn} variant='contained' fullWidth>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction='row' justifyContent='end'>
						<Link component={RouterLink} color='inherit' to='/auth/register'>
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
