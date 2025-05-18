document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const backButton = document.getElementById("back-home");

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Display users in list
    users.forEach(user => {
        let li = document.createElement("li");
        li.textContent = user;
        userList.appendChild(li);
    });

    // Return to main page when button is clicked
    backButton.addEventListener("click", () => {
        window.location.href = "structure.html";
    });
});
