// Setting up variables for our HTML elements using jQuery
const $taskTypeDropdown = $("#taskType");
const $soupForm = $("#soupForm");
const $fridgeForm = $("#fridgeForm");
const $recentList = $("#recentItemsNav");

// Function to generate a UUID
function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// Event listener for dropdown menu change
$taskTypeDropdown.on("change", function(event) {
  const selectedValue = $(this).val();
  console.log("Selected task type:", selectedValue);
  handleFormDisplay(selectedValue);
});

function handleFormDisplay(selectedValue) {
  const $soupForm = $("#soupForm");
  const $fridgeForm = $("#fridgeForm");

  if (selectedValue === "select") {
    $soupForm.hide();
    $fridgeForm.hide();
  } else if (selectedValue === "fridge") {
    $soupForm.hide();
    $fridgeForm.show();
  } else if (selectedValue === "logbook") {
    $soupForm.show();
    $fridgeForm.hide();
  } else {
    // Handle unexpected selections (optional)
    console.warn("Unexpected task type selected:", selectedValue);
  }

  console.log("Fridge Form Display:", $fridgeForm.css("display"));
  console.log("Soup Form Display:", $soupForm.css("display"));
}

// Define loadSubmittedSoupData as a global function
function loadSubmittedSoupData() {
  // Retrieve the soup data from local storage
  let soupData = JSON.parse(localStorage.getItem('soupData')) || [];

  // Get the element where you want to display the soup data
  const soupList = document.getElementById('soupList');
  console.log(soupList);

  // Clear the soup list
  soupList.innerHTML = '';

  // Iterate over the array in reverse
  for (let i = soupData.length - 1; i >= 0; i--) {
    const soup = soupData[i];
    const listItem = document.createElement('li');
    listItem.textContent = `${soup.name}: ${soup.ingredients}, ${soup.cuisine}, ${soup.prepTime}, ${soup.calories}, ${soup.date}, ${soup.notes}`;

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      // Remove the soup from the soupData array
      soupData.splice(i, 1);

      // Update local storage
      localStorage.setItem('soupData', JSON.stringify(soupData));

      // Remove the list item from the soup list
      listItem.remove();
    });

    // Add the delete button to the list item
    listItem.appendChild(deleteButton);

    // Add the list item to the soup list
    soupList.appendChild(listItem);
  }
}

$(document).ready(function() {
  // Event listener for soup form submission
  $("#soupFormDetails").on("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Gather the data from your form inputs
    const soupName = $('#soupNameInput').val();
    const soupIngredients = $('#ingredientsInput').val();
    const soupCuisine = $('#cuisineInput').val();
    const soupPrepTime = $('#prepTimeInput').val();
    const soupCalories = $('#caloriesInput').val();
    const soupDate = $('#dateInput').val();
    const soupNotes = $('#notesInput').val();

    // Create a soup object with this data
    const soupData = { 
      name: soupName, 
      ingredients: soupIngredients,
      cuisine: soupCuisine,
      prepTime: soupPrepTime,
      calories: soupCalories,
      date: soupDate,
      notes: soupNotes
    };

    // Retrieve the current soup data array from local storage
    const soupDataArray = JSON.parse(localStorage.getItem('soupData')) || [];

    // Add the new soup data to the array
    soupDataArray.push(soupData);

    // Save the updated array back to local storage
    localStorage.setItem('soupData', JSON.stringify(soupDataArray));

    // Add the new soup data to the recent items
  addToRecent("Soup", generateUUID(), soupName, `${soupCalories} calories`);

    // Redirect to logbook.html
    window.location.href = "logbook.html";
  });

   // Call the loadRecentItemsNav function on page load
   loadRecentItemsNav();
  }); 

document.addEventListener("DOMContentLoaded", function() {
  // Call the loadSubmittedSoupData function on page load
   loadSubmittedSoupData();
   });

// Function to handle fridge form submission
$("#fridgeFormDetails").on("submit", function(event) {
  event.preventDefault();
  const fridgeData = {
    ingredientName: $("#ingredientName").val(),
    foodGroup: $("#foodGroup").val(),
    quantity: $("#quantity").val(),
    unit: $("#unit").val(),
    calories: $("#calories").val()
  };

  console.log("Fridge item added:", fridgeData);
  // Call addToRecent function here
  addToRecent("Fridge", generateUUID(), fridgeData.ingredientName, `${fridgeData.quantity} ${fridgeData.unit}, ${fridgeData.calories} calories`);

  // a try-catch block to handle any errors that occur when parsing the JSON:
  function saveToLocalStorage(key, newItem) {
    let items;
    try {
      items = JSON.parse(localStorage.getItem(key));
      if (!Array.isArray(items)) {
        items = [];
      }
    } catch (error) {
      console.error(`Error parsing items from local storage: ${error}`);
      items = [];
    }
    items.push(newItem);
    localStorage.setItem(key, JSON.stringify(items));
  }

  saveToLocalStorage("fridgeForm", fridgeData);

  // Submit form to myfridge.html with form data as a URL parameter
  window.location.href = `myfridge.html?fridgeData=${encodeURIComponent(JSON.stringify(fridgeData))}`;
});

function addToRecent(type, id, name, detail) {
  console.log(`Adding to recent: ${type}, ${name}, ${detail}`);
  const $recentList = $("#recentItemsNav");
  if (!$recentList.length) {
    console.error("Could not find the 'recentItemsNav' list.");
    return;
  }

  const $item = $("<li>").attr("data-id", id).html(`${type}: ${name} (${detail}) <button onclick="deleteItem('${id}')">Delete</button>`);
  $recentList.append($item);

  saveRecentItemToLocalStorage({ id, type, name, detail });
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
    $("#soupNameInput").val(soupForm.soupNameInput);
    $("#cuisineInput").val(soupForm.cuisineInput);
    $("#prepTimeInput").val(soupForm.prepTimeInput);
    $("#ingredientsInput").val(soupForm.ingredientsInput);
    $("#caloriesInput").val(soupForm.caloriesInput);
    $("#dateInput").val(soupForm.dateInput);
    $("#notesInput").val(soupForm.notesInput);
  }

  const fridgeForm = JSON.parse(localStorage.getItem("fridgeForm"));
  if (fridgeForm) {
    $("#ingredientName").val(fridgeForm.ingredientName);
    $("#foodGroup").val(fridgeForm.foodGroup);
    $("#quantity").val(fridgeForm.quantity);
    $("#unit").val(fridgeForm.unit);
    $("#calories").val(fridgeForm.calories);
  }
}

function loadRecentItemsNav() {
  const recentItems = JSON.parse(localStorage.getItem("recentItems")) || [];
  const $recentItemsNav = $("#recentItemsNav");
  if (!$recentItemsNav.length) {
    console.error("Could not find the 'recentItemsNav' list.");
    return;
  }

  $recentItemsNav.empty(); // Clear existing items

  recentItems.forEach(item => {
    const $listItem = $("<li>").attr("data-id", item.id).html(`${item.type}: ${item.name} (${item.detail}) <button onclick="deleteItem('${item.id}')">Delete</button>`);
    $recentItemsNav.append($listItem);
  });
}

// Call the load functions on page load
$(window).on("load", () => {
  loadFromLocalStorage();
  loadRecentItemsNav();
});

//Ensures fridgeItems is an array of objects representing the items in the fridge
$(document).ready(function() {
  //Ensures fridgeItems is an array of objects representing the items in the fridge
  let fridgeItems = JSON.parse(localStorage.getItem("fridgeForm"));

  if (fridgeItems === null) {
    fridgeItems = [];
  } else if (!Array.isArray(fridgeItems)) {
    fridgeItems = [fridgeItems];
  }

  fridgeItems.forEach((item, index) => {
    console.log('foodGroup:', item.foodGroup);
    const foodGroupElement = document.getElementById(item.foodGroup);
    console.log('foodGroupElement:', foodGroupElement);
    if (foodGroupElement) {
      const itemElement = document.createElement("p");
      itemElement.textContent = `${item.ingredientName}: ${item.quantity} ${item.unit}, ${item.calories} calories`;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
      container.remove(); // remove the container
      deleteFridgeItem(item.ingredientName); // pass the name of the item to deleteFridgeItem
    });

      const container = document.createElement("div");
      container.appendChild(itemElement);
      container.appendChild(deleteButton);

      foodGroupElement.parentNode.insertBefore(container, foodGroupElement.nextSibling);
    }
  });
});

function deleteFridgeItem(name) {
  let fridgeItems = JSON.parse(localStorage.getItem("fridgeForm"));
  fridgeItems = fridgeItems.filter(item => item.ingredientName !== name); // delete the item with the given name
  localStorage.setItem("fridgeForm", JSON.stringify(fridgeItems));
  location.reload(); // reload the page to reflect the changes in the local storage
}

$(document).ready(function() {
  // Retrieve the soup data from local storage
  const soupData = JSON.parse(localStorage.getItem('soupData'));

  // Check if soupData exists
  if (soupData) {
    // Create a list item for each property in the soupData object
    for (let property in soupData) {
      $('#soupDataList').append(`<li>${property}: ${soupData[property]}</li>`);
    }
  }
});

// Function to delete an item from the recent list and Local Storage
function deleteItem(id) {
  const $recentList = $("#recentItemsNav");
  const $item = $recentList.find(`li[data-id="${id}"]`);
  if ($item.length) {
    $item.remove();

    // Remove the item from Local Storage
    const recentItems = JSON.parse(localStorage.getItem("recentItems")) || [];
    const updatedItems = recentItems.filter(i => i.id !== id);
    localStorage.setItem("recentItems", JSON.stringify(updatedItems));
  }
};
