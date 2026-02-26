import { getUserIds, addDays, generateRevisionSchedule } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("generateRevisionSchedule produces correct revision dates", () => {
  const topic = "Python practice";
  const baseDate = "2026-02-26"; // starting date
  const expected = [
    { topic: "Python practice", date: addDays(baseDate, 0) }, // 0 days = base date
    { topic: "Python practice", date: addDays(baseDate, 7) }, // +7 days
    { topic: "Python practice", date: addDays(baseDate, 30) }, // +30 days
    { topic: "Python practice", date: addDays(baseDate, 90) }, // +90 days
    { topic: "Python practice", date: addDays(baseDate, 180) }, // +180 days
    { topic: "Python practice", date: addDays(baseDate, 365) }, // +1 year
  ];
  const result = generateRevisionSchedule(topic, baseDate);
  assert.deepEqual(result, expected);
});

test("generateRevisionSchedule works for another topic and date", () => {
  const topic = "Codwars";
  const baseDate = "2026-03-01";
  const expected = [
    { topic: "Codwars", date: addDays(baseDate, 0) },
    { topic: "Codwars", date: addDays(baseDate, 7) },
    { topic: "Codwars", date: addDays(baseDate, 30) },
    { topic: "Codwars", date: addDays(baseDate, 90) },
    { topic: "Codwars", date: addDays(baseDate, 180) },
    { topic: "Codwars", date: addDays(baseDate, 365) },
  ];
  const result = generateRevisionSchedule(topic, baseDate);
  assert.deepEqual(result, expected);
});

// generateRevisionSchedule with end-of-year date
test("generateRevisionSchedule handles year rollover", () => {
  const topic = "End of Year";
  const baseDate = "2025-12-31"; 
  const expected = [
    { topic: "End of Year", date: addDays(baseDate, 0) },
    { topic: "End of Year", date: addDays(baseDate, 7) }, // Jan 7, 2026
    { topic: "End of Year", date: addDays(baseDate, 30) },
    { topic: "End of Year", date: addDays(baseDate, 90) },
    { topic: "End of Year", date: addDays(baseDate, 180) },
    { topic: "End of Year", date: addDays(baseDate, 365) },
  ];
  const result = generateRevisionSchedule(topic, baseDate);
  assert.deepEqual(result, expected);
});