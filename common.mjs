export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

export function generateRevisionSchedule(topic, baseDate) {

  const intervals = [0, 7, 30, 90, 180, 365]; // days only
const revisions = [];    

    // Loop through intervals and calculate each revision date

  intervals.forEach((days => { // ← use each number as "days"

    // Add the topic and date as an object to the revisions array
    revisions.push({topic, date:addDays(baseDate, days)});
  }));
  return revisions;
}

  // the earliest date comes first (chronological order).
export function sortTopicsByDate(userData) {
  userData.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Convert "YYYY-MM-DD" string into a UTC Date object
export function parseDateOnly(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

// Add days safely in UTC
export function addDays(dateString, daysToAdd) {
  const date = parseDateOnly(dateString);
  date.setUTCDate(date.getUTCDate() + daysToAdd);
  return date.toISOString().split("T")[0];
}

// Get today's date in UTC (YYYY-MM-DD)
export function getTodayUTC() {
  return new Date().toISOString().split("T")[0];
}

// Format date like "23 May 2023"
export function formatDate(dateString) {
  const date = parseDateOnly(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}