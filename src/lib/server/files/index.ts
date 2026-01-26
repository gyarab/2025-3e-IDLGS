import { v2 as cloudinary } from "cloudinary";

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

export const CLOUDINARY_FOLDER = "idlgs";

const cloudinaryUpload = async (file: File): Promise<string | undefined> => {
	if (!file || file.size === 0) {
		return undefined;
	}

	const byteArrayBuffer = Buffer.from(await file.arrayBuffer());

	const data = await new Promise((resolve) => {
		cloudinary.uploader
			.upload_stream(
				{
					folder: CLOUDINARY_FOLDER,
					resource_type: "image",
					quality: "auto",
					fetch_format: "auto",
				},
				(error, uploadResult) => {
					if (error) {
						console.error(
							`Buffer upload_stream with promise error - ${error}`,
						);
						resolve(undefined);
						return undefined;
					}
					resolve(uploadResult);
				},
			)
			.end(byteArrayBuffer);
	}).then((uploadResult) => {
		console.log(
			`Cloudinary upload success: ${JSON.stringify(uploadResult)}`,
		);
		return uploadResult;
	});

	if (!data) {
		return undefined;
	}
	const crdata = data as cloudinaryResponse;
	return crdata.url.replace("http://", "https://");
};

const getCloudinaryId = (url: string): string => {
	return CLOUDINARY_FOLDER + "/" + url.split("/").pop()?.split(".")[0];
};

const cloudinaryDelete = async (url: string): Promise<void> => {
	const id = getCloudinaryId(url);
	console.log("CloudinaryId", id);
	const v = await cloudinary.uploader.destroy(id);
	console.log(`Deletion of Cloudinary asset: ${JSON.stringify(v)}`);
};

//other providers in the future

//saves a file to the server and returns the path
export const saveToFile = async (file: File): Promise<string | undefined> => {
	return await cloudinaryUpload(file);
};

export const deleteFile = async (path: string): Promise<void> => {
	return await cloudinaryDelete(path);
};