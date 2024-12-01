import { describe, it, expect } from "vitest";
import { day1part1, day1part2 } from "./day1";

describe("day 1", () => {
  it("should do part 1 test input", () => {
    expect(day1part1("test-input.txt")).toEqual(11);
  });

  it("should do part 1 real input", () => {
    expect(day1part1("real-input.txt")).toEqual(2378066);
  });

  it("should do part 2 test input", () => {
    expect(day1part2("test-input.txt")).toEqual(31);
  });

  it("should do part 2 real input", () => {
    expect(day1part2("real-input.txt")).toEqual(18934359);
  });
});