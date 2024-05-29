// Setting up variables for our HTML elements using DOM selection
const taskTypeDropdown = document.getElementById("taskType");

// Function to generate a UUID
function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// Event listener for dropdown menu change
taskTypeDropdown.addEventListener("change", function(event) {
  const selectedValue = event.target.value;
  console.log("Selected task type:", selectedValue);
  handleFormDisplay(selectedValue);
});

function handleFormDisplay(selectedValue) {
  const soupForm = document.getElementById("soupForm");
  const fridgeForm = document.getElementById("fridgeForm");

  if (selectedValue === "select") {
    soupForm.style.display = "none";
    fridgeForm.style.display = "none";
  } else if (selectedValue === "fridge") {
    soupForm.style.display = "none";
    fridgeForm.style.display = "block";
  } else if (selectedValue === "logbook") {
    soupForm.style.display = "block";
    fridgeForm.style.display = "none";
  } else {
    // Handle unexpected selections (optional)
    console.warn("Unexpected task type selected:", selectedValue);
  }

  console.log("Fridge Form Display:", fridgeForm.style.display);
  console.log("Soup Form Display:", soupForm.style.display);
}

// Function to handle form submission for soup
function handleSoupFormSubmission(event) {
  event.preventDefault();
  let soupNameInput = document.getElementById("soupNameInput").value;
  let cuisineInput = document.getElementById("cuisineInput").value;
  let uuid = generateUUID(); // Generate a unique ID for the soup
  let prepTimeInput = document.getElementById("prepTimeInput").value;
  let ingredientsInput = document.getElementById("ingredientsInput").value;
  let caloriesInput = document.getElementById("caloriesInput").value;
  let dateInput = document.getElementById("dateInput").value;
  let notesInput = document.getElementById("notesInput").value;

  console.log("Soup added:", { uuid, soupNameInput, cuisineInput, prepTimeInput, ingredientsInput, caloriesInput, dateInput, notesInput });
  addToRecent("Soup", uuid, soupNameInput, `${cuisineInput}, ${prepTimeInput} mins`, dateInput, { prepTimeInput, ingredientsInput, caloriesInput, dateInput, notesInput });
  saveToLocalStorage("Soup", { uuid, soupNameInput, cuisineInput, prepTimeInput, ingredientsInput, caloriesInput, dateInput, notesInput });
}

// Event listener for soup form submission
document.getElementById("soupFormDetails").addEventListener("submit", handleSoupFormSubmission);

// Inside addToRecent function
function addToRecent(type, id, name, detail, date, extraData) {
  console.log(`Adding to recent: ${type}, ${name}, ${detail}`);
  const recentList = document.getElementById("recentItemsNav");
  if (!recentList) {
    console.error("Could not find the 'recentItemsNav' list.");
    return;
  }

  let item = document.createElement("li");
  item.setAttribute("data-id", id);
  item.innerHTML = `${type}: ${name} (${detail}) <button onclick="deleteItem('${id}')">Delete</button>`; // Add delete button
  recentList.appendChild(item);

  saveRecentItemToLocalStorage({ id, type, name, detail, date, extraData }); // Save to localStorage
}

// Function to handle fridge form submission
document.getElementById("fridgeFormDetails").addEventListener("submit", function(event) {
  event.preventDefault();
  let ingredientName = document.getElementById("ingredientName").value;
  let foodGroup = document.getElementById("foodGroup").value;
  let quantity = document.getElementById("quantity").value;
  let unit = document.getElementById("unit").value;
  let calories = document.getElementById("calories").value;
  let protein = document.getElementById("protein").value;
  let fat = document.getElementById("fat").value;
  let carbohydrates = document.getElementById("carbohydrates").value;
  let fibre = document.getElementById("fibre").value;
  let sugar = document.getElementById("sugar").value;
  addFridgeItem(ingredientName, foodGroup, quantity, unit, calories, protein, fat, carbohydrates, fibre, sugar);
  addToRecent("Fridge", ingredientName, `${quantity} ${unit}`, `${calories} calories, ${protein} protein, ${fat} fat, ${carbohydrates} carbohydrates, ${fibre} fibre, ${sugar} sugar`);
  saveToLocalStorage("Fridge", {
    ingredientName,
    foodGroup,
    quantity,
    unit,
    calories,
    protein,
    fat,
    carbohydrates,
    fibre,
    sugar
  });
});

function addFridgeItem(ingredientName, foodGroup, quantity, unit, calories, protein, fat, carbohydrates, fibre, sugar) {
  let fridgeItem = {
    ingredientName,
    foodGroup,
    quantity,
    unit,
    calories,
    protein,
    fat,
    carbohydrates,
    fibre,
    sugar
  };
  console.log("Fridge item added:", fridgeItem);
  // Add additional code to handle adding the fridge item to your data structure or UI
}

function addToRecent(type, id, name, detail) {
  console.log(`Adding to recent: ${type}, ${name}, ${detail}`);
  const recentList = document.getElementById("recentItemsNav");
  if (!recentList) {
    console.error("Could not find the 'recentItemsNav' list.");
    return;
  }

  let item = document.createElement("li");
  item.setAttribute("data-id", id);
  item.innerHTML = `${type}: ${name} (${detail}) <button onclick="deleteItem('${id}')">Delete</button>`; // Add delete button
  recentList.appendChild(item);

  saveRecentItemToLocalStorage({ id, type, name, detail }); // Save to localStorage
}

function saveRecentItemToLocalStorage(item) {
  const recentItems = JSON.parse(localStorage.getItem("recentItems")) || [];
  recentItems.push(item);
  localStorage.setItem("recentItems", JSON.stringify(recentItems));
}

function saveToLocalStorage(type, data) {
  let storageKey;
  if (type === "Soup") {
    storageKey = "soupForm";
  } else if (type === "Fridge") {
    storageKey = "fridgeForm";
  } else {
    console.error("Invalid form type:", type);
    return;
  }
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function loadFromLocalStorage() {
  const soupForm = JSON.parse(localStorage.getItem("soupForm"));

  if (soupForm) {
    document.getElementById("soupNameInput").value = soupForm.soupNameInput;
    document.getElementById("cuisineInput").value = soupForm.cuisineInput;
    // Add other input field assignments here if needed
  }
  if (fridgeForm) {
    document.getElementById("ingredientName").value = fridgeForm.ingredientName;
    document.getElementById("foodGroup").value = fridgeForm.foodGroup;
    document.getElementById("quantity").value = fridgeForm.quantity;
    document.getElementById("unit").value = fridgeForm.unit;
    document.getElementById("calories").value = fridgeForm.calories;
    document.getElementById("protein").value = fridgeForm.protein;
    document.getElementById("fat").value = fridgeForm.fat;
    document.getElementById("carbohydrates").value = fridgeForm.carbohydrates;
    document.getElementById("fibre").value = fridgeForm.fibre;
    document.getElementById("sugar").value = fridgeForm.sugar;
  }
}

function loadRecentItemsNav() {
  const recentItems = JSON.parse(localStorage.getItem("recentItems")) || [];
  const recentItemsNav = document.getElementById("recentItemsNav");
  if (!recentItemsNav) {
    console.error("Could not find the 'recentItemsNav' list.");
    return;
  }

  recentItemsNav.innerHTML = ""; // Clear existing items

  for (const item of recentItems) {
    let listItem = document.createElement("li");
    listItem.setAttribute("data-id", item.id);
    listItem.innerHTML = `${item.type}: ${item.name} (${item.detail}) <button onclick="deleteItem('${item.id}')">Delete</button>`; // Add delete button
    recentItemsNav.appendChild(listItem);
  }
}

// Call the load functions on page load
window.addEventListener("load", () => {
  loadFromLocalStorage();
  loadRecentItemsNav();
});

// Function to delete an item from the recent list and Local Storage
function deleteItem(id) {
  const recentList = document.getElementById("recentItemsNav");
  const item = recentList.querySelector(`li[data-id="${id}"]`);
  if (item) {
    recentList.removeChild(item);

    // Remove the item from Local Storage
    const recentItems = JSON.parse(localStorage.getItem("recentItems")) || [];
    const updatedItems = recentItems.filter(i => i.id !== id);
    localStorage.setItem("recentItems", JSON.stringify(updatedItems));
  }
}
