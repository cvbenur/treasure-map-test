import { readFileSync } from 'fs';
import { SquareType } from '../enums/square-type.enum';
import { LineToken } from '../enums/line-token.enum';
import { FileData } from '../models/interfaces/file-data.interface';
import { initMapFromLine, readSquareLine } from './map.service';
import { readAdventurerLine } from './adventurer.service';

/**
 * Reads a correctly formed text file and returns a {@link FileData} object
 * @param path string - The path to the text file
 * @returns FileData object
 */
export function loadDataFromFile(path: string): FileData {
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
      console.log('adventurer')
      // Read adventurer line
      fileData.adventurers.push(readAdventurerLine(tokens));

      continue;
    }

    // In any other case
    throw new Error(`Unrecognized entity type ${tokens[0]}.`);
  }

  return fileData;
}
