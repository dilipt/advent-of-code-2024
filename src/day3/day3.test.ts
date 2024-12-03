import { describe, it, expect } from "vitest";
import { part1, part2 } from "./day3";

describe("day 3 solutions", () => {
  it("should solve part 1 test input", () => {
    expect(part1("test-input.txt")).toEqual(161);
  });

  it("should solve part 1 real input", () => {
    expect(part1("real-input.txt")).toEqual(189527826);
  });

  it("should solve part 2 test input", () => {
    expect(part2("test-part-2.txt")).toEqual(48);
  });

  it("should solve part 2 real input", () => {
    expect(part2("real-input.txt")).toEqual(63013756);
  });
});