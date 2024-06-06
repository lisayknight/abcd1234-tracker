# lkni4137-tracker

## Browser testing:
This project has been tested and verified to work on the following browsers:


- Google Chrome
- Microsoft Edge
- Safari

## Deployment Procedures

** My Repository cloned from https://github.com/hamsall/abcd1234-tracker **

Open a terminal to the directory (folder) you want to store your code repository and type the following command:
git clone https://github.com/lisayknight/abcd1234-tracker 

1. Use npm install command
2. Use npm run dev command
3. Run https://localhost:1234 in browser
4. Close your dev server by pressing 'Control + C'

** Future Improvements **

I would have loved to spend more time figuring out a more aesthetic and practical way of representing and displaying my data. I envisioned each form submission to appear as it's own container, then when you click on it, it would open up to a separate screen and go into the data in detail; including nutritional information, the entire recipe, and suggestions for the next cook.

## Web App Design

‘Simmer & Sip’ is a web app that monitors caloric intake through soups. The general purpose of ‘Simmer & Sip’ is to help young adults, especially students, effortlessly maintain a healthy diet. Users are able to log soup recipes, including ingredients and macro nutrients. The nutritional information of the soup ingredients will be manually entered by the user. This is to encourage food education and health consciousness. There is also a section of the app to track ingredients the user has on hand. This allows for efficient food preparation and planning. 

### Design Pattern - Navigation Tab

Navigation tabs provide a clear indication of what content is available on a website and where to find it. I decided to use a vertical navigation bar on the left to house the different page tabs. I was inspired by the spotify web app where the user's playlists are listed in the side naigation bar. I decided to mimic this but with the display of recent data inputs. Additionally, the selected tab is boldened to indicate the user’s location relative to the microsite. (McKeown, R., Holmes, S., Salt, J. 2009.) 

### Media Enquiries + Responsiveness

I have included a viewport meta tag in the head of all my html files which allows the browser to control the page's width and scaling, which is essential for responsiveness.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

I have also included an adjustment for smaller screens in my css file:

```css
@media (max-width: 600px) {
  #form-heading, .forms {
    margin-top: 2em; /* smaller margin on small screens */
  }
}
```

I have taken additional care to use vh, vw, em, rem, and % instead of px when styling my web app content. 

Initially I wanted the page to be a fixed size where no continuous scroll was necessary, however, I discovered through testing the application on my phone that it would be too difficult and tedious to ensure all my eleents stay proportionate with each other. Therefore, I made my content container scrollable. 

### Features

** Soup Logbook: ** The application displays soups the user has prepared and consumed over the week. It included name, cuisine, ingredients, prep time, calories, date submitted, and a GUID.

** My fridge Section:** The application can be used to store the ingredients the user has on hand, creating a useful and effective tool for meal preparation. 

** Calorie Count: ** The application tracks the total number of calories consumed via soups throughout the week.

** Recently added section: ** A recently added tab is intergrated into the navigation bar and displays all recent data inputs. It is capped to the latest 10. 

### Limitations

This web app uses localStorage for data persistence, therefore, if you run the application in a different browser or different device, you will not see your logged data. This is due to localStorgae being limited to the specific browser or device.


### Iterations and Improvements

I have modified some of the web app layout compared to my intial wireframe proposals. Instead of having separate containers for all of the data inputs, I decided to go with one big container. This allows for simplicity and a more clean aesthetic. I spent a long time playing around with the colour palette and font sizes, as well as the larger container sizes and their ratios. The goal was to have a simple yet bold design that translated well between desktop and mobile use. This is due to my target audience being young adults who have busy schedules and are drawn to convenient user experiences. 

Initially, I used a bold and playful typography family. However, when I added more content and tested my data inputs, it looked unprofessional and messy. Therefore, I decided to stick with the classic san serif font. It is legible across various sized screens which improves accessibility and enhances the user's interactive experience. 

My intial colour scheme was a black background with light grey rounded rectangle containers within dark grey rounded rectangle containers and white text. Although the colour palette looked sophisticated, I found that the colours lacked personality and didn't properly define the brand identity of the web app. I then went with a green monochrome colour palette to subliminally convey healthy eating and fresh cooking. I kept the white text for headings but where text was on top of a paler/lighter colour I improved contrast by incorporating dark green text.

In my intial wireframes, I had the plus button display an option menu upon hovering where the use could decide which form to access based on what data they wanted to log. I decided to scrap that and include a drop down menu inside the form screen where the relevant form would appear based on what the user wanted to input. This allows for more straight-forward navigation and less touchpoints required. 

## Web App Functionality

The web app facilitates the management and tracking of soup recipes and fridge items through user-friendly forms. Users can select a task type from a dropdown menu to display the appropriate form for adding either soup recipes or fridge items. Upon form submission, the app captures and saves the entered data to Local Storage, ensuring persistence across sessions. Soup recipes include details like ingredients, cuisine, preparation time, calories, date, and notes, while fridge items record the ingredient name, food group, quantity, unit, and calories. The app dynamically updates the displayed forms and recent items list based on user input. Additionally, it provides functionalities for deleting items from the recent list or the fridge inventory, with updates reflected in both the user interface and Local Storage. The app ensures a seamless user experience by redirecting users to relevant pages upon form submission and loading stored data to populate lists and forms on page load.

## References

### Research

Boyd, M. (2018, March 9). Single Page Applications: A powerful design pattern for modern web apps. Medium. https://medium.com/a-lady-dev/single-page-applications-a-powerful-design-pattern-for-modern-web-apps-ec3590bb7e7a

Continuous Scrolling design pattern. (n.d.). Ui-Patterns.com. https://ui-patterns.com/patterns/ContinuousScrolling

Loew, I. (2021, April 28). The 13 Principles of Design (And How to Apply Them). Paperform Blog. https://paperform.co/blog/principles-of-design/

McKeown, R., Holmes, S., Salt, J. (2009, October 13). Navigation Tabs Design Pattern. UI Patterns. https://ui-patterns.com/patterns/NavigationTabs  


### Library Acknowledgement

I used the jQuery library to simplfy my web app's DOM manipulation; making it easier to select, manipulate, and traverse HTML elements and their attributes. I found that jQuery provides a cleaner more elegant way to handle events like clicks, form submissions, and mouse movements. It ensures that the code runs correctly across different browsers.

e.g When coding the delete button function for my data inputs: 
(Logbook, My fridge, and Recently Added)

```js
 const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    // Remove the soup from the soupData array
    soupData.splice(i, 1);

    // Update local storage
    localStorage.setItem('soupData', JSON.stringify(soupData));

    // Clear the soup list
    soupList.innerHTML = '';

    // Update the displayed soup list
    loadSubmittedSoupData();
  });
```
  ```js
  const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
      container.remove(); // remove the container
      deleteFridgeItem(item.ingredientName); // pass the name of the item to deleteFridgeItem
    });
```
```js
  recentItems.forEach(item => {
    const $listItem = $("<li>").attr("data-id", item.id).html(`${item.type}: ${item.name} (${item.detail}) <button onclick="deleteItem('${item.id}')">Delete</button>`);
    $recentItemsNav.append($listItem);
  });
```

Overall, by providing a high-level abstraction, jQuery reduces the amount of code developers need to write, making the code more readable and maintainable.

### Images

Griss, M (2020), Red Curry Thai Soup. [Photograph] Unsplash. https://unsplash.com/photos/pasta-dish-on-brown-ceramic-bowl-otLqpb9LK70


## Use of AI

I used GitHub Copilot to assist in debugging my code as well as identifying issues with functionality. I have copied and pasted my chat history below:

***lisayknight:***
*the delete button just adds more soupLists to the console and does not delete the item off the page*

***GitHub Copilot:***
*The issue might be due to the fact that the loadSubmittedSoupData function is being called inside the delete button's click event listener, but the soupList element's innerHTML is not being cleared before new items are added. This could result in the same items being added multiple times to the soupList element when the delete button is clicked.*

*Here's how you can modify your code to fix this:*

```js
deleteButton.addEventListener('click', () => {
  // Remove the soup from the soupData array
  soupData.splice(i, 1);

  // Update local storage
  localStorage.setItem('soupData', JSON.stringify(soupData));

  // Clear the soup list
  soupList.innerHTML = '';

  // Update the displayed soup list
  loadSubmittedSoupData();
});
```

*In this code, soupList.innerHTML = ''; clears the soupList element before loadSubmittedSoupData() is called to update the displayed soup list. This ensures that the same items are not added multiple times to the soupList element.*

***lisayknight:***
*the ingredient name form input is not displaying in the recents tab*

***Github Copilot***
*The issue seems to be that the addToRecent function is not being called when a new fridge item is added. This function is responsible for adding items to the recent tab.*

*Here's a fix:*

```js
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

    // Rest of the code...
});
```

***lisayknight:***
*when i add a soup, it duplicates all the soups before and when i delete a soup it deletes all except the latest input*

***Github Copilot***
*It sounds like the issue might be with how you're handling the addition and deletion of soups in your JavaScript code. Without seeing the actual code, I can only make assumptions, but here are some general tips:*

*Duplication on addition: This might be happening if you're re-rendering all the soups every time a new one is added. Instead, you should only append the new soup to the existing list.*

*Deletion of all but the latest: This might be happening if you're deleting the soups based on their index in the array and the array is being reversed or sorted in a way that changes the original index. Make sure you're deleting the soups based on a unique identifier (like an id) rather than their index.*

*Here's a simplified example of how you might handle the addition and deletion of soups:*

```js
let soups = [];

function addSoup(soup) {
    soups.push(soup);
    const soupList = document.getElementById('soupList');
    const soupElement = document.createElement('li');
    soupElement.textContent = soup;
    soupList.appendChild(soupElement);
}

function deleteSoup(soup) {
    soups = soups.filter(s => s !== soup);
    const soupList = document.getElementById('soupList');
    const soupElements = Array.from(soupList.children);
    const soupElement = soupElements.find(element => element.textContent === soup);
    soupList.removeChild(soupElement);
}
```
*In this example, addSoup only appends the new soup to the list, and deleteSoup removes only the specified soup. Please adjust this example to fit your actual code.*


***lisayknight:***
*Console Error: script.js:58 Uncaught TypeError: Cannot set properties of null (setting 'innerHTML') at script.js:58:19 at Array.forEach () at loadSubmittedSoupData (script.js:53:12) at HTMLDocument. (script.js:133:4)*

***Github Copilot***
*The error message indicates that the soupList element is null when the loadSubmittedSoupData function is called. This usually means that the element with the id soupList does not exist in your HTML, or the JavaScript is being executed before the HTML document has fully loaded.*

*Here are a few things you can check:*

*Make sure there is an element with the id soupList in your HTML. The id should be exactly the same as the one you're using in your JavaScript, including the case.*

*Make sure the loadSubmittedSoupData function is not being called before the HTML document has fully loaded. You can ensure this by only calling the function after the DOMContentLoaded event has fired, like this:*

```js
document.addEventListener('DOMContentLoaded', function() {
  loadSubmittedSoupData();
});
```
*If none of the above solutions work, there might be an issue elsewhere in your code that's causing the error. Check your browser's console for any other error messages that might give you a clue about what's going wrong.*
