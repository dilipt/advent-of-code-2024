import fs from "fs";
import path from "path";

export function part1(filename: string) {
  const reports = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .map((line) => line.split(" ").map((ch) => parseInt(ch)));

  return reports.reduce((safeCount, report) => {
    if (report[0] === report[1]) {
      return safeCount;
    }

    const isAsc = report[0] < report[1];
    for (let i = 0; i < report.length - 1; i++) {
      const currentPairIsAsc = report[i] < report[i + 1];
      if ((isAsc && !currentPairIsAsc) || (!isAsc && currentPairIsAsc)) {
        return safeCount;
      }
      const diff = Math.abs(report[i] - report[i + 1]);
      if (diff < 1 || diff > 3) {
        return safeCount;
      }
    }

    return safeCount + 1;
  }, 0);
}

export function part2(filename: string) {
  const reports = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .map((line) => line.split(" ").map((ch) => parseInt(ch)));

  const unsafeReports = [];
  let safeCount = 0;
  for (let report of reports) {
    if (report[0] === report[1]) {
      // TODO: push both slice(1) and splice(1, 1) and test both.
      unsafeReports.push(report.slice(1));
      continue;
    }

    let safe = true;
    const isAsc = report[0] < report[1];
    for (let i = 0; i < report.length - 1; i++) {
      const isCurrentPairAsc = report[i] < report[i + 1];
      if ((isAsc && !isCurrentPairAsc) || (!isAsc && isCurrentPairAsc)) {
        // TODO: push both splice(i, 1) and splice(i + 1, 1) and test both.
        report.splice(i, 1);
        unsafeReports.push(report);
        safe = false;
        break;
      }
      const diff = Math.abs(report[i] - report[i + 1]);
      if (diff < 1 || diff > 3) {
        // TODO: push both splice(i, 1) and splice(i + 1, 1) and test both.
        report.splice(i + 1, 1);
        unsafeReports.push(report);
        safe = false;
        break;
      }
    }

    if (safe) {
      safeCount++;
    }
  }

  return unsafeReports.reduce((count, report) => {
    if (report[0] === report[1]) {
      return count;
    }

    const isAsc = report[0] < report[1];
    for (let i = 0; i < report.length - 1; i++) {
      const currentPairIsAsc = report[i] < report[i + 1];
      if ((isAsc && !currentPairIsAsc) || (!isAsc && currentPairIsAsc)) {
        console.log(`unsafe: ${JSON.stringify(report)}`);
        return count;
      }
      const diff = Math.abs(report[i] - report[i + 1]);
      if (diff < 1 || diff > 3) {
        console.log(`unsafe: ${JSON.stringify(report)}`);
        return count;
      }
    }

    console.log(`safe! ${JSON.stringify(report)}`);
    return count + 1;
  }, safeCount);
}
