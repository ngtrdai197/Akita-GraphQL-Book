import { HashMap } from '@datorama/akita';

export function convertHashmapToArray<T>(hashMap: HashMap<T>) {
  const value: T[] = [];
  for (const key in hashMap) {
    if (hashMap.hasOwnProperty(key)) {
      const element = hashMap[key];
      value.push(element);
    }
  }
  return value;
}
