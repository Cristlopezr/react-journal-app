export const fileUpload = async file => {
    /* if (!file) throw new Error('No hay ningún archivo para subir'); */
    if (!file) return null;

    const cloudUrl = env.VITE_CLOUD_URL;
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if (!resp.ok) throw new Error('No se pudo subir la imagen');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;
    } catch (error) {
        /* console.log(error);
		throw new Error(error.message); */
        return null;
    }
};
