/**
 * @param oldObj Object to be updated
 * @param newObj Update field
 */
export function commonUpdate<T>(oldObj: T, newObj: any) {
  for (const [key, value] of Object.entries(newObj)) {
    if (key in oldObj) {
      oldObj[key] = value;
    }
  }
  return oldObj;
}
