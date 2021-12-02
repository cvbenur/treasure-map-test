import { Square } from './square.interface';

export interface TreasureMap {
  /**
   * The map's width measured in squares (horizontal size)
   */
  width: number;

  /**
   * The map's height measured in squares (vertical size)
   */
  height: number;

  /**
   * 2D {@link Square} array containing the map's layout
   */
  layout: Square[][];
}
