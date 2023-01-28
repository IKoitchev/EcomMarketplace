import fs from 'fs';
import log from '../utils/logger';
export async function deleteImage(name: string): Promise<string> {
  let result;
  try {
    const path = `./public/images/${name}`;
    fs.unlinkSync(path);
    result = 'image deleted: ' + path;
    log.info(result);
  } catch (err: any) {
    result = err.message;
    log.error(err.message + 'error');
  } finally {
    return result;
  }
}
