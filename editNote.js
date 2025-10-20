// editNote.js
function editNote(key) {
    // Read value for this key from localStorage
    let value = localStorage.getItem(key);
    if (!value) return;

    // Put text into textarea for editing
    document.getElementById("myValue").value = value;

    // Mark which key is being edited in localStorage
    localStorage.setItem("editingKey", key);

    // Focus textarea and enable Add button so user can edit immediately
    const addBtn = document.getElementById("a-btn");
    if (addBtn) {
        addBtn.disabled = false;
        addBtn.style.cursor = "pointer";
    }

    // Show save button if it exists (will be added in next feature)
    const saveBtn = document.getElementById("save-btn");
    if (saveBtn) {
        saveBtn.style.display = "inline-block";
        saveBtn.disabled = false;
    }
}