import { ID } from "../id";
import { describe, expect, test } from "@jest/globals";

describe("ID", () => {
  test.each([
    { length: 10 },
    { length: 100 },
    { length: 1000 },
    { length: 10000 },
    { length: 100000 },
  ])("ID is unique", ({ length }) => {
    const ids: ID[] = Array.from({ length }, () => new ID());

    expect(new Set(ids).size).toBe(ids.length);
  });
});
