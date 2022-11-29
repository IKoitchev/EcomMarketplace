import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import log from '../utils/logger';

export async function UploadImageHandler(req: Request, res: Response) {
  try {
    const image = req.files!.file as fileUpload.UploadedFile;

    image.mv('./public/images/' + image.name);

    res.status(201).send('Image uploaded successfully');
  } catch (error: any) {
    log.error(error?.message);
    res.status(500).send('error uploading image');
  }
}

export async function GetImageHandler(req: Request, res: Response) {
  try {
    res
      .status(200)
      .sendFile(path.resolve(`./public/images/${req.params.name}`));
  } catch (err: any) {
    log.error(err);
  }
}
