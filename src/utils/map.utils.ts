import { SquareType } from "../enums/square-type.enum"
import { TreasureMap } from "../models/interfaces/treasure-map.interface";
import { TreasureSquare, Square } from "../models/interfaces/square.interface";
import { Adventurer } from "../models/interfaces/adventurer.interface";
import { LineToken } from "../enums/line-token.enum";

/**
 * Returns the appropriate displayable string from the {@link SquareType}
 * @param square The square to get the symbol of
 * @returns string
 */
export function getSquareSymbol(square: Square): string {
  // Checking the square's type
  switch (square.type) {
    // If the square is empty
    case SquareType.NORMAL:
      return '.';
    
    // If the square is a mountain square
    case SquareType.MOUNTAIN:
      return 'M';
    
    // If the square is a treasure square
    case SquareType.TREASURE:
      return `T(${(square as TreasureSquare).treasures})`;

    // In any other case
    default:
      throw new Error(`Unrecognized square type: ${square.type as SquareType}`);
  }
}

/**
 * Displays the provided {@link TreasureMap} (used for debugging purposes)
 * @param map The map to display
 */
export function printMap(map: TreasureMap, adventurers?: Adventurer[]) {
  // Derive printable map from layout
  const toPrint = map.layout.map(row => row.map(getSquareSymbol));

  // If there are any adventurers to display
  if (adventurers) {
    // Iterate over provided Adventurer array
    for (const adventurer of adventurers) {
      // Replace square by Adventurer found at this location
      toPrint[adventurer.loc.y][adventurer.loc.x] = `A(${adventurer.name})`;
    }
  }

  // Print the result
  console.log('MAP:');
  console.log(toPrint.map(row => row.join('\t')).join('\n'));
}

/**
 * Returns the formal definition of the given {@link TreasureMap}, ignoring Adventurers and empty squares
 * @param map {@link TreasureMap} - The given map
 * @returns string - The correctly formatted definition of the map
 */
export function getMapAsFormattedText(map: TreasureMap): string {
  // Log the map definition
  let res = `${LineToken.MAP} - ${map.width} - ${map.height}\n`;

  // Flattening the 2D Square array into a 1D square array for ease of filtering
  const squares = ([] as Square[]).concat(...map.layout);

  // First log all MOUNTAIN squares
  for (const mtSquare of squares.filter(sq => sq.type === SquareType.MOUNTAIN)) {
    res += `${LineToken.MOUNTAIN} - ${mtSquare.loc.x} - ${mtSquare.loc.y}\n`;
  }

  // Then log all TREASURE squares WHICH STILL HAVE TREASURE REMAINING IN THEM
  for (const trSquare of squares.filter(sq => sq.type === SquareType.TREASURE && (sq as TreasureSquare).treasures > 0)) {
    res += `${LineToken.TREASURE} - ${trSquare.loc.x} - ${trSquare.loc.y} - ${(trSquare as TreasureSquare).treasures}\n`;
  }
    
  return res;
}
