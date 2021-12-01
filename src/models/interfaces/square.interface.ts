import { SquareType } from "../../enums/square-type.enum";

export interface Square {
  x: number;
  y: number;
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