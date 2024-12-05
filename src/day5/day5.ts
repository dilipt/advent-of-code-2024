import fs from "fs";
import path from "path";

export function part1(filename: string) {
  const input = fs.readFileSync(path.join(__dirname, filename)).toString();
  const [rules, updates] = input.split("\n\n").map((str) => str.split("\n"));

  const sequenceMapping: { [key: number]: number[] } = {};

  for (let rule of rules) {
    const [key, after] = rule.split("|").map((str) => parseInt(str));
    if (sequenceMapping[key]) {
      sequenceMapping[key].push(after);
    } else {
      sequenceMapping[key] = [after];
    }
  }

  const pages = updates.map((line) =>
    line.split(",").map((str) => parseInt(str))
  );

  let sum = 0;

  for (let update of pages) {
    let ordered = true;
    for (let i = 0; i < update.length; i++) {
      const page = update[i];
      const previous = update.slice(0, i);

      if (
        sequenceMapping[page] &&
        sequenceMapping[page].some((after) => previous.includes(after))
      ) {
        ordered = false;
        break;
      }
    }

    if (ordered) {
      const middle = Math.floor(update.length / 2);
      sum += update[middle];
    }
  }

  return sum;
}
