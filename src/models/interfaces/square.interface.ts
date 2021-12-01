import { SquareType } from "../../enums/square-type.enum";
import { Location } from '../interfaces/location.interface';

export interface Square {
  loc: Location
  type: SquareType;
  canStop: boolean;
}

export interface TreasureSquare extends Square {
  canStop: false;
  treasures: number;
}

export interface MountainSquare extends Square {
  canStop: true;
}