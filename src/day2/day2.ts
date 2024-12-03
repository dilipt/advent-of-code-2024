import fs from "fs";
import path from "path";

export function part1(filename: string) {
  const reports = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .map((line) => line.split(" ").map((ch) => parseInt(ch)));

  return reports.reduce(
    (safeCount, report) => (isReportSafe(report) ? safeCount + 1 : safeCount),
    0
  );
}

export function part2(filename: string) {
  const reports = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .map((line) => line.split(" ").map((ch) => parseInt(ch)));

  let quarantine: number[][] = [];
  let safeCount = 0;

  for (let i = 0; i < reports.length; i++) {
    let report = reports[i];
    if (isReportSafe(report)) {
      safeCount++;
    } else {
      quarantine.push(report);
    }
  }

  for (let report of quarantine) {
    for (let i = 0; i < report.length; i++) {
      let copy = [...report];
      copy.splice(i, 1);
      if (isReportSafe(copy)) {
        safeCount++;
        break;
      }
    }
  }

  return safeCount;
}

function isPairSafe(left: number, right: number, isAsc: boolean): boolean {
  if (left === right) {
    return false;
  }

  const isPairAsc = left < right;
  if ((isAsc && !isPairAsc) || (!isAsc && isPairAsc)) {
    return false;
  }

  const diff = Math.abs(left - right);
  if (diff < 1 || diff > 3) {
    return false;
  }

  return true;
}

function isReportSafe(report: number[]) {
  let safe = true;
  const isAsc = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    if (!isPairSafe(report[i], report[i + 1], isAsc)) {
      safe = false;
      break;
    }
  }
  return safe;
}
