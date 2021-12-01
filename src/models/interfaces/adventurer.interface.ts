import { Orientation } from "../../enums/orientation.enum";
import { Move } from "../../enums/move.enum";
import { Location } from "./location.interface";

export interface Adventurer {
  loc: Location;
  name: string;
  orientation: Orientation;
  moveSequence: Move[],
  treasures: number;
}