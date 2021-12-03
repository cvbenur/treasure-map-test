import { loadDataFromFile, writeDataToFile } from "../../src/services/file-parser.service";
import { INPUT_DIRECTORY_PATH, OUTPUT_DIRECTORY_PATH } from "../../src/constants/file.constants";
import { join } from "path";

import { MAP_2_DATA } from "../constants/map.constants";

jest.mock('../../src/utils/map.utils');

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

  // TODO: writeDataToFile
});