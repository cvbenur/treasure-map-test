import { SquareType } from "../enums/square-type.enum";
import { MountainSquare, Square, TreasureSquare } from "../models/interfaces/square.interface";
import { TreasureMap } from "../models/interfaces/treasure-map.interface";

function fillNewLayout(width: number, height: number): Square[][] {
  const layout = [];

  for (let i = 0; i < height; i++) {
    const row: Square[] = [];
  
    for (let j = 0; j < width; j++) {
      row.push(
        {
          type: SquareType.NORMAL,
          loc: { x: j, y: i },
          canStop: false,
        } as Square
      );
    }

    layout.push(row);
  }

  return layout;
}

/**
 * Initializes and returns an empty {@link TreasureMap} from a given line
 * @param tokens string[] - The tokenized line
 * @returns Initialized TreasureMap object
 */
export function initMapFromLine(tokens: string[]): TreasureMap {
  const width = Number(tokens[1]);
  const height = Number(tokens[2]);

  return {
    width: width,
    height: height,
    layout: fillNewLayout(width, height)
  };
}

function newMountainSquareFromLine(tokens: string[]): MountainSquare {
  return {
    loc: { x: Number(tokens[1]), y: Number(tokens[2]) },
    canStop: true,
    type: SquareType.MOUNTAIN,
  };
}

function newTreasureSquareFromLine(tokens: string[]): TreasureSquare {
  return {
    loc: { x: Number(tokens[1]), y: Number(tokens[2]) },
    type: SquareType.TREASURE,
    canStop: false,
    treasures: Number(tokens[3]),
  };
}

/**
 * Returns a {@link Square} object from a given line
 * @param tokens string[] - The tokenized line
 * @returns Correctly initlalized Square object
 */
export function readSquareLine(tokens: string[]): Square {
  switch (tokens[0]) {
    case SquareType.MOUNTAIN:
      return newMountainSquareFromLine(tokens);
    
    case SquareType.TREASURE:
      return newTreasureSquareFromLine(tokens);
    
    default:
      throw new Error('Wrong square type: ' + tokens[0]);
  }
}