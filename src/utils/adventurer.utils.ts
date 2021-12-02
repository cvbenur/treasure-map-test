import { Adventurer } from "../models/interfaces/adventurer.interface";

/**
 * Prints the details for a given Adventurer
 * @param adv {@link Adventurer} - The given Adventurer
 */
export function printAdventurerDetails(adv: Adventurer) {
  console.log(
    `${adv.name} - ${adv.loc.x} - ${adv.loc.y} - ${adv.orientation} - ${adv.treasures}`
  );
}

/**
 * Prints the details for all given Adventurers
 * @param advs {@link Adventurer}[] - The given Adventurer array
 */
export function printDetailsForAllAdventurers(advs: Adventurer[]) {
  console.log('ADVENTURERS:');
  advs.map(printAdventurerDetails);
}
