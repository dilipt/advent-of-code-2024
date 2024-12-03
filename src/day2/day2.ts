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

  const unsafeReports: { [key: number]: number[][] } = {};
  let safeCount = 0;

  for (let j = 0; j < reports.length; j++) {
    let report = reports[j];
    if (report[0] === report[1]) {
      unsafeReports[j] = [report.slice(1)];
      continue;
    }

    let safe = true;
    const isAsc = report[0] < report[1];
    for (let i = 0; i < report.length - 1; i++) {
      const isCurrentPairAsc = report[i] < report[i + 1];
      if ((isAsc && !isCurrentPairAsc) || (!isAsc && isCurrentPairAsc)) {
        const unsafe1 = [...report];
        const unsafe2 = [...report];
        unsafe1.splice(i, 1);
        unsafe2.splice(i + 1, 1);
        unsafeReports[j] = [unsafe1, unsafe2];
        safe = false;
        break;
      }
      const diff = Math.abs(report[i] - report[i + 1]);
      if (diff < 1 || diff > 3) {
        const unsafe1 = [...report];
        const unsafe2 = [...report];
        unsafe1.splice(i, 1);
        unsafe2.splice(i + 1, 1);
        unsafeReports[j] = [unsafe1, unsafe2];
        safe = false;
        break;
      }
    }

    if (safe) {
      safeCount++;
    }
  }

  for (const [key, unsafes] of Object.entries(unsafeReports)) {
    for (const report of unsafes) {
      if (report[0] === report[1]) {
        continue;
      }

      let safe = true;
      const isAsc = report[0] < report[1];
      for (let i = 0; i < report.length - 1; i++) {
        const currentPairIsAsc = report[i] < report[i + 1];
        if ((isAsc && !currentPairIsAsc) || (!isAsc && currentPairIsAsc)) {
          console.log(`${key} unsafe: ${JSON.stringify(report)}`);
          safe = false;
          break;
        }
        const diff = Math.abs(report[i] - report[i + 1]);
        if (diff < 1 || diff > 3) {
          console.log(`${key} unsafe: ${JSON.stringify(report)}`);
          safe = false;
          break;
        }
      }

      if (safe) {
        console.log(`${key} safe! ${JSON.stringify(report)}`);
        safeCount++;
        break;
      }
    }
  }

  return safeCount;
}
