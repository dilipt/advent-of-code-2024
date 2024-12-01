import fs from "fs";
import path from "path";

type Locations = {
  firsts: number[];
  seconds: number[];
};

export function day1part1(filename: string): number {
  const locations = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .reduce(
      (loc: Locations, line) => {
        const [firstStr, secondStr] = line.split(/\s+/);
        return {
          firsts: [...loc.firsts, parseInt(firstStr)],
          seconds: [...loc.seconds, parseInt(secondStr)],
        };
      },
      { firsts: [], seconds: [] }
    );

  locations.firsts.sort((a, b) => a - b);
  locations.seconds.sort((a, b) => a - b);

  return locations.firsts.reduce(
    (total, firstValue, i) =>
      total + Math.abs(firstValue - locations.seconds[i]),
    0
  );
}

type Similarities = {
  firsts: number[];
  secondCounts: { [key: number]: number };
};

export function day1part2(filename: string): number {
  const { firsts, secondCounts } = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .reduce(
      (sim: Similarities, line) => {
        const [first, second] = line.split(/\s+/).map((ch) => parseInt(ch));
        return {
          firsts: [...sim.firsts, first],
          secondCounts: sim.secondCounts[second]
            ? { ...sim.secondCounts, [second]: sim.secondCounts[second] + 1 }
            : { ...sim.secondCounts, [second]: 1 },
        };
      },
      { firsts: [], secondCounts: {} }
    );

  return firsts.reduce(
    (total, first) => total + first * (secondCounts[first] ?? 0),
    0
  );
}
