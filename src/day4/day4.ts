import fs from "fs";
import path from "path";

type WordSearchLetter = "X" | "M" | "A" | "S";

export function part1(filename: string) {
  let wordSearch = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .map((line) => line.split(""));

  const ROWS = wordSearch.length;
  const COLS = wordSearch[0].length;

  const letterPositions: { [key in WordSearchLetter]: number[][] } = {
    X: [],
    M: [],
    A: [],
    S: [],
  };

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      letterPositions[wordSearch[i][j] as WordSearchLetter].push([i, j]);
    }
  }

  const xmasCount = letterPositions["X"].length;

  const possibleMs = [];
  for (let [i, j] of letterPositions["X"]) {
    possibleMs.push([i - 1, j - 1]);
    possibleMs.push([i - 1, j]);
    possibleMs.push([i - 1, j + 1]);
    possibleMs.push([i, j - 1]);
    possibleMs.push([i, j + 1]);
    possibleMs.push([i + 1, j - 1]);
    possibleMs.push([i + 1, j]);
    possibleMs.push([i + 1, j + 1]);
  }

  const legalPossibleMs = possibleMs.filter(
    ([i, j]) => i >= 0 || j >= 0 || i < ROWS || j < COLS
  );

  const XMs = legalPossibleMs.filter(([i, j]) =>
    letterPositions["M"].some(([k, l]) => k === i && j === l)
  );

  console.log(XMs);
}
