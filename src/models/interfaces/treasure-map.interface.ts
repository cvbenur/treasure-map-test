import { Square } from './square.interface';

export interface TreasureMap {
  width: number;
  height: number;
  layout: Square[][];
}