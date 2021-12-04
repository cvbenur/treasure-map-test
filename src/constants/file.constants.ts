import { join } from 'path';

const INPUT_DIRECTORY = 'test-maps';
const OUTPUT_DIRECTORY = 'generated';

export const INPUT_DIRECTORY_PATH = join(process.cwd(), INPUT_DIRECTORY);
export const OUTPUT_DIRECTORY_PATH = join(process.cwd(), OUTPUT_DIRECTORY);

export const FILENAME = 'test-map-2.txt';
