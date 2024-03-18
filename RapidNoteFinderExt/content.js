import {
    button1,
    button2,
    interactiveBox,
    inputElement,
    textAreaElement,
    saveBtn,
    navBar,
    addContentContainer,
    findContainer
} from "./utils/htmtElements";

interactiveBox.appendChild(navBar);
interactiveBox.appendChild(addContentContainer);
interactiveBox.appendChild(findContainer);
document.body.appendChild(interactiveBox);


button1.addEventListener('click', (e) => {
    findContainer.style.display = 'none';
    addContentContainer.style.display = 'flex';
    e.target.style.backgroundColor = 'darkred'
    button2.style.backgroundColor = "rgba(255, 20, 147, 0.7)"
})

button2.addEventListener('click', (e) => {
    findContainer.style.display = 'flex';
    addContentContainer.style.display = 'none';
    e.target.style.backgroundColor = 'darkred'
    button1.style.backgroundColor = "rgba(255, 20, 147, 0.7)"
})