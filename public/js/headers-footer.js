fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;

        // Dynamically update the footer with business settings
        updateFooter();
    })
    .catch(error => console.error("Error loading footer:", error));

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


async function updateFooter() {
    try {
        // Fetch the latest business settings from the backend
        const response = await fetch('/api/business-settings');
        const data = await response.json();

        if (!data || !data.email || !data.phone || !data.address) {
            console.error("Business settings data is incomplete or invalid:", data);
            return;
        }

        // Update the email
        const footerEmail = document.querySelector('.footer-section a[href^="mailto:"]');
        if (footerEmail) {
            footerEmail.textContent = data.email;
            footerEmail.href = `mailto:${data.email}`;
        }

        // Update the phone
        const footerPhone = document.querySelector('.footer-section a[href^="tel:"]');
        if (footerPhone) {
            footerPhone.textContent = data.phone;
            footerPhone.href = `tel:${data.phone}`;
        }

        // Update the address
        const footerAddress = document.querySelector('.footer-section p:last-child');
        if (footerAddress) {
            footerAddress.textContent = `Address: ${data.address}`;
        }
    } catch (error) {
        console.error("Error fetching or updating the footer:", error);
    }
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


async function loadHeader() {
    const whoIsIt = localStorage.getItem('whoIsLogged');
    let headerFile;

    if (whoIsIt === 'client') {
        headerFile = 'customer-header.html';
    } else if (whoIsIt === 'admin') {
        headerFile = 'admin-header.html';
    } else {
        headerFile = 'header.html'; // Default header for signed-out users
    }

    try {
        const response = await fetch(headerFile);
        const headerHTML = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;

        // Apply the header updates for company name and logo
        await updateHeader();

        window.scrollTo(0, 0); // Scroll to the top of the page
    } catch (error) {
        console.error('Error loading header:', error);
    }
}


async function updateHeader() {
    try {
        const response = await fetch('/api/business-settings');
        const data = await response.json();

        if (!data) {
            console.error('Business settings data not found.');
            return;
        }

        const headerTitle = document.querySelector('.header-title');
        if (headerTitle) {
            const prefix = "SERVICEHUB - ";
            headerTitle.textContent = `${prefix}${data.company_name}`;
        }

        // Update the right logo
        const rightLogo = document.querySelector('.header-right-logo');
        if (rightLogo) {
            if (data.right_logo) {
                rightLogo.src = data.right_logo; // Use the updated logo URL
                rightLogo.style.display = "block"; // Ensure it's visible
            } else {
                rightLogo.style.display = "none"; // Hide if no logo
            }
        }
    } catch (error) {
        console.error('Error updating admin header:', error);
    }
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