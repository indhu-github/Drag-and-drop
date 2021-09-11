const draggableList = document.getElementById('draggable-list');
const checkButton = document.getElementById('check');

const touristPlaces=[
'Agra',
'Goa',
'Amritsar',
'Shimla',
'Ooty',
'Alleppey',
'Jaipur',
'Ladakh',
'Mysore',
'Darjeeling'
];

//Store listItems
const listItems=[];

let dragStartIndex;

createList();

// Insert List Items into DOM
function createList() {
    [...touristPlaces].forEach((place,index)=>{
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index',index);
        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="place-name">${place}</p>
            <i class="fas fa-grip-lines"></li>
        `;

        listItems.push(listItem);

        draggableList.appendChild(listItem);
    })
}
