import { readFileSync } from 'fs';
import { TreasureMap } from '../models/interfaces/treasure-map.interface';
import { MountainSquare, TreasureSquare, Square } from '../models/interfaces/square.interface';
import { SquareType } from '../enums/square-type.enum';
import { MapToken } from '../enums/map-token.enum';

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

function initMapFromLine(tokens: string[]): TreasureMap {
  const width = Number(tokens[1]);
  const height = Number(tokens[2]);

  return {
    width: width,
    height: height,
    layout: fillNewLayout(width, height)
  };
}

function addMountainFromLine(tokens: string[], map: TreasureMap): TreasureMap {
  const newMountain: MountainSquare = {
    loc: { x: Number(tokens[1]), y: Number(tokens[2]) },
    canStop: true,
    type: SquareType.MOUNTAIN,
  };

  map.layout[newMountain.loc.y][newMountain.loc.x] = newMountain;

  return map;
}

function addTreasureFromLine(tokens: string[], map: TreasureMap): TreasureMap {
  const newTreasure: TreasureSquare = {
    loc: { x: Number(tokens[1]), y: Number(tokens[2]) },
    type: SquareType.TREASURE,
    canStop: false,
    treasures: Number(tokens[3]),
  };

  map.layout[newTreasure.loc.y][newTreasure.loc.x] = newTreasure;

  return map;
}

export function loadMapFromFile(path: string): TreasureMap | null {
  const file = readFileSync(path, { encoding: 'utf-8', flag: 'r' });

  let newMap: TreasureMap = {
    width: 0,
    height: 0,
    layout: []
  };

  
  for (const line of file.split('\n')) {
    const tokens = line.split(' - ');

    if (isNaN(Number(tokens[0]))) {
      switch (tokens[0]) {

        // In the case of a line starting with 'C'
        case MapToken.MAP:
          newMap = initMapFromLine(tokens);
          break;
        
        // In the case of a line starting with 'M'
        case MapToken.MOUNTAIN:
          newMap = addMountainFromLine(tokens, newMap);
          break;
        
        // In the case of a line starting with 'T'
        case MapToken.TREASURE:
          newMap = addTreasureFromLine(tokens, newMap);
          break;
        
        case MapToken.ADVENTURER:
          // TODO
          break;
        
        default:
          throw new Error(`Unrecognized entity type ${tokens[0]}.`);
      }

      continue
    }
  }

  return newMap;
}