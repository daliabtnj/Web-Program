// Sign-Up Form Validation

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
            else {
                console.log("Form is valid. Redirecting...");
                window.location.href = "customer-dashboard.html";   // redirect to customer dashboard

            }
        });
    }

    if (clientSignInForm) {
        clientSignInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let errorMessages = [];
            const errors = document.getElementById('error');
            errors.innerText = '';

            if (errorMessages.length > 0) {
                errors.innerText = errorMessages.join(', ');
            }
            else {
                console.log("Form is valid. Redirecting...");
                window.location.href = "customer-dashboard.html";
            }
        })
    }
});





