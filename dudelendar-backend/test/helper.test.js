const helper = require("../helper");

describe("getOffset", () => {
  // Based choice
  // C1: Provide `currentPage`
  // c1b1: true
  // c1b2: false

  // C2: currentPage value
  // c2b1: less then 0
  // c2b2: equal 0
  // c2b3: greater then 0

  // C2: listPerPage value
  // c3b1: less then 0
  // c3b2: equal 0
  // c3b3: greater then 0

  // Based choice: (c1b1, c2b2, c3b2)
  // Derived cases: 1.(c1b2, c2b2, c3b2),
  //                2.(c1b1, c2b1, c3b2), 3.(c1b1, c2b3, c3b2)
  //                4.(c1b1, c2b2, c3b1), 5.(c1b1, c2b2, c3b3)

  // base case
  describe("getOffset Base case", () => {
    it("should return", () => {
      expect(helper.getOffset(0, 0)).toBe(0);
    });
  });

  // case 1 is not infeasible since currentPage value is provided

  // case 2 (c1b1, c2b1, c3b2)
  describe("case 2", () => {
    it("should return", () => {
      expect(helper.getOffset(-1, 0)).toBe(0);
    });
  });

  // case 3 (c1b1, c2b3, c3b2)
  describe("case 3", () => {
    it("should return", () => {
      expect(helper.getOffset(1, 0)).toBe(0);
    });
  });

  // case 4 (c1b1, c2b2, c3b1)
  describe("case 4", () => {
    it("should return", () => {
      expect(helper.getOffset(0, -1)).toBe(1);
    });
  });

  // case 5 (c1b1, c2b2, c3b3)
  describe("case 5", () => {
    it("should return", () => {
      expect(helper.getOffset(0, 1)).toBe(-1);
    });
  });
});

describe("emptyOrRows", () => {
  // ACoC
  // C1: rows is null
  // b1: true
  // b2: false
  // test cases: 1.c1b1, 2.c2b2

  describe("case 1: rows is empty ", () => {
    it("should return empty array", () => {
      var rows;
      var result = helper.emptyOrRows(rows);
      expect(result.length).toBe(0);
    });
  });

  describe("case 2: rows is not empty", () => {
    it("should return itself", () => {
      var rows = [1, 2, 3];
      var result = helper.emptyOrRows(rows);
      expect(result).toEqual(rows);
    });
  });
});

describe("renameKey", () => {
  // ACoC
  // C1: obj is null
  // b1: true
  // b2: false

  // C2: oldKey is not in obj
  // b1: true
  // b2: false

  // test cases: 1.(c1b1, c2b1), 2.(c1b1, c2b2), 3.(c1b2, c2b1), 4.(c1b2, c2b2)

  // cases 1 (c1b1, c2b1)
  describe("case 1: obj is null and oldKey is not in obj", () => {
    it("should throw TypeError", () => {
      var obj;
      expect(() => helper.renameKey(obj, "key1", "key2")).toThrow(TypeError);
    });
  });

  // cases 2 (c1b1, c2b2) is infeasible since oldKey cannot be in null obj

  // cases 3 (c1b2, c2b1)
  describe("case 3: obj is not null and oldKey is not in obj", () => {
    it("should return original obj", () => {
      var obj = { key2: "value2" };
      helper.renameKey(obj, "changeKey", "key1");
      expect(obj).toEqual({ key2: "value2" });
    });
  });

  // cases 4 (c1b2, c2b2)
  describe("case 4: obj is not null and oldKey is in obj", () => {
    it("should return modified obj", () => {
      var obj = { key1: "value1", key2: "value2" };
      helper.renameKey(obj, "key1", "changeKey");
      expect(obj).toEqual({ changeKey: "value1", key2: "value2" });
    });
  });
});
