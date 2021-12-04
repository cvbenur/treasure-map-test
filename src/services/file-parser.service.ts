import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { LineToken } from '../enums/line-token.enum';
import { FileData } from '../models/interfaces/file-data.interface';
import { initMapFromLine, readSquareLine } from './map.service';
import { readAdventurerLine } from './adventurer.service';
import { getMapAsFormattedText } from '../utils/map.utils';
import { TreasureMap } from '../models/interfaces/treasure-map.interface';
import { getPrintableAdventurerDetails } from '../utils/adventurer.utils';
import { join } from "path";

/**
 * Reads a correctly formed text file and returns a {@link FileData} object
 * @param path string - The path to the text file
 * @returns FileData object
 */
export function loadDataFromFile(path: string): FileData {
  // Making sure thr provided file exists
  if (!existsSync(path)) {
    throw new Error('The provided file doesn\'t exist: ' + path);
  }

  // TODO: handle bad mountain line
  // TODO: handle bad square/adv lines
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
        // If the map is not properly defined in the text file
        if (!fileData.map) {
          throw new Error('Map not properly defined in file.');
        }
        
        // Read adventurer line
        fileData.adventurers.push(readAdventurerLine(tokens, fileData.map));
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
 * @param data {@link FileData} - The provided file data to output
 * @param outputDirectoryPath - The path to the output directory
 * @param filename string - The name of the file to generate 
 */
export function writeDataToFile(data: FileData, outputDirectoryPath: string, filename: string) {
  // Check provided filename
  if (!filename.endsWith('.txt')) filename += '.txt';
  
  // Retrieve the formatted definition for the map
  let res = getMapAsFormattedText(data.map as TreasureMap);

  // Retrieve the formatted details for the adventurers
  res += data.adventurers.map(getPrintableAdventurerDetails).join('\n');

  // If the specified output directory doesn't exist
  if (!existsSync(outputDirectoryPath)) {
    // Create it
    mkdirSync(outputDirectoryPath);
  }

  // Write output to file
  writeFileSync(join(outputDirectoryPath, filename), res + '\n', { encoding: 'utf-8', flag: 'w' });
}
