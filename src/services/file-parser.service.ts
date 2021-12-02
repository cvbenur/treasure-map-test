import { readFileSync, writeFileSync } from 'fs';
import { SquareType } from '../enums/square-type.enum';
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
  const fileContents = readFileSync(path, { encoding: 'utf-8', flag: 'r' });

  // Initializing fileData object with null values
  const fileData: FileData = {
    map: null,
    adventurers: [],
  };

  // Iterating over each line in the file
  for (const line of fileContents.split('\n')) {
    const tokens = line.split(' - ');

    // TODO: refactor with switch-case

    // If the line is a comment line
    if (tokens[0] === LineToken.COMMENT) {
      // Do nothing (ignore)
      continue;
    }

    // If the line is a map definition line
    if (tokens[0] === LineToken.MAP) {
      // Initialize map with all squares empty
      fileData.map = initMapFromLine(tokens);

      continue;
    }

    // If the map is not properly defined in the text file
    if (!fileData.map) {
      throw new Error('Map not properly defined in file.');
    }

    // If the line is a map element line
    if ((Object.values(SquareType) as string[]).includes(tokens[0])) {
      // Else, read square line
      const newSquare = readSquareLine(tokens);
      fileData.map.layout[newSquare.loc.y][newSquare.loc.x] = newSquare;

      continue;
    }
    
    // Else, if the map is an adventurer definition line
    if (tokens[0] === LineToken.ADVENTURER) {
      // Read adventurer line
      fileData.adventurers.push(readAdventurerLine(tokens));

      continue;
    }

    // In any other case
    throw new Error(`Unrecognized entity type ${tokens[0]}.`);
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
