import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
	email: '',
	password: '',
	displayName: '',
};

const formValidations = {
	email: [value => value.includes('@'), 'El email debe contener un @.'],
	password: [value => value.length >= 6, 'La contraseña debe de tener al menos 6 letras.'],
	displayName: [value => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {
	const { status, errorMessage } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const isCheckingAuthentication = useMemo(() => status === 'checking');

	const {
		formState,
		email,
		emailValid,
		displayName,
		displayNameValid,
		password,
		passwordValid,
		onInputChange,
		isFormValid,
	} = useForm(formData, formValidations);

	const onSubmit = event => {
		event.preventDefault();
		setIsFormSubmitted(true);
		if (!isFormValid) return;

		dispatch(startCreatingUserWithEmailPassword(formState));
	};

	return (
		<AuthLayout title='Crear Cuenta'>
			<form onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Nombre Completo'
							type='text'
							placeholder='Nombre Completo'
							fullWidth
							name='displayName'
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && isFormSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Correo'
							type='email'
							placeholder='fernando@google.com'
							fullWidth
							name='email'
							value={email}
							onChange={onInputChange}
							error={!!emailValid && isFormSubmitted}
							helperText={emailValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Contraseña'
							type='password'
							placeholder='Contraseña'
							fullWidth
							name='password'
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && isFormSubmitted}
							helperText={passwordValid}
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={errorMessage ? '' : 'none'}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>
								Crear Cuenta
							</Button>
						</Grid>
					</Grid>

					<Grid container direction='row' justifyContent='end'>
						<Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
						<Link component={RouterLink} color='inherit' to='/auth/login'>
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
