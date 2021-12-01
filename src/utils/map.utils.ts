import { SquareType } from "../enums/square-type.enum"
import { TreasureMap } from "../models/interfaces/treasure-map.interface";
import { TreasureSquare, Square } from "../models/interfaces/square.interface";

/**
 * Returns the appropriate displayable string from the {@link SquareType}
 * @param square The square to get the symbol of
 * @returns string
 */
export function getSquareSymbol(square: Square): string {
  let symbol = '.';

  switch (square.type) {
    case SquareType.NORMAL:
      symbol = '.';
      break;
    
    case SquareType.MOUNTAIN:
      symbol = 'M';
      break;
    
    case SquareType.TREASURE:
      symbol = `T(${(square as TreasureSquare).treasures})`;
      break;
    
    // TODO: Adventurer

    default:
      // TODO
  }

  return symbol;
}

export function printMap(map: TreasureMap) {
  console.log(map.layout.map(row => row.map(getSquareSymbol).join('\t')).join('\n'));
}