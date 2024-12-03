import fs from "fs";
import path from "path";

const mulExpression = /mul\(\d+,\d+\)/g;

export function part1(filename: string) {
  let input = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .replace("\n", "");

  let result = 0;
  const matches = input.match(mulExpression);
  if (matches !== null) {
    for (let exp of matches) {
      const numberMatches = exp.match(/mul\((\d+),(\d+)\)/);
      const left = parseInt(numberMatches![1]);
      const right = parseInt(numberMatches![2]);
      result += left * right;
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
      const toMatch = terminator > 0 ? input.slice(0, terminator) : input;
      const matches = toMatch.match(mulExpression);
      if (matches !== null) {
        for (let match of matches) {
          const numberCaptures = match.match(/mul\((\d+),(\d+)\)/);
          const left = parseInt(numberCaptures![1]);
          const right = parseInt(numberCaptures![2]);
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
