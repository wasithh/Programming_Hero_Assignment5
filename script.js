const loginSection = document.getElementById("login-section");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const mainApp = document.getElementById("main-app");
const issuesContainer = document.getElementById("issues-container");
// toggle elements
const tabAll = document.getElementById("tab-all");
const tabOpen = document.getElementById("tab-open");
const tabClosed = document.getElementById("tab-closed");

// empty array to fetch data globally
let allIssuesData = [];

// Hides the login page and shows main section
loginBtn.addEventListener("click", function (event) {
  const typedUsername = usernameInput.value;
  const typedPassword = passwordInput.value;

  if (typedUsername === "admin" && typedPassword === "admin123") {
    loginSection.classList.add("hidden");
    mainApp.classList.remove("hidden");

    // user loggin in so showing the data
    fetchIssues();
  }
});

// showing the cards using async
async function fetchIssues() {
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();

  // checking if it is a list or and object
  if (Array.isArray(data)) {
    allIssuesData = data;
  } else {
    allIssuesData = data.data;
  }
  // fetching cards
  renderIssues(allIssuesData);
}

// rendering the cards
function renderIssues(issues) {
  issuesContainer.innerHTML = "";

  // counting issue cards
  const issueCountElement = document.getElementById("issue-count");
  if (issueCountElement) {
    issueCountElement.innerText = issues.length;
  }
  // looping the cards
  issues.forEach(function (issue) {
    const formattedDate = issues.createdAt
      ? new Date(issues.createdAt).toLocaleDateString()
      : "Unknown Date";

    const topBorderColor =
      issue.status === "open" ? "border-green-500" : "border-red-500";
    const actualId = issue.id || issue._id || "0000";
    const displayId = String(actualId).slice(-4);
    const author = issue.author || "Unknown";

    // priority colors
    let priorityColor = "bg-gray-200 text-gray-700";
    if (issues.priority === "High") priorityColor = "bg-red-100 text-red-600";
    if (issue.priority === "Medium")
      priorityColor = "bg-yellow-100 text-yellow-600";

    // closed or open
    const statusIcon =
      issue.status === "open"
        ? "./B13-A5-Github-Issue-Tracker/assets/Open-Status.png"
        : "B13-A5-Github-Issue-Tracker/assets/Closed-Status.png";

    //Labels HTML
    let labelsHTML = "";

    const cardHTML = `
      <div class="card bg-white border-t-4 ${topBorderColor} shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onclick="openModal('${actualId}')">
        <div class="card-body p-4">
          <div class="flex justify-between items-start mb-2">
            
            <img src="${statusIcon}" alt="${issue.status} icon" class="w-5 h-5 object-contain" />
            
            <span class="text-[10px] font-bold px-2 py-1 rounded-full ${priorityColor} uppercase">${issue.priority || "Normal"}</span>
          </div>
          <h2 class="card-title text-sm font-bold text-gray-800 line-clamp-2 leading-tight">${issue.title}</h2>
          <p class="text-xs text-gray-500 line-clamp-2 mt-1 mb-3">${issue.description}</p>
          <div class="flex flex-wrap gap-1 mb-4">
            ${labelsHTML}
          </div>
          <div class="mt-auto border-t border-gray-50 pt-2 flex flex-col text-[10px] text-gray-400">
            <span>#${displayId} by ${author}</span>
            <span>${formattedDate}</span>
          </div>
        </div>
      </div>
    `;
    issuesContainer.innerHTML += cardHTML;
  });
}

// tab styling
function setActiveTab(clickedTab) {
  const allTabs = [tabAll, tabOpen, tabClosed];

  // 1. Reset all tabs to look gray and inactive
  allTabs.forEach(function (tab) {
    tab.classList.remove("tab-active");
    tab.classList.add("text-gray-500");
  });

  // 2. Make the clicked tab look active
  clickedTab.classList.add("tab-active");
  clickedTab.classList.remove("text-gray-500");
}

// event listeners for tabs

// all tab
tabAll.addEventListener("click", function () {
  setActiveTab(tabAll);
  renderIssues(allIssuesData);
});

// open tab
tabOpen.addEventListener("click", function () {
  setActiveTab(tabOpen);

  const openIssues = allIssuesData.filter(function (issue) {
    return issue.status === "open";
  });
  renderIssues(openIssues);
});

// closed tab
tabClosed.addEventListener("click", function () {
  setActiveTab(tabClosed);
  const closedIssues = allIssuesData.filter(function (issue) {
    return issue.status === "closed";
  });
  renderIssues(closedIssues);
});
