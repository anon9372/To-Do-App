// Selecting all the elements from the App UI 
const clear = document.querySelector('.clear');


const dateElement = document.getElementById("date");
const list = document.getElementById("list"); // check this
const input = document.getElementById("input")





// Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough"

// Variable to store the list locally

let LIST = [];
let id = 0;


// get item from local storage

let data = localStorage.getItem("TODO");

// check if the data is not empty

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the  list
    loadList(LIST);// load the list to the user interface
} else {
    // if date is not empty
    LISST = [];
    id = 0;
}


// load items to the user interface

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

// CLEAR BUTTON to clear local storage

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload()
})



//Show today date
const options = { weekday: 'long', month: 'short', day: 'numeric' }
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// Funtion to add to the value to the list of todo
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job = "complete" id="${id}"  > </i>
        <p class="text ${LINE}"> ${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}" > </i>
    </li>

    

        `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// addToDo("Drink Coffee", 1, false, false); // TESTER

// add an item to the list using the enter key


document.addEventListener("keyup", function () {

    if (event.keyCode == 13) {
        const toDo = input.value;

        //if input is not empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({

                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to local storeage

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }

        input.value = "";
    }
});


// complete to do 

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do using trash button

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target;
    console.log(element);
    const elementJob = element.attributes.job.value; //delete or complete ERROR HERE AS IT IS NOT TAKING THE VALUE

    if (elementJob == 'complete') {
        completeToDo(element);
    }
    else if (elementJob == 'delete') {
        removeToDo(element)
    }
    // add item to local storeage

    localStorage.setItem("TODO", JSON.stringify(LIST));
});