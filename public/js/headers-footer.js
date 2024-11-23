fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
});

// Function to save admin login status
function saveAdmin() {
    localStorage.setItem("whoIsLogged", "admin");

    // Show confirmation message
    alert("You are now logged in.");
    return true; // Allow form submission
}

// Function to save client login status
function saveCustomer() {
    localStorage.setItem("whoIsLogged", "client");

    // Show confirmation message
    alert("You are now logged in.");
    return true; // Allow form submission
}



// Function to save admin login status
function signUPAdmin() {
    localStorage.setItem("whoIsLogged", "admin");

    // Show confirmation message
    alert("Account created! You are now logged in.");
    return true; // Allow form submission
}

// Function to save client login status
function signUPCustomer() {
    localStorage.setItem("whoIsLogged", "client");

    // Show confirmation message
    alert("Account created! You are now logged in.");
    return true; // Allow form submission
}



// Function to load the correct header based on login status
function loadHeader() {
    const whoIsIt = localStorage.getItem('whoIsLogged');
    let headerFile;

    if (whoIsIt === 'client') {
        headerFile = 'customer-header.html';
    } else if (whoIsIt === 'admin') {
        headerFile = 'admin-header.html';
    } else {
        headerFile = 'header.html'; // Default header for signed-out users
    }

    fetch(headerFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            window.scrollTo(0, 0);  // Scroll to the top of the page
        })
        .catch(error => console.error('Error loading header:', error));
}

// Call loadHeader to dynamically load the header when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadHeader(); // Load the appropriate header based on login status
    reloadServices(); // Fetch and display the services dynamically
});


function logout() {
    // Clear the login state
    localStorage.removeItem('whoIsLogged');
}