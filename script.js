// script.js

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// When page loads, check if there are saved notes
document.addEventListener("DOMContentLoaded", () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Show or hide "Your Notes" section
  const notesContainer = document.getElementById("yn");
  if (notes.length > 0) {
    notesContainer.classList.remove("none");
  } else {
    notesContainer.classList.add("none");
  }
});

// Enable/Disable Add Note button dynamically
function EnableDisable(textarea) {
  const btn = document.getElementById("a-btn");
  if (textarea.value.trim().length > 0) {
    btn.disabled = false;
    btn.style.cursor = "pointer";
  } else {
    btn.disabled = true;
    btn.style.cursor = "not-allowed";
  }
}
