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

// // Function to save client login status
// function signUPCustomer() {
//     // localStorage.setItem("whoIsLogged", "client");

//     // // Show confirmation message
//     // alert("Account created! You are now logged in.");
//     // return true; // Allow form submission

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const password = document.getElementById('password').value;

//     console.log('Sending data to /signup-client', { name, email, phone, password });

//     fetch('http://localhost:3000/signup-client', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, phone, password }),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             if (data.error) {
//                 // Display error message
//                 console.error('Server responded with an error:', data.error);
//                 document.getElementById('error').innerText = data.error;
//             } else {
//                 console.log('Signup successful, redirecting...');
//                 window.location.href = 'customer-dashboard.html';
//             }
//         })
//         .catch((error) => {
//             console.error('Fetch Error:', error);
//         });
// }
// function signUPCustomer() {
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const password = document.getElementById('password').value;

//     console.log('Sending data to /signup-client', { name, email, phone, password });

//     // Axios for the POST request
//     axios.post('http://localhost:3000/signup-client', {
//         name: name,
//         email: email,
//         phone: phone,
//         password: password
//     })
//         .then((response) => {
//             if (response.data.error) {
//                 console.error('Server responded with an error:', response.data.error);
//                 document.getElementById('error').innerText = response.data.error;
//             } else {
//                 console.log('Signup successful, redirecting...');
//                 window.location.href = 'customer-dashboard.html';
//             }
//         })
//         .catch((error) => {
//             console.error('Axios Error:', error.response ? error.response.data : error.message);
//             document.getElementById('error').innerText = 'An error occurred. Please try again.';
//         });
// }

// Function to save client login status
// function signUPCustomer() {
//     localStorage.setItem("whoIsLogged", "client");

//     // Show confirmation message
//     alert("Account created! You are now logged in.");
//     return true; // Allow form submission
// }



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