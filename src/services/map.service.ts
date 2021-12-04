import { SquareType } from "../enums/square-type.enum";
import { MountainSquare, Square, TreasureSquare } from "../models/interfaces/square.interface";
import { TreasureMap } from "../models/interfaces/treasure-map.interface";

/**
 * Initializes and returns an empty {@link TreasureMap} layout from a given map size
 * @param width number - The map's width
 * @param height number - The map's height
 * @returns Square[][] - The initialized empty layout
 */
function fillNewEmptyLayout(width: number, height: number): Square[][] {
  const layout = [];

  // Iterating over the number of rows
  for (let i = 0; i < height; i++) {
    // Initializing a new row
    const row: Square[] = [];
  
    // Iterating over the number of columns
    for (let j = 0; j < width; j++) {

      // Push an empty square into the row
      row.push(
        {
          type: SquareType.NORMAL,
          loc: { x: j, y: i },
          canStop: false,
        } as Square
      );
    }

    // Push the resulting row into the layout object
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
    layout: fillNewEmptyLayout(width, height)
  };
}

/**
 * Initlalizes and returns a new {@link MountainSquare} from a given line
 * @param tokens string[] - The tokenized line
 * @returns Initlalized MountainSquare object
 */
function newMountainSquareFromLine(tokens: string[]): MountainSquare {
  // Check whether the line contains the correct number of arguments
  if (tokens.length !== 3) {
    throw new Error('Wrong number of arguments in line: ' + tokens.join(' - '));
  }

  return {
    loc: { x: Number(tokens[1]), y: Number(tokens[2]) },
    canStop: true,
    type: SquareType.MOUNTAIN,
  };
}

/**
 * Initlalizes and returns a new {@link TreasureSquare} from a given line
 * @param tokens string[] - The tokenized line
 * @returns Initlalized TreasureSquare object
 */
function newTreasureSquareFromLine(tokens: string[]): TreasureSquare {
  // Check whether the line contains the correct number of arguments
  if (tokens.length !== 4) {
    throw new Error('Wrong number of arguments in line: ' + tokens.join(' - '));
  }

  const sqrTreasures = Number(tokens[3]);

  // Check provided treasure data
  if (isNaN(sqrTreasures) || sqrTreasures < 0) {
    throw new Error('Wrong value for treasures on line: ' + tokens.join(' - '));
  }

  return {
    loc: { x: Number(tokens[1]), y: Number(tokens[2]) },
    type: SquareType.TREASURE,
    canStop: false,
    treasures: sqrTreasures,
  };
}

/**
 * Returns a {@link Square} object from a given line
 * @param tokens string[] - The tokenized line
 * @param map {@link TreasureMap} - The map
 * @returns Correctly initlalized Square object
 */
export function readSquareLine(tokens: string[], map: TreasureMap): Square {
  tokens = tokens.map(t => t.trim());

  const advX = Number(tokens[1]);
  const advY = Number(tokens[2]);

  // Check provided X Location data
  if (isNaN(advX) || advX < 0 || advX > map.width - 1) {
    throw new Error('Wrong X Location for square line: ' + tokens.join(' - '));
  }

  // Check provided Y Location data
  if (isNaN(advY) || advY < 0 || advY > map.height - 1) {
    throw new Error('Wrong Y Location for square line: ' + tokens.join(' - '));
  }

  // Check whether the square is spawning on an empty square
  if (map.layout[advY][advX].type !== SquareType.NORMAL) {
    throw new Error('Wrong Location for square line (can\'t spawn here): ' + tokens.join(' - '));
  }

  // Reading the first token
  switch (tokens[0]) {
    // If the token defines a MOUNTAIN square
    case SquareType.MOUNTAIN:
      return newMountainSquareFromLine(tokens);
    
    // If the token defines a TREASURE square
    case SquareType.TREASURE:
      return newTreasureSquareFromLine(tokens);
    
    // In any other case
    default:
      throw new Error('Wrong square type: ' + tokens[0]);
  }
}
