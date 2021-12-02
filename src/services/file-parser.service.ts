import { readFileSync, writeFileSync } from 'fs';
import { LineToken } from '../enums/line-token.enum';
import { FileData } from '../models/interfaces/file-data.interface';
import { initMapFromLine, readSquareLine } from './map.service';
import { readAdventurerLine } from './adventurer.service';
import { getMapAsFormattedText } from '../utils/map.utils';
import { TreasureMap } from '../models/interfaces/treasure-map.interface';
import { getPrintableAdventurerDetails } from '../utils/adventurer.utils';

/**
 * Reads a correctly formed text file and returns a {@link FileData} object
 * @param path string - The path to the text file
 * @returns FileData object
 */
export function loadDataFromFile(path: string): FileData {
  // TODO: handle wrong file path
  const fileContents = readFileSync(path, { encoding: 'utf-8', flag: 'r' })
    .trim();

  // Initializing fileData object with null values
  const fileData: FileData = {
    map: null,
    adventurers: [],
  };

  // Iterating over each line in the file
  for (const line of fileContents.split('\n')) {
    // Ignore comment lines
    if (line.startsWith(LineToken.COMMENT)) continue;

    const tokens = line.split(' - ');

    switch (tokens[0]) {
      // If the line defines the map
      case LineToken.MAP:
        // Initialize map with all squares empty
        fileData.map = initMapFromLine(tokens);
        break;
      
      // If the line defines a square
      case LineToken.MOUNTAIN:
      case LineToken.TREASURE: {
        // If the map is not properly defined in the text file
        if (!fileData.map) {
          throw new Error('Map not properly defined in file.');
        }

        // Else, read square line
        const newSquare = readSquareLine(tokens);
        fileData.map.layout[newSquare.loc.y][newSquare.loc.x] = newSquare;
      }
        break;
      
      // If the line defines an adventurer
      case LineToken.ADVENTURER:
        // Read adventurer line
        fileData.adventurers.push(readAdventurerLine(tokens));
        break;
      
      // In any other case
      default:
        throw new Error(`Unrecognized entity type ${tokens[0]}.`);
    }
  }

  return fileData;
}

/**
 * Writes the provided {@link FileData} to a correctly formatted text file
 * @param data 
 * @param path 
 */
export function writeDataToFile(data: FileData, path: string) {
  // Check provided path argument
  if (!path.endsWith('.txt')) path += '.txt';
  
  // Retrieve the formatted definition for the map
  let res = getMapAsFormattedText(data.map as TreasureMap);

  // Retrieve teh formatted details for the adventurers
  res += data.adventurers.map(getPrintableAdventurerDetails).join('\n');

  // Write output to file
  writeFileSync(path, res + '\n', { encoding: 'utf-8', flag: 'w' });
}
