// Hardcoded predefined users
var users = [
    {
        "name": "John",
        "email": "johndoe@gmail.com",
        "phone": "5141234567",
        "password": "jobcart59!"
    },
    {
        "name": "Violet",
        "email": "violetsteveland@hotmail.com",
        "phone": "4389876543",
        "password": "bookcase451<"
    },
    {
        "name": "Rhiannon",
        "email": "rhiannonwonder@yahoo.com",
        "phone": "5144832947",
        "password": "lightsaber12)"
    }
];

var isLoggedIn = false;


// Error Handling and Form Validation
document.addEventListener('DOMContentLoaded', () => {
    // Sign-Up Page required information

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const password_repeat = document.getElementById('password-repeat');
    const clientSignUpForm = document.getElementById('client-sign-up-form');
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

            const existingUser = users.some(user => (user.email == email.value) && (user.password == password.value)); // Check if user exists

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
                window.location.href = "customer-dashboard.html";
            }
        })
    }
});





