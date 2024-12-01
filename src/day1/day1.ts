import fs from "fs";
import path from "path";

export function part1(filename: string): number {
  const lines = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n");

  const firstList: number[] = [];
  const secondList: number[] = [];

  for (const line of lines) {
    const [first, second] = line.split(/\s+/).map((ch) => parseInt(ch));
    firstList.push(first);
    secondList.push(second);
  }

  firstList.sort((a, b) => a - b);
  secondList.sort((a, b) => a - b);

  let distance = 0;
  for (let i = 0; i < firstList.length; i++) {
    distance += Math.abs(firstList[i] - secondList[i]);
  }

  return distance;
}

export function part2(filename: string) {
  const lines = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n");

  const firstList: number[] = [];
  const secondCounts: { [key: number]: number } = {};

  for (const line of lines) {
    const [first, second] = line.split(/\s+/).map((ch) => parseInt(ch));
    firstList.push(first);
    if (secondCounts[second]) {
      secondCounts[second]++;
    } else {
      secondCounts[second] = 1;
    }
  }

  let similarity = 0;
  for (const first of firstList) {
    similarity += first * (secondCounts[first] ?? 0);
  }

  return similarity;
}
