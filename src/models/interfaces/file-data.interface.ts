import { Adventurer } from "./adventurer.interface";
import { TreasureMap } from "./treasure-map.interface";

export interface FileData {
  map: TreasureMap | null;
  adventurers: Adventurer[];
}