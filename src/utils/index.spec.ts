import { range } from "lodash";
import { chunkArray, sleep } from "./index";

describe("Index utils", () => {
  describe("chunkArray", () => {
    it("will break an array down into n number of chunks", () => {
      expect(chunkArray([0, 1, 2, 3, 4, 5], 2)).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
      ]);
    });
  });

  describe("sleep", () => {
    it("will sleep for n number of seconds", async () => {
      expect(await sleep(10));
    });
  });

  describe("range", () => {
    it("will generate an array of numbers from 0 to n", () => {
      expect(range(3)).toEqual([0, 1, 2]);
    });
  });
});
