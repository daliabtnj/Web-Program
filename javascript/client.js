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

// Error Handling and Form Validation
document.addEventListener('DOMContentLoaded', () => {

    // Sign-Up Page required information
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const password_repeat = document.getElementById('password-repeat');

    // Get sign up form
    const clientSignUpForm = document.getElementById('client-sign-up-form');

    // Get sing in form
    const clientSignInForm = document.getElementById('client-sign-in-form');

    // Sign-Up Form Validation and error handling
    if (clientSignUpForm) {
        clientSignUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessages = [];
            const errors = document.getElementById('error');
            errors.innerText = '';

            // If the password does not match the password confirmation, throw error
            if (password_repeat.value != password.value) {
                errorMessages.push('Passwords do not match.');
            }

            // If there are any errors with the Sign Up screen, display them
            if (errorMessages.length > 0) {
                errors.innerText = errorMessages.join(', ');
            }

            // Redirects if sign up successful and pushes new user to users array
            else {
                console.log("Form is valid. Redirecting...");
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
});





