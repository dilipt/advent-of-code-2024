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

export function p2(filename: string) {
  const reports = fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .map((line) => line.split(" ").map((ch) => parseInt(ch)));

  let unsafeReports: { [key: number]: number[][] } = {};
  let safeCount = 0;

  for (let i = 0; i < reports.length; i++) {
    let report = reports[i];
    let safe = true;
    const isAsc = report[0] < report[1];

    for (let j = 0; j < report.length - 1; j++) {
      if (!isSafe(report[j], report[j + 1], isAsc)) {
        safe = false;
        let unsafeLeft = [...report];
        let unsafeRight = [...report];
        unsafeLeft.splice(j, 1);
        unsafeRight.splice(j + 1, 1);
        unsafeReports[i] = [unsafeLeft, unsafeRight];
        break;
      }
    }

    if (safe) {
      safeCount++;
    }
  }

  console.log(safeCount);
  console.log(Object.values(unsafeReports).flat().length);

  for (let [key, [try1, try2]] of Object.entries(unsafeReports)) {
    let safe = true;
    for (let i = 0; i < try1.length - 1; i++) {
      const isAsc = try1[0] < try1[1];
      if (!isSafe(try1[i], try1[i+1], isAsc)) {
        safe = false;
        break;
      }
    }
    if (safe) {
      safeCount++;
    } else {
      safe = true;
      for (let i = 0; i < try2.length - 1; i++) {
        const isAsc = try2[0] < try2[1];
        if (!isSafe(try2[i], try2[i + 1], isAsc)) {
          safe = false;
          break;
        }
      }
      if (safe) {
        safeCount++;
      }
    }
  }

  console.log(safeCount);
}

function isSafe(left: number, right: number, isAsc: boolean): boolean {
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
