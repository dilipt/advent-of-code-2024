import { describe, it, expect } from "vitest";
import { part1 } from "./day4";

describe("day 4 solutions", () => {
  it("should answer part 1 test correctly", () => {
    expect(part1("test-input.txt")).toEqual(18);
  });
});