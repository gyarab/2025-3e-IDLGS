import { v2 as cloudinary } from 'cloudinary';

export type cloudinaryResponse = {
	asset_id: string;
	public_id: string;
	version: number;
	version_id: string;
	signature: string;
	width: number;
	height: number;
	format: string;
	resource_type: string;
	created_at: string;
	tags: [];
	bytes: string;
	type: string;
	etag: string;
	placeholder: number;
	url: string;
};

export const CLOUDINARY_FOLDER = 'idlgs';

export type FileType = 'image' | 'video' | 'raw';

const cloudinaryUpload = async (
	file: File,
	type: FileType,
): Promise<string | undefined> => {
	if (!file || file.size === 0) return undefined;

	const byteArrayBuffer = Buffer.from(await file.arrayBuffer());

	const data = await new Promise((resolve) => {
		cloudinary.uploader
			.upload_stream(
				{
					folder: CLOUDINARY_FOLDER,
					resource_type: type,
					quality: 'auto',
					fetch_format: 'auto',
				},
				(error, uploadResult) => {
					if (error) {
						console.error(
							`Error uploading file: ${error.http_code} ${error.name} ${error.message}`,
						);
						resolve(undefined);
						return undefined;
					}
					resolve(uploadResult);
				},
			)
			.end(byteArrayBuffer);
	}).then((uploadResult) => {
		console.log(`File uploaded: ${JSON.stringify(uploadResult)}`);
		return uploadResult;
	});

	if (!data) return undefined;

	const crdata = data as cloudinaryResponse;
	//workaround for CSP
	return crdata.url.replace('http://', 'https://');
};

const getCloudinaryId = (url: string): string => {
	return CLOUDINARY_FOLDER + '/' + url.split('/').pop()?.split('.')[0];
};

const cloudinaryDelete = async (url: string): Promise<void> => {
	const id = getCloudinaryId(url);
	//console.log('CloudinaryId', id);
	const v = await cloudinary.uploader.destroy(id);
	console.log(`Deletion of cloudinary asset - ${JSON.stringify(v)}`);
};

// other providers?

//saves a file to the server and returns the path
export const saveToCloud = async (
	file: File,
	type: FileType,
): Promise<string | undefined> => {
	console.log(file.type, file.size);
	return await cloudinaryUpload(file, type);
};

export const deleteInCloud = async (path: string): Promise<void> => {
	return await cloudinaryDelete(path);
};
