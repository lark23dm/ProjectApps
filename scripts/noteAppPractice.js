// Get HTML Elements:
const btnAddNote = document.getElementById('btnAddNote');
const mainSectionElement = document.getElementById('main');

//Get Store data:
//getStoredData();

// Global Variables
let notes = getStoredData();
let noteID = notes.length ;
console.log(notes)

getStoredData().forEach((note) => {
    const noteElement = addNoteElement(note)
    mainSectionElement.insertBefore(noteElement, btnAddNote)
})


// *******************Main App: ***********************

btnAddNote.addEventListener('click', () => {
    //Create an object for the note
    let noteObject = createNoteObject();


    // *** Create an HTML note with object info:
    let noteElement = addNoteElement(noteObject);

    // Insert Note Element
    mainSectionElement.insertBefore(noteElement, btnAddNote);

    // Update a given note:
    updateNote(noteElement, noteElement.id);

    // Delete a selected note:
    deleteNote(noteElement, noteElement.id);

    // Save it to storage:
    notes.push(noteObject);
    saveToStorage(notes);




});



// ********************Functions ***************************
// Retrieve Data
function getStoredData() {
    return JSON.parse(localStorage.getItem("notesList") || '[]')
}

// Create Element:
function createNoteObject() {
    noteID++
    return {
        id: noteID,
        value: '',
    };
}

// Add note element:
function addNoteElement(noteObject) {
    const noteElement = document.createElement('textarea');
    noteElement.classList.add('note')
    noteElement.id = noteObject.id
    noteElement.innerText = noteObject.value;

    //*** Add event listener to update the note and save it to storage:
    /*noteElement.addEventListener("input", (e)=>{
        console.log(e.currentTarget);
    })*/
    //*** Return Element
    return noteElement;
}

// Save to local storage
function saveToStorage(notes){
    localStorage.setItem('notesList', JSON.stringify(notes));
}

// Update a note's Value:
function updateNote(noteElement) {
    noteElement.addEventListener('input', (e) =>{
        let id = e.currentTarget.id;
        notes[(id) - 1].value = e.currentTarget.value;
        saveToStorage(notes);
    })
}

// Delete selected note
function deleteNote(noteElement, noteID) {
    noteElement.addEventListener('dblclick', (e) => {
        const warning = confirm('Do you want to delete this note? ')
        if (warning){
            const notes = getStoredData().filter(note => noteID !== e.currentTarget.id);
            saveToStorage(notes);
            mainSectionElement.removeChild(noteElement);
        }
    })
}




