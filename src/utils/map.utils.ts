import { SquareType } from "../enums/square-type.enum"
import { TreasureMap } from "../models/interfaces/treasure-map.interface";
import { TreasureSquare, Square } from "../models/interfaces/square.interface";
import { Adventurer } from "../models/interfaces/adventurer.interface";

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
