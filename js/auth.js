function authenticate() {
  const sessionID = localStorage.getItem("token");

  // Check if session ID exists and is not expired
  if (!sessionID) {
    // Redirect to the login page
    window.location.href = "login.html";
  }
}

// Call the authenticate function when the page loads
window.addEventListener("DOMContentLoaded", authenticate);
