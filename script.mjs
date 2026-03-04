import { getUserIds } from "./common.mjs";
import { getData, addData } from "./storage.mjs";
import {
  generateRevisionSchedule,
  sortTopicsByDate,
  getTodayUTC,
  formatDate,
} from "./common.mjs";



function showAgenda(userId) {
  const agendaContainer = document.getElementById("agendaContainer");
  const agenda = getData(userId); // fetch data for this user
  agendaContainer.innerHTML = ""; // clear previous content

  if (!agenda || agenda.length === 0) {
    agendaContainer.textContent = "No data available for this user";
    return;
  }

    // Sort ascending so the soonest revision appears first
  sortTopicsByDate(agenda);

  // Get today's date in YYYY-MM-DD format
  const today = getTodayUTC();

  // Filter only future or today's revision dates
  const upcoming = agenda.filter((item) => item.date >= today);

  // Loop through filtered (future) revisions ONLY
  upcoming.forEach((item) => {
    const paragraph = document.createElement("p"); // Create paragraph element
    paragraph.textContent = `${item.topic} - ${formatDate(item.date)}`;
    agendaContainer.appendChild(paragraph);
  });
}

window.onload = function () {
  const userSelect = document.getElementById("userSelect");
  const form = document.getElementById("addTopicForm");
  const topicInput = document.getElementById("topic");
  const dateInput = document.getElementById("date");
  const users = getUserIds();

  // FIX: Set default date to today
  dateInput.valueAsDate = new Date();

  // Function to fill dropdown with user ids

  function populateUserDropdown() {
    users.forEach((user) => {
      const option = document.createElement("option");
      option.textContent = `User ${user}`;
      option.value = user;
      userSelect.appendChild(option);
    });
  }
  populateUserDropdown();

  // Add event listener to dropdown to get selected value

  userSelect.addEventListener("change", function () {
    //userSelect.innerHTML= "";
    const userId = userSelect.value;
    if (userId) {
      showAgenda(userSelect.value);
    }
  });

  // form submit listener
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const userId = userSelect.value;
    const topic = topicInput.value;
    const date = dateInput.value;

    // Validate user selection
    if (userId === "") {
      alert("Please select a user");
      return;
    }

    // validate topic input
    if (topic === "") {
      alert("Please enter a topic");
      return;
    }

    // validate date input

    if (date === "") {
      alert("Please enter a date");
      return;
    }

    // generate revision dates and save
    const newData = generateRevisionSchedule(topic, date);
    addData(userId, newData);

    //Refresh agenda
    showAgenda(userId);

    // reset form
    form.reset();
    dateInput.valueAsDate = new Date();
  });
};
