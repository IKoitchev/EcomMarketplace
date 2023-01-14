import { createHash } from 'crypto';
import config from './hashConfig';

export interface hashOptions {
  salt?: any;
  pepper?: string;
}
const pepperChars = config.pepperCharacters || '';

//create a new hash
export function hash(object: any, hashOptions?: hashOptions): string {
  //sort, remove hash field and sort the object
  const objectAsString = standardizeObj({ ...object });

  let pepper = '';

  if (hashOptions?.pepper) {
    pepper = hashOptions?.pepper;
  } else {
    const index = Math.floor(Math.random() * pepperChars.length);
    pepper = pepperChars.charAt(index);
  }

  const hashedValue = createHash('sha256')
    .update(objectAsString + pepper)
    .digest('hex');
  return hashedValue;
}
//compare all object's hash with all pepper possibilities
export function objectIsModified(object: any, cmpHash: string): boolean {
  for (let i = 0; i < pepperChars.length; i++) {
    let currentChar = pepperChars.charAt(i);

    if (cmpHash === hash(object, { pepper: currentChar })) {
      return false;
    }
  }
  return true;
}

function standardizeObj(object: any): string {
  //standardize the object
  delete object.checksum;
  object._id = object._id.toString();

  const sorted = sortKeys(object);
  const objectAsString = JSON.stringify(sorted);

  return objectAsString;
}
//sort keys alphabetically
//different key order of the same object results in different hashes
function sortKeys(object: any) {
  const sorted = Object.keys(object)
    .sort()
    .reduce((result: any, key) => {
      result[key] = object[key];
      return result;
    }, {});
  return sorted;
}
