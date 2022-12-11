import fs from 'fs';
import log from '../utils/logger';
export async function deleteImage(name: string) {
  try {
    const path = `./public/images/${name}`;
    fs.unlinkSync(path);
    log.info('image deleted: ' + path);
  } catch (err: any) {
    log.error(err);
  }
}
