import { join } from "path";
import { OUTPUT_DIRECTORY_PATH } from "../../src/constants/file.constants";

export const INCORRECT_FILE_PATH = "./this-file-doesnt-exist.txt";

export const GENERATED_TEST_FILENAME = 'test-file-map-3.txt';
export const TEST_FILE_PATH = join(OUTPUT_DIRECTORY_PATH, GENERATED_TEST_FILENAME);

export const NONEXISTANT_DIRECTORY_PATH = join(OUTPUT_DIRECTORY_PATH, 'nonexistant');