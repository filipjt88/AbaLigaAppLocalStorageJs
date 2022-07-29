// VIEWS
let allPlayersView             = document.querySelector("#allPlayersView");
let addPlayerTableView         = document.querySelector("#addPlayerTableView");
let editDeletePlayerTableView  = document.querySelector("#editDeletePlayerTableView");
let allPlayersTbodyView        = document.querySelector("#allPlayersTbodyView");
let editDeletePlayersTbodyView = document.querySelector("#editDeletePlayersTbodyView");
let editPlayerTableView        = document.querySelector("#editPlayerTableView");

window.addEventListener("beforeunload", save);


function save() {
    localStorage.database = JSON.stringify(database);
}


// BUTTONS
let allPlayersBtn             = document.querySelector("#allPlayersBtn");
let addPlayerBtn              = document.querySelector("#addPlayerBtn");
let editDeletePlayerBtn       = document.querySelector("#editDeletePlayerBtn");
let savePlayerBtn             = document.querySelector("#savePlayerBtn");
let editSavePlayerBtn         = document.querySelector("#editSavePlayerBtn");
let searchField               = document.querySelector("[type='search']");


// LISTENERS
allPlayersBtn.addEventListener("click",allPlayersTableDisplay);
addPlayerBtn.addEventListener("click",addPlayerTableDisplay);
editDeletePlayerBtn.addEventListener("click",editDeleteTableDisplay);
savePlayerBtn.addEventListener("click",saveNewPlayer);
editSavePlayerBtn.addEventListener("click",editPlayerDisplay);
searchField.addEventListener("input",getSearchTerm);



// INPUTS
let idPlayer         = document.querySelector("[name='idPlayer']");
let fullName         = document.querySelector("[name='fullName']");
let dateOfBirth      = document.querySelector("[name='dateOfBirth']");
let club             = document.querySelector("[name='club']");
let country          = document.querySelector("[name='country']");
let point            = document.querySelector("[name='point']");


// EDIT INPUTS
let  editId          = document.querySelector("[name='editId']");
let  editFullName    = document.querySelector("[name='editFullName']");
let  editDateOfBirth = document.querySelector("[name='editDateOfBirth']");
let  editClub        = document.querySelector("[name='editClub']");
let  editCountry     = document.querySelector("[name='editCountry']");
let  editPoint       = document.querySelector("[name='editPoint']");

function getSearchTerm() {
    let term = this.value;
    let currentDb = database.filter(el => {
        if(el.fullName.toLowerCase().indexOf(term) !== -1 || el.dateOfBirth.indexOf(term) !== -1 || el.club.toLowerCase().indexOf(term) !== -1 || el.country.toLowerCase().indexOf(term) !== -1 || el.point.indexOf(term) !== -1) {
            return el;
        }
    });
    createPlayersSearch(currentDb);
    createEditPlayersSearch(currentDb);
}

createPlayersTable(database);
createEditDeletePlayersTable();
allClubsOption();
allCountryOption();
allPointsOption();




function saveNewPlayer() {
    let savePlayer = {
        "id": generateId(),
        "fullName": fullName.value,
        "dateOfBirth": dateOfBirth.value,
        "club": club.value,
        "country": country.value,
        "point": point.value
    };
    database.push(savePlayer);
    createPlayersTable();
    allPlayersTableDisplay();
    createEditDeletePlayersTable();
    resetInputs();
}

function generateId() {
    let rand; // random broj
    let unique = false;
    while(!unique) {
        unique = true;
        rand = Math.ceil(Math.random() * database.length + 1);
        database.forEach(player => {    
            if(parseInt(player.id) == rand) {
                unique = false;
            }
        });
    }
    return rand.toString();
}


function resetInputs() {
    fullName.value    = "";
    dateOfBirth.value = "";
    club.value        = "";
    country.value     = "";
    point.value       = "";
}



function allPlayersTableDisplay() {
    allPlayersView.style.display            = 'block';
    addPlayerTableView.style.display        = 'none';
    editDeletePlayerTableView.style.display = 'none';
    editPlayerTableView.style.display       = 'none';
}

function addPlayerTableDisplay() {
    addPlayerTableView.style.display        = 'block';
    allPlayersView.style.display            = 'none';
    editDeletePlayerTableView.style.display = 'none';
    editPlayerTableView.style.display       = 'none';
}

function editDeleteTableDisplay() {
    editDeletePlayerTableView.style.display = 'block';
    addPlayerTableView.style.display        = 'none';
    allPlayersView.style.display            = 'none';
    editPlayerTableView.style.display       = 'none';
}



function editFormDisplay() {
    let id = this.getAttribute('data-id');
    editSavePlayerBtn.setAttribute('data-id',id);
    let currentPlayer = database.find(player => player.id == id);
    fillEditForm(currentPlayer);
    editPlayerTableView.style.display       = 'block';
    editDeletePlayerTableView.style.display = 'none';
    addPlayerTableView.style.display        = 'none';
    allPlayersView.style.display            = 'none';
}

function fillEditForm(currentPlayer) {
    editId.value          = currentPlayer.id;
    editFullName.value    = currentPlayer.fullName;
    editDateOfBirth.value = currentPlayer.dateOfBirth;
    editClubsOption(currentPlayer.club);
    editCountryOption(currentPlayer.country);
    editPointsOption(currentPlayer.point);
}

function editPlayerDisplay() {
    let currentPlayer         = database.find(player => player.id == this.getAttribute('data-id'));
    currentPlayer.id          = editId.value;
    currentPlayer.fullName    = editFullName.value;
    currentPlayer.dateOfBirth = editDateOfBirth.value;
    currentPlayer.club        = editClub.value;
    currentPlayer.country     = editCountry.value;
    currentPlayer.point       = editPoint.value;
    createPlayersTable();
    allPlayersTableDisplay();
    createEditDeletePlayersTable();
}



// INPUT OPTIONS
function allClubsOption() {
    let txt = ``.trim();
    allClubs.forEach(club => {
        txt += `
        <option value="${club}">${club}</option>
        `.trim();
    });
    club.innerHTML = txt;
}


function allCountryOption() {
    let txt = ``.trim();
    countries.forEach(country => {
        txt += `
        <option value="${country}">${country}</option>
        `.trim();
    });
    country.innerHTML = txt;
}


function allPointsOption() {
    let txt = ``.trim();
    points.forEach(point => {
        txt += `
        <option value="${point}">${point}</option>
        `.trim();
    });
    point.innerHTML = txt;
}

// END OF INPUT OPTIONS
function editClubsOption(currentClub) {
    let txt = ``.trim();
    allClubs.forEach(club => {
        txt += `
        <option value="${club}" ${club == currentClub ? "selected" : ""}>${club}</option>
        `.trim();
    });
    editClub.innerHTML = txt;
}

function editCountryOption(currentCountry) {
    let txt = ``.trim();
    countries.forEach(country => {
        txt += `
        <option value="${country}" ${country == currentCountry ? "selected" : ""}>${country}</option>
        `.trim();
    });
    editCountry.innerHTML = txt;
}

function editPointsOption(currentPoint) {
    let txt = ``.trim();
    points.forEach(point => {
        txt += `
        <option value="${point}" ${point == currentPoint ? "selected" : ""}>${point}</option>
        `.trim();
    });
    editPoint.innerHTML = txt;
}

// EDIT INPUT OPTIONS


// END OF EDIT INPUT OPTIONS

function createEditDeletePlayersTable() {
    let txt = ``.trim();
    database.forEach(player => {
        txt += `
        <tr>
            <td>${player.id}</td>
            <td>${player.fullName}</td>
            <td>${player.dateOfBirth}</td>
            <td>${player.club}</td>
            <td>${player.country}</td>
            <td>${player.point}</td>
            <td><button class="btn-sm btn btn-danger delete-btns" data-id="${player.id}">Delete</button></td>
            <td><button class="btn-sm btn btn-warning edit-btns" data-id="${player.id}">Edit</button></td>
        </tr>
        `.trim();
    });
    editDeletePlayersTbodyView.innerHTML = txt;
    allDeleteBtns = document.querySelectorAll(".delete-btns");
    allEditBtns = document.querySelectorAll(".edit-btns");
    allDeleteBtns.forEach((btn,index) => {
        btn.addEventListener("click",deletePlayer);
        allEditBtns[index].addEventListener("click",editFormDisplay);
    });
}


function createEditPlayersSearch(currentDb) {
    let txt = ``.trim();
    currentDb.forEach(player => {
        txt += `
        <tr>
            <td>${player.id}</td>
            <td>${player.fullName}</td>
            <td>${player.dateOfBirth}</td>
            <td>${player.club}</td>
            <td>${player.country}</td>
            <td>${player.point}</td>
            <td><button class="btn-sm btn btn-danger delete-btns" data-id="${player.id}">Delete</button></td>
            <td><button class="btn-sm btn btn-warning edit-btns" data-id="${player.id}">Edit</button></td>
        </tr>
        `.trim();
    });
    editDeletePlayersTbodyView.innerHTML = txt;
    allDeleteBtns = document.querySelectorAll(".delete-btns");
    allEditBtns = document.querySelectorAll(".edit-btns");
    allDeleteBtns.forEach((btn,index) => {
        btn.addEventListener("click",deletePlayer);
        allEditBtns[index].addEventListener("click",editFormDisplay);
    });
}


function deletePlayer() {
    let id = this.getAttribute('data-id');
    database = database.filter(player => player.id != id);
    createPlayersTable();
    allPlayersTableDisplay();
    createEditDeletePlayersTable();
}



function createPlayersTable() {
    let txt = ``.trim();
    database.forEach(player => {
        txt += `
        <tr>
            <td>${player.id}</td>
            <td>${player.fullName}</td>
            <td>${player.dateOfBirth}</td>
            <td>${player.club}</td>
            <td>${player.country}</td>
            <td>${player.point}</td>
        </tr>
        `.trim();
    });
    allPlayersTbodyView.innerHTML = txt;
}

function createPlayersSearch(currentDb) {
    let txt = ``.trim();
    currentDb.forEach(player => {
        txt += `
        <tr>
            <td>${player.id}</td>
            <td>${player.fullName}</td>
            <td>${player.dateOfBirth}</td>
            <td>${player.club}</td>
            <td>${player.country}</td>
            <td>${player.point}</td>
        </tr>
        `.trim();
    });
    allPlayersTbodyView.innerHTML = txt;
}