/**
 * Checks whether a value is listed in an enum
 * @param value string - The value to check
 * @param enumObject - The enum to check against
 * @returns `true` if yes, `false` if no
 */
export function checkValueInEnum<T>(value: string, enumObject: { [key: string]: T }): boolean {
  return Object.values(enumObject).includes((value as unknown) as T)
}