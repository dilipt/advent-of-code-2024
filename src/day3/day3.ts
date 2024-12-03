import fs from "fs";
import path from "path";

const mulExpression = new RegExp(/mul\(\d+,\d+\)/g);

export function part1(filename: string) {
  const input = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n");

  let result = 0;
  for (let line of input) {
    const matches = line.match(mulExpression);
    if (matches !== null) {
      for (let match of matches) {
        const numberMatches = match.match(/mul\((\d+),(\d+)\)/);
        const left = parseInt(numberMatches![1]);
        const right = parseInt(numberMatches![2]);
        result += left * right;
      }
    }
  }

  return result;
}

export function part2(filename: string) {
  const DO = "do()";
  const DONT = "don't()";

  let input = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .replace("\n", "");

  let result = 0;
  let isDo = true;
  while (true) {
    if (isDo) {
      const terminator = input.indexOf(DONT);
      const toParse = terminator > 0 ? input.slice(0, terminator) : input;
      const matches = toParse.match(mulExpression);
      if (matches !== null) {
        for (let match of matches) {
          const numberMatches = match.match(/mul\((\d+),(\d+)\)/);
          const left = parseInt(numberMatches![1]);
          const right = parseInt(numberMatches![2]);
          result += left * right;
        }

        if (terminator > 0) {
          input = input.slice(terminator + DONT.length);
        } else {
          break;
        }
      }
    } else {
      const terminator = input.indexOf(DO);
      if (terminator > 0) {
        input = input.slice(terminator + DO.length);
      } else {
        break;
      }
    }
    isDo = !isDo;
  }

  return result;
}
