// deleteNote.js

// Delete a note by clicking its button (btn is the clicked button)
function deleteNoteFromStorage(btn) {
  const card = btn.closest(".card");
  if (!card) return;

  // get the key stored on the card
  const key = card.dataset.storageKey;

  // remove the key from localStorage if it exists
  if (key && localStorage.getItem(key) !== null) {
    localStorage.removeItem(key);
  } else {
    // fallback: try to remove by matching the card text
    const noteText = card.querySelector("span")?.innerText?.trim();
    if (noteText) {
      for (let k = 0; k < localStorage.length; k++) {
        const localKey = localStorage.key(k);
        if (localKey && localStorage.getItem(localKey) === noteText) {
          localStorage.removeItem(localKey);
          break;
        }
      }
    }
  }

  // remove card from DOM
  card.remove();

  // hide "Your Notes" if none remain
  const remaining = document.querySelectorAll(".card").length;
  if (remaining === 0) {
    const section = document.getElementById("yn");
    section.classList.add("none");
    section.classList.remove("yours-notes");
  }
}
