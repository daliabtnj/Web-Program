// Hardcoded predefined users
var users = [
    {
        "name": "John",
        "email": "johndoe@gmail.com",
        "phone": "5141234567",
        "password": "password123!"
    },
    {
        "name": "Violet",
        "email": "violetsteveland@hotmail.com",
        "phone": "4389876543",
        "password": "bookcase451<"
    }
];

// Error Handling and Form Validation for clients
document.addEventListener('DOMContentLoaded', () => {

    // Sign-Up Page required information
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const password_repeat = document.getElementById('password-repeat');

    // Get sign up form for client
    const clientSignUpForm = document.getElementById('client-sign-up-form');

    // Get sing in form for client 
    const clientSignInForm = document.getElementById('client-sign-in-form');
    const adminSignUpForm = document.getElementById('admin-sign-up-form');

    // Sign-Up Form Validation and error handling for admin
    if (adminSignUpForm) {
        adminSignUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessages = [];
            const errors = document.getElementById('error');
            errors.innerText = '';

            // If the password does not match the password confirmation, throw error
            if (password_repeat.value != password.value) {
                errorMessages.push('Passwords do not match.');
                console.log(errorMessages)
            }

            // If there are any errors with the Sign Up screen, display them
            if (errorMessages.length > 0) {
                errors.innerText = errorMessages.join(', ');
            }

            // Redirects if sign up successful and pushes new user to users array
            else {
                console.log("Form is valid. Redirecting...");
                signUPAdmin();
                window.location.href = "admin-dashboard.html";   // Redirect to customer dashboard

            }
        });
    }
    // Sign-Up Form Validation and error handling for client
    if (clientSignUpForm) {
        clientSignUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessages = [];
            const errors = document.getElementById('error');
            errors.innerText = '';

            // If the password does not match the password confirmation, throw error
            if (password_repeat.value != password.value) {
                errorMessages.push('Passwords do not match.');
                console.log(errorMessages)
            }

            // If there are any errors with the Sign Up screen, display them
            if (errorMessages.length > 0) {
                errors.innerText = errorMessages.join(', ');
            }

            // Redirects if sign up successful and pushes new user to users array
            else {
                console.log("Form is valid. Redirecting...");
                signUPCustomer();
                window.location.href = "customer-dashboard.html";   // Redirect to customer dashboard

            }
        });
    }

    
    // Sign-In Form Validation and error handling
    if (clientSignInForm) {
        clientSignInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessages = [];
            const errors = document.getElementById('error');
            errors.innerText = '';

            // Check if user exists
            const existingUser = users.some(user => (user.email == email.value) && (user.password == password.value));

            // If user does not exist
            if (!existingUser) {
                console.log("user does not exist")
                errorMessages.push('User does not exist. Try again or sign up.')
            }

            // Display error messages
            if (errorMessages.length > 0) {
                errors.innerText = errorMessages.join(', ');
            }

            // Redirects if sign in successful
            else {
                console.log("Form is valid. Redirecting...");
                saveCustomer();
                window.location.href = "customer-dashboard.html";

            }
        })
    }
});


/*
// Form Validation for customer-account information changes
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-client-button');
    const saveButton = document.getElementById('save-changes');
    const cancelButton = document.getElementById('cancel');

    const clientAccountInfo = document.getElementById('client-account-info');
    const editClientAccountForm = document.getElementById('client-account-edit-form');

    const nameDisplay = document.getElementById('client-name-display');
    const emailDisplay = document.getElementById('client-email-display');
    const phoneDisplay = document.getElementById('client-phone-display');
    const passwordDisplay = document.getElementById('client-password-display');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');

    if (editButton) {

        editButton.addEventListener('click', () => {
            clientAccountInfo.style.display = 'none';
            editClientAccountForm.style.display = 'block';
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            nameDisplay.textContent = nameInput.value;
            emailDisplay.textContent = emailInput.value;
            phoneDisplay.textContent = phoneInput.value;
            passwordDisplay.textContent = passwordInput.value;

            editClientAccountForm.style.display = 'none';
            clientAccountInfo.style.display = 'block';
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            editClientAccountForm.style.display = 'none';
            clientAccountInfo.style.display = 'block';
        });
    }

});



// Client can cancel services
document.addEventListener('DOMContentLoaded', () => {
    const cancelServiceButton = document.querySelectorAll('.cancel-service-button');

    if (cancelServiceButton) {
        cancelServiceButton.forEach(button => {
            button.addEventListener('click', () => {
                alert('Service canceled');

                const serviceRow = event.target.closest('tr');
                if (serviceRow) {
                    serviceRow.remove();
                }
            });
        });
    }
})*/

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Fill the requests table using the database (for clients)
async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/api/service-requests');
        if (!response.ok) {
            throw new Error('Service Requests Unavailable');
        }

        const requests = await response.json();
        const tableBody = document.getElementById('requests-table-body');

        tableBody.innerHTML = '';

        // Fill table with requested services from the database
        requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.service_id}</td>
                <td id="status-${request.id}">${request.status}</td>
                <td>${request.date}</td>
                <td>
                    <button 
                        class="cancel-service-button" 
                        onclick="cancelRequest(${request.id})"
                        ${request.status !== 'booked' ? 'pending' : ''}>
                        Cancel
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}


// Cancel requests and delete from database
async function cancelRequest(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/delete-request/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Service was not delete. Details: ${errorDetails}`);
        }

        alert('Request deleted successfully!');
        fetchRequests(); // Refresh the table
    } catch (error) {
        console.error('Error deleting request:', error.message);
        alert('Failed to delete the request. Please check the console for details.');
    }
}



// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded. Fetching requests...");
    fetchRequests();
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
