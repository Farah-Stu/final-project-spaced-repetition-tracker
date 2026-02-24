// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData, addData } from "./storage.mjs";

window.onload = function () {
  const userSelect = document.getElementById("userSelect");
  const agendaContainer = document.getElementById("agendaContainer");

  const users = getUserIds();
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

  userSelect.addEventListener("change", function () {
    const userId = userSelect.value;
    const agenda = getData(userId);
    agendaContainer.innerHTML = "";

    if (!agenda || agenda.length === 0) {
      agendaContainer.textContent = "No data available for this user";
    } else {
      agenda.forEach((item) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${item.topic} - ${item.date}`;
        agendaContainer.appendChild(paragraph);
      });
    }
  });
};
