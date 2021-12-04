import { Orientation } from "../../enums/orientation.enum";
import { Move } from "../../enums/move.enum";
import { Location } from "./location.interface";

export interface Adventurer {
  /**
   * The Adventurer's current {@link Location} on the map
   */
  loc: Location;

  /**
   * The Adventurer's name
   */
  name: string;

  /**
   * The Adventurer's current {@link Orientation}
   */
  orientation: Orientation;

  /**
   * The Adventurer's sequence of moves to execute - Array of {@link Move}
   */
  moveSequence: Move[],

  /**
   * The number of treasures the Adventurer possesses
   * 
   * @defaultValue `0`
   */
  treasures: number;
}
