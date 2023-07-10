function authenticate() {
  const sessionID = localStorage.getItem('sessionID');

  // Check if session ID exists and is not expired
  if (!sessionID || isSessionExpired(sessionID)) {
    // Redirect to the login page
    window.location.href = 'login.html';
  }
}

function isSessionExpired(sessionID) {
  // Implement your session expiration logic here
  // For example, compare the session expiration timestamp with the current time
  // and return true if the session has expired, false otherwise
  const expirationTime = localStorage.getItem('sessionExpiration');
  if (!expirationTime) {
    return true; // Session expiration time not set
  }

  const currentTime = new Date().getTime();
  return currentTime > parseInt(expirationTime);
}

// Call the authenticate function when the page loads
window.addEventListener('DOMContentLoaded', authenticate);
