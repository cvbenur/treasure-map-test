import { join } from 'path';
import { loadDataFromFile, writeDataToFile } from "./services/file-parser.service";
import {
  INPUT_DIRECTORY_PATH,
  OUTPUT_DIRECTORY_PATH,
  FILENAME,
} from "./constants/file.constants";
import { Adventurer } from "./models/interfaces/adventurer.interface";
import {
  adventurerHasRemainingMoves,
  getNextAdventurerLocation,
  getNextAdventurerOrientation,
} from "./services/adventurer.service";
import { TreasureSquare } from "./models/interfaces/square.interface";
import { SquareType } from "./enums/square-type.enum";


// Load map and adventurer data from provided file
const { map, adventurers } = loadDataFromFile(join(INPUT_DIRECTORY_PATH, FILENAME));
const OUTPUT_FILE_PATH = join(OUTPUT_DIRECTORY_PATH, 'output-' + FILENAME);


if (map !== null) {
  // If there are any adventurers loaded from the file
  if (adventurers.length > 0) {
    // Initialize movers array to []
    let movers: Adventurer[] = [];

    // While any of the adventurers still has any remaining moves
    do {
      // Get the list of adventurers with moves left to make
      movers = adventurers.filter(adventurerHasRemainingMoves);

      // Iterating over all the "movers"
      for (const adv of movers) {
        // Retrieve the adventurer's next orientation
        adv.orientation = getNextAdventurerOrientation(adv.orientation, adv.moveSequence[0]);

        // Retrieve the adventurer's next location
        const nextAdvLoc = getNextAdventurerLocation(adv.loc, adv.orientation, map);

        // Save where the adventurer just got on this square or not, for treasure recuperation purposes
        const justLandedHere = adv.loc === nextAdvLoc;

        // Make the adventurer move on this orientation
        adv.loc = nextAdvLoc;

        // Consume the move the adventurer just made
        adv.moveSequence.shift();

        // Retrieve the square the adventurer just landed on
        const currentSquare = map.layout[adv.loc.y][adv.loc.x];

        // If the adventurer just landed on this square this turn
        if (justLandedHere) {
          // If there is treasure remaining on this square
          if (currentSquare.type === SquareType.TREASURE
            && (currentSquare as TreasureSquare).treasures > 0) {
            // Give 1 treasure to adventurer
            adv.treasures++;

            // Remove 1 treasure from square
            (map.layout[adv.loc.y][adv.loc.x] as TreasureSquare).treasures--;
          }
        }
      }
    } while (movers.length > 0);
  }

  // Print data to output file
  writeDataToFile({ map: map, adventurers: adventurers }, OUTPUT_FILE_PATH);
}
