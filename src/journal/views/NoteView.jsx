import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';

export const NoteView = () => {
	const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
	const dispatch = useDispatch();
	const { body, title, date, formState, onInputChange } = useForm(note);

	const fileInputRef = useRef();

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
		if (messageSaved.length > 0) Swal.fire('Nota actualizada', messageSaved, 'success');
	}, [messageSaved]);

	const onSaveNote = () => {
		dispatch(startSaveNote());
	};

	const onFileInputChange = ({ target }) => {
		if (target.files.length === 0) return;
		dispatch(startUploadingFiles(target.files));
	};

	const onDeleteNote = () => {
		dispatch(startDeletingNote());
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
				<input
					ref={fileInputRef}
					type='file'
					multiple
					onChange={onFileInputChange}
					style={{ display: 'none' }}
				/>

				<IconButton
					color='primary'
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadOutlined />
				</IconButton>

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

			<Grid container justifyContent='end'>
				<Button onClick={onDeleteNote} sx={{ mt: 2 }} color='error'>
					<DeleteOutline />
					Borrar
				</Button>
			</Grid>
			<ImageGallery images={note.imageUrls} />
		</Grid>
	);
};
