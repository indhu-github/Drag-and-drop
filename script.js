const draggableList = document.getElementById("draggable-list");
const checkButton = document.getElementById("check");

const touristPlaces = [
  "Agra",
  "Goa",
  "Amritsar",
  "Shimla",
  "Ooty",
  "Alleppey",
  "Jaipur",
  "Ladakh",
  "Mysore",
  "Darjeeling",
];

//Store listItems
const listItems = [];

let dragStartIndex;

createList();

// Insert List Items into DOM
function createList() {
  [...touristPlaces]
    .map((item) => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value)
    .forEach((place, index) => {
      const listItem = document.createElement("li");
      //   listItem.classList.add("over");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="place-name">${place}</p>
            <i class="fas fa-grip-lines"></li>
        `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

//swap list items during drag and drop
function swapItems(fromIndex, toIndex) {
  let itemOne = listItems[fromIndex].querySelector(".draggable");
  let itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

//check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const placeName = listItem.querySelector(".draggable").innerText.trim();

    if (placeName !== touristPlaces[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
checkButton.addEventListener("click", checkOrder);
