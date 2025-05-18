window.onload = function() {
  let name = localStorage.getItem("username");
  if (!name) {
    window.location.href = "login.html"; // Redirect if no name is found
  }
};
