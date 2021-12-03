import { TreasureMap } from "../../src/models/interfaces/treasure-map.interface";
import { loadDataFromFile } from "../../src/services/file-parser.service";
import { INPUT_DIRECTORY_PATH } from "../../src/constants/file.constants";
import { join } from "path";

export const MAP_2_DATA = loadDataFromFile(join(INPUT_DIRECTORY_PATH, 'test-map-2.txt'));

/**
 * .  .  .
 * .  M  .
 * .  .  .
 */
export const MAP_3_DATA = loadDataFromFile(join(INPUT_DIRECTORY_PATH, 'test-map-3.txt'));
