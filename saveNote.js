// saveNote.js
function saveNote() {
    const editingKey = localStorage.getItem("editingKey");
    if (!editingKey) return;

    const newValue = document.getElementById("myValue").value.trim();
    if (!newValue) return;

    // Update the note in localStorage
    localStorage.setItem(editingKey, newValue);

    // Update the note in the UI
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.dataset.storageKey === editingKey) {
            const span = card.querySelector('span');
            span.textContent = newValue;
        }
    });

    // Reset the editing state
    localStorage.removeItem("editingKey");
    document.getElementById("myValue").value = '';

    // Hide save button and disable add button
    const saveBtn = document.getElementById("save-btn");
    if (saveBtn) {
        saveBtn.style.display = "none";
    }

    const addBtn = document.getElementById("a-btn");
    if (addBtn) {
        addBtn.disabled = true;
        addBtn.style.cursor = "not-allowed";
    }
}