// saveNote.js
function saveNote() {
    let editKey = localStorage.getItem("editingKey");
    if (!editKey) {
        // nothing selected to save
        return;
    }

    let updatedText = document.getElementById("myValue").value.trim();
    if (updatedText === "") {
        // don't save empty
        return;
    }

    // write updated text back to the same localStorage key
    localStorage.setItem(editKey, updatedText);

    // clear editing marker and textarea
    localStorage.removeItem("editingKey");
    document.getElementById("myValue").value = "";

    // hide save button and restore add button state
    const saveBtn = document.getElementById("save-btn");
    if (saveBtn) saveBtn.style.display = "none";

    const addBtn = document.getElementById("a-btn");
    if (addBtn) {
        addBtn.style.display = "inline-block";
        addBtn.disabled = true;
        addBtn.style.cursor = "not-allowed";
    }

    // refresh UI: reload page to pick up updated localStorage entry
    location.reload();
}
