import { loadDataFromFile, writeDataToFile } from "../../src/services/file-parser.service";
import { INPUT_DIRECTORY_PATH, OUTPUT_DIRECTORY_PATH } from "../../src/constants/file.constants";
import { join } from "path";

import { MAP_2_DATA, MAP_3_DATA } from "../constants/map.constants";
import { existsSync, rmdirSync, unlinkSync } from "fs";

describe('file-parser.service.ts', () => {
  describe('loadDataFromFile()', () => {
    it('should read every type of line token and correctly return the map and adventurers data', () => {
      const actual = MAP_2_DATA;
      const expected = {
        map: null,
        length: 0,
      };

      expect(actual.map).not.toBe(expected.map);
      expect(actual.adventurers.length).not.toBe(expected.length);
    });

    it('should throw an "unrecognized entity type" error for unrecognized characters', () => {
      const mockFn = () => loadDataFromFile(join(INPUT_DIRECTORY_PATH, 'test-map-4.txt'));

      expect(mockFn).toThrowError('Unrecognized entity type Y.');
    });

    it('should throw a "map not properly defined in file" error for badly-formed map files', () => {
      const mockFn = () => loadDataFromFile(join(INPUT_DIRECTORY_PATH, 'test-map-5.txt'));

      expect(mockFn).toThrowError('Map not properly defined in file.');
    });
  });

  describe('writeDataToFile()', () => {

    it('should correctly generate the output file', () => {
      const GENERATED_TEST_FILENAME = 'test-file-map-3.txt';
      const filePath = join(OUTPUT_DIRECTORY_PATH, GENERATED_TEST_FILENAME);

      // Making sure the file doesn't exist prior to test
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }

      const existsBeforeFunction = existsSync(filePath);
      const expectedBeforeFunction = false;

      expect(existsBeforeFunction).toBe(expectedBeforeFunction);

      // Running the test
      writeDataToFile(MAP_3_DATA, OUTPUT_DIRECTORY_PATH, GENERATED_TEST_FILENAME);

      const actual = existsSync(join(OUTPUT_DIRECTORY_PATH, GENERATED_TEST_FILENAME));
      const expectedAfterFunction = true;

      expect(actual).toBe(expectedAfterFunction);

      // Removing created test file
      unlinkSync(filePath);
    });

    it('should understand filenames not ending with ".txt"', () => {
      const fn = () => writeDataToFile(MAP_2_DATA, OUTPUT_DIRECTORY_PATH, 'output-test-map-2');

      expect(fn).not.toThrow();
    });

    it('should create the specified output directory if it doesn\'t exist', () => {
      const NONEXISTANT_DIRECTORY_PATH = join(OUTPUT_DIRECTORY_PATH, 'nonexistant');

      // Making sure the directory doesn't exist before running the test
      const existsBeforeFunction = existsSync(NONEXISTANT_DIRECTORY_PATH);
      const expectedBeforeFunction = false;

      expect(existsBeforeFunction).toBe(expectedBeforeFunction);

      // Running the test
      writeDataToFile(MAP_2_DATA, NONEXISTANT_DIRECTORY_PATH, 'test-result-file');

      const actual = existsSync(NONEXISTANT_DIRECTORY_PATH);
      const expectedAfterFunction = true;

      expect(actual).toBe(expectedAfterFunction);

      // Deleting created test directory
      rmdirSync(NONEXISTANT_DIRECTORY_PATH, { recursive: true });
    });
  });
});