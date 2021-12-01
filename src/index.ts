import { loadMapFromFile } from "./services/map-parser.service";
import { printMap } from "./utils/map.utils";

const map = loadMapFromFile(process.cwd() + '/test-maps/test-map-1.txt');

if (map !== null) {
  printMap(map);
}
