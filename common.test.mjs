import { getUserIds, addDays, generateRevisionSchedule, formatDate } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("generateRevisionSchedule produces correct revision dates", () => {

  const result = generateRevisionSchedule("Python practice", "2026-02-26");
  assert.deepEqual(result, [

    { topic: "Python practice", date: "2026-03-05" }, // +7 days //    

    { topic: "Python practice", date: "2026-03-26" }, // +30 days
    { topic: "Python practice", date: "2026-05-26" }, // +90 days
    { topic: "Python practice", date: "2026-08-26" },// +180 days
    { topic: "Python practice", date: "2027-02-26" }, // +1 year
  ]);
});
    


test("generateRevisionSchedule works for another topic and date", () => {

  const result= generateRevisionSchedule("Codewars", "2026-03-01");
    assert.deepEqual(result, [
    { topic: "Codewars", date: "2026-03-08" },
    { topic: "Codewars", date: "2026-04-01" },
    { topic: "Codewars", date: "2026-06-01" },
    { topic: "Codewars", date: "2026-09-01" },
    { topic: "Codewars", date: "2027-03-01" },
    ]);
  });
  
// generateRevisionSchedule with end-of-year date
test("generateRevisionSchedule handles year rollover", () => {
  const result = generateRevisionSchedule("End of Year", "2025-12-31");
  assert.deepEqual(result, [
    { topic: "End of Year", date: "2026-01-07"  }, // Jan 7, 2026
    { topic: "End of Year", date: "2026-01-31" },
    { topic: "End of Year", date: "2026-03-31" },
    { topic: "End of Year", date: "2026-06-30" },
    { topic: "End of Year", date: "2026-12-31" },
  ]);
});


// Test for formatDate
test("formatDate converts YYYY-MM-DD to DD Month YYYY", () => {
  // Arrange: prepare input and expected output
  const inputDate = "2026-02-26"; // YYYY-MM-DD
  const expected = "26 February 2026"; // human-readable

  // Act: call the function
  const result = formatDate(inputDate);

  // Assert: check if result matches expected
  assert.deepEqual(result, expected);
});