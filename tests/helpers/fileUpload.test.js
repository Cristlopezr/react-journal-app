import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
	cloud_name: 'dmpsvqars',
	api_key: '814727824586218',
	api_secret: 'GGryG5OoNBhaFfqFpO8FdTOKa-w',
	secure: true,
});

describe('Pruebas en fileUpload', () => {
	test('debe de subir el archivo correctamente a cloudinary', async () => {
		const imageUrl =
			'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';

		const resp = await fetch(imageUrl);
		const blob = await resp.blob();
		const file = new File([blob], 'foto.jpg');

		const url = await fileUpload(file);

		expect(typeof url).toBe('string');

		const segments = url.split('/');
		const imageId = segments[segments.length - 1].replace('.jpg', '');
		const cloudResp = await cloudinary.api.delete_resources([`journal/${imageId}`], {
			resource_type: 'image',
		});

		/* console.log({ cloudResp }); */
	});

	test('debe de retorna null', async () => {
		const file = new File([], 'foto.jpg');

		const url = await fileUpload(file);

		expect(url).toBe(null);
	});
});
