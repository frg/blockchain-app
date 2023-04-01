import { sortByToString } from "src/utils/database/database";
import { SortBy } from "types/utils/api";

describe("sortByToString", () => {
    it("should convert a single SortBy object to a string with correct prefix", () => {
      const sortByArray: SortBy[] = [
        { field: "last_modified", order: "desc" },
      ];
  
      const result = sortByToString(sortByArray);
      expect(result).toBe("-last_modified");
    });
  
    it("should convert multiple SortBy objects to a comma-delimited string with correct prefixes", () => {
      const sortByArray: SortBy[] = [
        { field: "last_modified", order: "desc" },
        { field: "email", order: "asc" },
      ];
  
      const result = sortByToString(sortByArray);
      expect(result).toBe("-last_modified,+email");
    });
  
    it("should return an empty string for an empty input array", () => {
      const sortByArray: SortBy[] = [];
  
      const result = sortByToString(sortByArray);
      expect(result).toBe("");
    });
  });