export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}
export function addMonths(dateString, monthsToAdd){
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1 + monthsToAdd, day));
  const expectedMonth = ((month - 1 + monthsToAdd) % 12 + 12) % 12;
  if (date.getUTCMonth() !== expectedMonth) {
    date.setUTCDate(0); // 0 means "go back to last day of previous month"
  }

  return date.toISOString().split("T")[0];
}


export function generateRevisionSchedule(topic, baseDate) {
  return [
    { topic, date: addDays(baseDate, 7) },    // 1 week
    { topic, date: addMonths(baseDate, 1) },   // 1 calendar month
    { topic, date: addMonths(baseDate, 3) },   // 3 calendar months
    { topic, date: addMonths(baseDate, 6) },   // 6 calendar months
    { topic, date: addMonths(baseDate, 12) },  // 1 year
  ];
}
  // Loop through intervals and calculate each revision date

  //intervals.forEach((days) => {
    // ← use each number as "days"

    // Add the topic and date as an object to the revisions array
    //revisions.push({ topic, date: addDays(baseDate, days) });
 // });
  //return revisions;


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
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() +1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Format date like "23 May 2023"
export function formatDate(dateString) {
  const date = parseDateOnly(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
