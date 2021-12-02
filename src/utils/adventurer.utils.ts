import { Adventurer } from "../models/interfaces/adventurer.interface";

/**
 * Returns the correctly formatted details for a given Adventurer
 * @param adv {@link Adventurer} - The given Adventurer
 * @returns string - The correctly formatted Adventurer details
 */
export function getPrintableAdventurerDetails(adv: Adventurer): string {
  return `A - ${adv.name} - ${adv.loc.x} - ${adv.loc.y} - ${adv.orientation} - ${adv.treasures}`;
}

/**
 * Prints the details for all given Adventurers
 * @param advs {@link Adventurer}[] - The given Adventurer array
 */
export function printDetailsForAllAdventurers(advs: Adventurer[]) {
  console.log('ADVENTURERS:');
  console.log(advs.map(getPrintableAdventurerDetails).join('\n'));
}
