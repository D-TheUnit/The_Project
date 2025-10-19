// def global variables
let yyyy = new Date();
let year = yyyy.getFullYear()
document.getElementById("year").innerText = year;
let i = 1;
let y;
window.onload = localStorage.clear();
function EnableDisable(myValue) {
    let btnSubmit = document.getElementById("a-btn");
    if (myValue.value.trim() != "") {
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = "pointer"
    } else {
        btnSubmit.disabled = true;
        btnSubmit.style.cursor = "not-allowed"
    }
};
// functtion which add note to local storage.
const addNotes = () => {
    y = `Note ${i}`;
    let x = document.getElementById('myValue').value;
    localStorage.setItem(y, x);
    document.getElementById('yn').classList.remove("none");
    document.getElementById('yn').classList.add("yours-notes");
    document.getElementById('myValue').value = '';
    updateNotes();
    i = i + 1;
}

// function that create card and add to your notes section
// function that create card and add to your notes section
const updateNotes = () => {
    let container = document.getElementById('noty');
    if (!container) return;

    // clear container to re-render fresh
    container.innerHTML = '';

    // collect keys that follow your Note convention: "Note <number>"
    let keys = Object.keys(localStorage)
        .filter(k => k.startsWith('Note '))
        .sort((a, b) => {
            // sort numerically by the number after "Note "
            let na = parseInt(a.split(' ')[1], 10) || 0;
            let nb = parseInt(b.split(' ')[1], 10) || 0;
            return na - nb;
        });

    // if no notes, hide the notes section
    const yn = document.getElementById('yn');
    if (keys.length === 0) {
        if (yn) yn.classList.add('none');
        return;
    } else {
        if (yn) {
            yn.classList.remove('none');
            yn.classList.add('yours-notes');
        }
    }

    // create a card for each note key
    keys.forEach((key) => {
        let text = localStorage.getItem(key) || '';

        let card = document.createElement('div');
        card.className = 'card';

        let span = document.createElement('span');
        span.textContent = text;
        card.appendChild(span);

        // Delete button
        let delBtn = document.createElement('button');
        delBtn.className = 'card-btn';
        delBtn.textContent = 'Delete Note';
        delBtn.onclick = function () {
            ondelete(key, card);
        };
        card.appendChild(delBtn);

        // Edit button
        let editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit Note';
        editBtn.onclick = function () {
            editNote(key);
        };
        card.appendChild(editBtn);

        container.appendChild(card);
    });
};

// function that delete the note (specific key)
const ondelete = (key, cardElement) => {
    if (!key) return;
    // remove from localStorage
    localStorage.removeItem(key);

    // remove card element from DOM if provided
    if (cardElement && cardElement.parentNode) {
        cardElement.remove();
    }

    // if no more notes, hide the section
    const remaining = Object.keys(localStorage).filter(k => k.startsWith('Note '));
    const yn = document.getElementById('yn');
    if (remaining.length === 0 && yn) {
        yn.classList.add('none');
    }
};

// helper to toggle between Add and Save UI (save button added in save branch)
function toggleSaveMode(isEditing) {
    const addBtn = document.getElementById('a-btn');
    const saveBtn = document.getElementById('save-btn');

    if (isEditing) {
        if (addBtn) addBtn.style.display = 'none';
        if (saveBtn) {
            saveBtn.style.display = 'inline-block';
            saveBtn.disabled = false;
        }
    } else {
        if (addBtn) addBtn.style.display = 'inline-block';
        if (saveBtn) saveBtn.style.display = 'none';
    }
}

