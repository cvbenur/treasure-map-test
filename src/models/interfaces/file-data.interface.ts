import { Adventurer } from "./adventurer.interface";
import { TreasureMap } from "./treasure-map.interface";

export interface FileData {
  /**
   * The data for the current {@link TreasureMap}
   * 
   * @defaultValue `null`
   */
  map: TreasureMap | null;

  /**
   * The data for the Adventurers on the current map - Array of {@link Adventurer}
   * 
   * @defaultValue `[]`
   */
  adventurers: Adventurer[];
}