import { loadDataFromFile } from "./services/file-parser.service";
import { printMap } from "./utils/map.utils";
import { Adventurer } from "./models/interfaces/adventurer.interface";
import {
  adventurerHasRemainingMoves,
  getNextAdventurerLocation,
  getNextAdventurerOrientation,
} from "./services/adventurer.service";
import { printDetailsForAllAdventurers } from "./utils/adventurer.utils";


const { map, adventurers } = loadDataFromFile(process.cwd() + '/test-maps/test-map-2.txt');

if (map !== null) {
  // Printing the initial map (for debugging purposes)
  printMap(map, adventurers.length > 0 ? adventurers : undefined);

  if (adventurers.length > 0) {
    // Printing the initial adventurer configuration (for debugging purposes)
    printDetailsForAllAdventurers(adventurers);

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

        // Make the adventurer move on this orientation
        adv.loc = getNextAdventurerLocation(adv.loc, adv.orientation, map);

        // Consume the move the adventurer just made
        adv.moveSequence.shift();

        // TODO: adventurer-treasure interaction
      }

    } while (movers.length > 0);
  }

  // Printing the final map (for debugging purposes)
  printMap(map, adventurers.length > 0 ? adventurers : undefined);

  // Printing the final adventurer configuration (for debugging purposes)
  printDetailsForAllAdventurers(adventurers);
}
