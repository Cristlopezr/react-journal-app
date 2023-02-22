import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote, startSaveNote } from '../../store/journal';
import Swal from 'sweetalert2';

export const NoteView = () => {
	const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
	const dispatch = useDispatch();
	const { body, title, date, formState, onInputChange } = useForm(note);


	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
	  if(messageSaved.length > 0) Swal.fire("Nota actualizada", messageSaved, "success");
	}, [messageSaved])
	

	const onSaveNote = () => {
		dispatch(startSaveNote());
	};

	return (
		<Grid
			container
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight='light'>
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{ padding: 2 }}>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type='text'
					variant='filled'
					fullWidth
					placeholder='Ingrese un título'
					label='Título'
					sx={{ border: 'none', mb: 1 }}
					name='title'
					onChange={onInputChange}
					value={title}
				/>
				<TextField
					type='text'
					variant='filled'
					fullWidth
					multiline
					placeholder='¿Qué sucedió en el día de hoy?'
					minRows={5}
					name='body'
					onChange={onInputChange}
					value={body}
				/>
			</Grid>
			<ImageGallery />
		</Grid>
	);
};
