// editNote.js
function editNote(key) {
    // read value for this key
    let value = localStorage.getItem(key);
    if (!value) return;

    // put text into textarea for editing
    document.getElementById("myValue").value = value;

    // mark which key is being edited
    localStorage.setItem("editingKey", key);

    // focus textarea and enable Add button so user can edit immediately
    const addBtn = document.getElementById("a-btn");
    if (addBtn) {
        addBtn.disabled = false;
        addBtn.style.cursor = "pointer";
    }

    // show save button if it exists
    const saveBtn = document.getElementById("save-btn");
    if (saveBtn) {
        saveBtn.style.display = "inline-block";
        saveBtn.disabled = false;
    }
}
