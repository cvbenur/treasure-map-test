import { SquareType } from "../enums/square-type.enum"
import { TreasureMap } from "../models/interfaces/treasure-map.interface";
import { TreasureSquare, Square } from "../models/interfaces/square.interface";
import { LineToken } from "../enums/line-token.enum";

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
