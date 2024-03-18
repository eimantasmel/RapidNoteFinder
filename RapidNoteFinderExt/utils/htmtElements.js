export let interactiveBox = document.createElement('div');
interactiveBox.id = "interactiveBox";
interactiveBox.style.position = "fixed";
interactiveBox.style.width = "40%";
interactiveBox.style.height = "80%";
interactiveBox.style.backgroundColor = "rgba(255, 20, 147, 0.7)";
interactiveBox.style.transform = "translate(-50%, -50%)";
interactiveBox.style.top = "50%";
interactiveBox.style.left = "50%";
interactiveBox.style.zIndex = "10000000";


export let inputElement = document.createElement('input');
inputElement.style.width = "80%";
inputElement.style.margin = "10px auto"; // Center the input element horizontally with some top margin
inputElement.style.padding = "8px";
inputElement.style.border = "2px solid #fff"; // White border
inputElement.style.borderRadius = "5px"; // Rounded corners
inputElement.style.fontSize = "16px";
inputElement.placeholder = "Enter your text here...";
inputElement.setAttribute("type", "text");



// Create and style the text area element
export let textAreaElement = document.createElement('textarea');
textAreaElement.style.width = "80%";
textAreaElement.style.height = "400px";
textAreaElement.style.margin = "10px auto"; // Center the text area horizontally with some top margin
textAreaElement.style.padding = "8px";
textAreaElement.style.border = "2px solid #fff"; // White border
textAreaElement.style.borderRadius = "5px"; // Rounded corners
textAreaElement.style.fontSize = "16px";
textAreaElement.placeholder = "Enter your text here...";


export let saveBtn = document.createElement('button');
saveBtn.textContent = "Save entry";
saveBtn.style.backgroundColor = "red";
saveBtn.style.color = "white";
saveBtn.style.border = "none";
saveBtn.style.padding = "10px 20px";
saveBtn.style.borderRadius = "5px";
saveBtn.style.cursor = "pointer";
saveBtn.style.fontFamily = "Arial, sans-serif";
saveBtn.style.fontSize = "16px";
saveBtn.style.fontWeight = "bold";
saveBtn.style.transition = "background-color 0.3s";

export let navBar = document.createElement('div');
navBar.style.width = "100%";
navBar.style.display = "flex";
navBar.style.justifyContent = "space-between";
navBar.style.marginBottom = "10px"; // Add margin below the navigation bar

// Create the first button
export let button1 = document.createElement('button');
button1.textContent = "Add";
button1.style.width = "50%"; // Set width to 50%
button1.style.padding = "10px 20px";
button1.style.border = "none";
button1.style.borderRadius = "5px";
button1.style.cursor = "pointer";
button1.style.fontFamily = "Arial, sans-serif";
button1.style.fontSize = "16px";
button1.style.fontWeight = "bold";
button1.style.backgroundColor = "darkred";
button1.style.color = "white";
button1.style.transition = "background-color 0.3s";
// Create the second button
export let button2 = document.createElement('button');
button2.textContent = "Find";
button2.style.width = "50%"; // Set width to 50%
button2.style.padding = "10px 20px";
button2.style.border = "none";
button2.style.borderRadius = "5px";
button2.style.cursor = "pointer";
button2.style.fontFamily = "Arial, sans-serif";
button2.style.fontSize = "16px";
button2.style.fontWeight = "bold";
button2.style.backgroundColor = "rgba(255, 20, 147, 0.7)";
button2.style.color = "white";
button2.style.transition = "background-color 0.3s";

// Append buttons to the navigation bar
navBar.appendChild(button1);
navBar.appendChild(button2);



export let addContentContainer = document.createElement('div')
addContentContainer.id = "insert-content-container"
addContentContainer.style.display = "flex";
addContentContainer.style.flexDirection = "column";
addContentContainer.style.alignItems = "center";
addContentContainer.style.justifyContent = "center";
addContentContainer.style.borderRadius = "10px";

addContentContainer.appendChild(inputElement);
addContentContainer.appendChild(textAreaElement);
addContentContainer.appendChild(saveBtn);


//--------------------------------------------------------------------------------------------------------------------------------
let findInputElement = document.createElement('input');
findInputElement.style.width = "80%";
findInputElement.style.margin = "10px auto"; // Center the input element horizontally with some top margin
findInputElement.style.padding = "8px";
findInputElement.style.border = "2px solid #fff"; // White border
findInputElement.style.borderRadius = "5px"; // Rounded corners
findInputElement.style.fontSize = "16px";
findInputElement.placeholder = "Find your note...";
findInputElement.setAttribute("type", "text");



let contentElement = document.createElement('div');
contentElement.id = 'content-append'
export let findContainer = document.createElement('div')
findContainer.id = "find-content-container"
findContainer.style.display = "flex";
findContainer.style.flexDirection = "column";
findContainer.style.alignItems = "center";
findContainer.style.justifyContent = "center";
findContainer.style.display = "none";

findContainer.appendChild(findInputElement)
findContainer.appendChild(contentElement)


// addContentContainer.appendChild(interactiveBox)


// TODO: Later will need to solve this problem with button hovering.
// button1.addEventListener("mouseover", function() {
//     button1.style.backgroundColor = "#dd0073";
// });
//
// button1.addEventListener("mouseout", function() {
//     button1.style.backgroundColor = "deeppink";
// });
//
// button2.addEventListener("mouseover", function() {
//     button2.style.backgroundColor = "#dd0073";
// });
//
// button2.addEventListener("mouseout", function() {
//     button2.style.backgroundColor = "deeppink";
// });


textAreaElement.addEventListener("mouseover", function() {
    textAreaElement.focus();
});

inputElement.addEventListener("mouseover", function() {
    inputElement.focus();
});

saveBtn.addEventListener("mouseover", function() {
    saveBtn.style.backgroundColor = "darkred";
});

saveBtn.addEventListener("mouseout", function() {
    saveBtn.style.backgroundColor = "red";
});

findInputElement.addEventListener("mouseover", function() {
    inputElement.focus();
});