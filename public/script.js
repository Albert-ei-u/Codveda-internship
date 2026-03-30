const API_URL = "http://localhost:3000/users";

const userList = document.getElementById("userList");
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");

// Fetch users
async function getUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();

  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;

    // delete button
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = () => deleteUser(user.id);

    li.appendChild(btn);
    userList.appendChild(li);
  });
}

// Add user
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: nameInput.value })
  });

  nameInput.value = "";
  getUsers();
});

// Delete user
async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  getUsers();
}

// Load users on start
getUsers();