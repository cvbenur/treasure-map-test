import { loadDataFromFile } from "./services/file-parser.service";
import { printMap } from "./utils/map.utils";

const { map, adventurers } = loadDataFromFile(process.cwd() + '/test-maps/test-map-1.txt');

if (map !== null) {
  printMap(map);
}
