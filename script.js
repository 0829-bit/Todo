const input = document.getElementById("myInput");
const list = document.getElementById("myUL");
const addBtn = document.querySelector(".addBtn");

// Function to create a new task
function createTask(text) {
  let li = document.createElement("li");
  li.textContent = text;

  // Close button
  let span = document.createElement("span");
  span.textContent = "×";
  li.appendChild(span);

  // Add to list
  list.appendChild(li);

  // Toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("checked");
  });

  // Delete with fade-out
  span.addEventListener("click", (e) => {
    e.stopPropagation();
    li.classList.add("fade-out");
    setTimeout(() => li.remove(), 300);
  });
}

// Add task on button click
addBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    createTask(input.value.trim());
    input.value = "";
  } else {
    alert("Please enter a text!");
  }
});

// Add task on Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// ✅ Make existing list items interactive
document.querySelectorAll("#myUL li").forEach((li) => {
  // Add close button if missing
  if (!li.querySelector("span")) {
    let span = document.createElement("span");
    span.textContent = "×";
    li.appendChild(span);

    span.addEventListener("click", (e) => {
      e.stopPropagation();
      li.classList.add("fade-out");
      setTimeout(() => li.remove(), 300);
    });
  }

  // Toggle checked
  li.addEventListener("click", () => {
    li.classList.toggle("checked");
  });
});
