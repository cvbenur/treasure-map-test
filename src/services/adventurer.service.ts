import { Adventurer } from "../models/interfaces/adventurer.interface";
import { Move } from "../enums/move.enum";
import { Orientation } from "../enums/orientation.enum";

/**
 * Initializes and returns an {@link Adventurer} object from a given line
 * @param tokens string[] - The tokenized line
 * @returns Initlalized Adventurer object
 */
export function readAdventurerLine(tokens: string[]): Adventurer {
  return {
    name: tokens[1],
    loc: { x: Number(tokens[2]), y: Number(tokens[3]) },
    orientation: tokens[4] as Orientation,
    moveSequence: tokens[5].split('') as Move[],
    treasures: 0,
  };
}