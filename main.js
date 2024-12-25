// const BASE_URL = "http://localhost:3000";
// const wrapperEl = document.querySelector(".wrapper");

// async function fetchUsers() {
//   const response = await fetch(`${BASE_URL}/users`);
//   response.json().then((res) => {
//     console.log(res);
//   });
// }

// window.onload = () => {
//   fetchUsers();
// };

// function createUser(data) {
//   data.forEach((user) => {
//     const userItem = document.createElement("div");
//     userItem.innerHTML = `
//     <h3>${user.name}</h3>
//     <p>${user.work}</p>
//     <p>${user.university}</p>
// `;
//     wrapperEl.appendChild(userItem);
//   });
// }

const apiUrl = "http://localhost:3000/users";

document.querySelector(".userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.querySelector(".name").value;
  const username = document.querySelector(".username").value;
  const gender = document.querySelector(".gender").value;
  const email = document.querySelector(".email").value;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, username, gender, email }),
  })
    .then((res) => res.json())
    .then(() => {
      document.querySelector(".userForm").reset();
      loadUsers();
    });
});

function loadUsers() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((users) => {
      const usersContainer = document.querySelector(".users");
      usersContainer.innerHTML = "";

      users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.className = "user-card";

        userCard.innerHTML = `
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0nFY4AO-CzZatf0QOvZcMxy7wThn_GMM-w&s" alt="User Avatar" />
          <h3>${user.name}</h3>
          <p>${user.lastName}</p>
          <p>${user.work}</p>
          <p>${user.gender}</p>
          <p>${user.email}</p>
          <button onclick="deleteUser(${user.id})">Delete</button>
        `;

        usersContainer.appendChild(userCard);
      });
    });
}

function deleteUser(id) {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then(() => loadUsers());
}

loadUsers();
