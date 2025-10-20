// addNote.js

let i = 1; // counter for Note numbering

// Enable/disable Add button (keeps your original handler name)
function EnableDisable(myValue) {
  const btn = document.getElementById("a-btn");
  if (myValue.value.trim() !== "") {
    btn.disabled = false;
    btn.style.cursor = "pointer";
  } else {
    btn.disabled = true;
    btn.style.cursor = "not-allowed";
  }
}

// Create a card element and append to #noty
function createCard(key, text) {
  const container = document.getElementById('noty');

  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.storageKey = key;

  const span = document.createElement('span');
  span.textContent = text;

  const delBtn = document.createElement('button');
  delBtn.className = 'card-btn';
  delBtn.textContent = 'Delete Note';
  delBtn.style.height = '29px';
  delBtn.style.width = '83px';
  delBtn.style.border = '1px solid #767676';
  delBtn.style.cursor = 'pointer';
  delBtn.style.margin = '10px 0 0 0';

  delBtn.addEventListener('click', function () {
    deleteNoteFromStorage(this);
  });

  // ADD EDIT BUTTON - NEW CODE FOR EDITING FEATURE
  const editBtn = document.createElement('button');
  editBtn.className = 'card-btn';
  editBtn.textContent = 'Edit Note';
  editBtn.style.height = '29px';
  editBtn.style.width = '83px';
  editBtn.style.border = '1px solid #767676';
  editBtn.style.cursor = 'pointer';
  editBtn.style.margin = '10px 0 0 10px';

  editBtn.addEventListener('click', function () {
    editNote(key);
  });

  card.appendChild(span);
  card.appendChild(delBtn);
  card.appendChild(editBtn); // Add edit button to card
  container.appendChild(card);
}

// Add a new note and persist as "Note N"
function addNotes() {
  const noteText = document.getElementById('myValue').value.trim();
  if (!noteText) return;

  const key = `Note ${i}`;
  localStorage.setItem(key, noteText);

  // ensure "Your Notes" is visible
  const notesSection = document.getElementById('yn');
  notesSection.classList.remove("none");
  notesSection.classList.add("yours-notes");

  // add to UI
  createCard(key, noteText);

  // reset input and button state
  document.getElementById('myValue').value = '';
  document.getElementById('a-btn').disabled = true;
  document.getElementById('a-btn').style.cursor = 'not-allowed';

  i++;
}

// On load: clean bad keys, then render only valid notes
window.addEventListener('DOMContentLoaded', () => {
  // gather valid note keys (and purge invalid ones)
  const keys = [];
  // first pass: remove obviously bad entries and collect Note keys
  const toRemove = [];
  for (let k = 0; k < localStorage.length; k++) {
    const localKey = localStorage.key(k);
    if (!localKey) continue;

    // Only consider keys that start with "Note "
    if (localKey.startsWith("Note ")) {
      const value = localStorage.getItem(localKey);
      // Remove invalid values: null, empty, whitespace-only, or explicit "ERROR"
      if (value === null || value === undefined || value.trim() === "" || value === "ERROR") {
        toRemove.push(localKey);
      } else {
        keys.push(localKey);
      }
    }
  }

  // remove invalid keys we collected (do separately to avoid changing iteration while looping)
  toRemove.forEach(k => localStorage.removeItem(k));

  // sort valid note keys numerically if they use "Note N" format
  keys.sort((a, b) => {
    const na = parseInt(a.replace("Note ", ""), 10);
    const nb = parseInt(b.replace("Note ", ""), 10);
    if (isNaN(na) || isNaN(nb)) return a.localeCompare(b);
    return na - nb;
  });

  // render
  const container = document.getElementById('noty');
  container.innerHTML = '';

  if (keys.length === 0) {
    // nothing to show
    const notesSection = document.getElementById('yn');
    notesSection.classList.add("none");
    notesSection.classList.remove("yours-notes");
    return;
  } else {
    const notesSection = document.getElementById('yn');
    notesSection.classList.remove("none");
    notesSection.classList.add("yours-notes");
  }

  keys.forEach(k => {
    const value = localStorage.getItem(k);
    if (value && value.trim() !== "" && value !== "ERROR") {
      createCard(k, value);
      // keep i ahead of existing note numbers
      const num = parseInt(k.replace("Note ", ""), 10);
      if (!isNaN(num) && num >= i) i = num + 1;
    } else {
      // just in case an invalid slipped through, remove it
      localStorage.removeItem(k);
    }
  });
});
