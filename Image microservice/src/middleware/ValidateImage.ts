import { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import log from '../utils/logger';

export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) {
      res.status(400).send('No image found');
    } else {
      const filename = (req.files.file as fileUpload.UploadedFile).name;
      const extension = filename.split('.').pop();
      console.log('extension: ' + extension);

      if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') {
        log.info('valid image');
        next();
      } else {
        log.error('invalid image');
        res.status(400).send('Invalid file format');
      }
    }
  } catch (err: any) {
    log.error(err?.message);
    res.status(500).send(err?.message);
  }
};
