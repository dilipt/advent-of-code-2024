import { describe, expect, it } from "vitest";
import { part2, part1 } from "./day2";

describe("day 2", () => {
  it("should return correct value for part 1 test input", () => {
    expect(part1("test-input.txt")).toEqual(2);
  });

  it("should return corret value for part 1 real input", () => {
    expect(part1("real-input.txt")).toEqual(411);
  });

  it("should return correct value for part 2 test input", () => {
    expect(part2("test-input.txt")).toEqual(4);
  });

  it("should return correct value for part 2 real input", () => {
    expect(part2("real-input.txt")).toEqual(465);
  });
});
