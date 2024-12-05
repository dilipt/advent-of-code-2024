import { describe, it , expect } from "vitest";
import { part1 } from "./day5";

describe("day 5", () => {
  it("should return correct answer for test input", () => {
    expect(part1("test-input.txt")).toEqual(143);
  });

  it("should return correct answer for real input", () => {
    expect(part1("real-input.txt")).toEqual(7198);
  });
});